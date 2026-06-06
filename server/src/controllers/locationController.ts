import { Request, Response } from 'express';
import prisma from '../config/database';
import { asyncHandler, sendResponse, ApiError } from '../utils/helpers';

/**
 * POST /api/locations
 * Receive a GPS location update from a worker
 */
export const updateLocation = asyncHandler(async (req: Request, res: Response) => {
  const { workerId, latitude, longitude, accuracy, speed } = req.body;

  if (!workerId || latitude === undefined || longitude === undefined) {
    throw ApiError.badRequest('workerId, latitude, and longitude are required');
  }

  // Store the location
  const location = await prisma.location.create({
    data: {
      workerId,
      latitude,
      longitude,
      accuracy: accuracy || null,
      speed: speed || 0,
    },
  });

  // Update worker's last known location
  await prisma.worker.update({
    where: { id: workerId },
    data: {
      lastKnownLatitude: latitude,
      lastKnownLongitude: longitude,
      lastLocationAt: new Date(),
      status: 'ON_DUTY', // Mark as active since they're sending location
    },
  });

  sendResponse(res, 201, location, 'Location updated');
});

/**
 * GET /api/locations/latest
 * Get latest location for all active workers
 */
export const getLatestLocations = asyncHandler(async (_req: Request, res: Response) => {
  const workers = await prisma.worker.findMany({
    where: {
      lastKnownLatitude: { not: null },
      lastKnownLongitude: { not: null },
    },
    select: {
      id: true,
      employeeId: true,
      status: true,
      lastKnownLatitude: true,
      lastKnownLongitude: true,
      lastLocationAt: true,
      user: {
        select: { name: true, phone: true },
      },
    },
  });

  sendResponse(res, 200, workers);
});

/**
 * GET /api/locations/history/:workerId
 * Get location history for a specific worker
 */
export const getLocationHistory = asyncHandler(async (req: Request, res: Response) => {
  const { workerId } = req.params;
  const from = req.query.from as string;
  const to = req.query.to as string;
  const limit = parseInt(req.query.limit as string) || 200;

  const where: any = { workerId };

  if (from || to) {
    where.recordedAt = {};
    if (from) where.recordedAt.gte = new Date(from);
    if (to) where.recordedAt.lte = new Date(to);
  }

  const locations = await prisma.location.findMany({
    where,
    take: limit,
    orderBy: { recordedAt: 'asc' },
    select: {
      id: true,
      latitude: true,
      longitude: true,
      speed: true,
      accuracy: true,
      recordedAt: true,
    },
  });

  sendResponse(res, 200, locations);
});
