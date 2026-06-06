import { Request, Response } from 'express';
import prisma from '../config/database';
import { asyncHandler, sendResponse, ApiError } from '../utils/helpers';

/**
 * POST /api/shifts/check-in
 * Start a new shift
 */
export const checkIn = asyncHandler(async (req: Request, res: Response) => {
  const { workerId, zoneId } = req.body;

  if (!workerId) {
    throw ApiError.badRequest('Worker ID is required');
  }

  // Check if worker already has an active shift
  const activeShift = await prisma.shift.findFirst({
    where: { workerId, status: 'ACTIVE' },
  });

  if (activeShift) {
    throw ApiError.conflict('Worker already has an active shift');
  }

  // Update worker status
  await prisma.worker.update({
    where: { id: workerId },
    data: { status: 'ON_DUTY' },
  });

  // Create shift
  const shift = await prisma.shift.create({
    data: {
      workerId,
      zoneId: zoneId || null,
      status: 'ACTIVE',
    },
    include: {
      worker: { include: { user: { select: { name: true } } } },
      zone: { select: { id: true, name: true } },
    },
  });

  sendResponse(res, 201, shift, 'Checked in successfully');
});

/**
 * PUT /api/shifts/check-out
 * End current active shift
 */
export const checkOut = asyncHandler(async (req: Request, res: Response) => {
  const { workerId } = req.body;

  if (!workerId) {
    throw ApiError.badRequest('Worker ID is required');
  }

  // Find active shift
  const activeShift = await prisma.shift.findFirst({
    where: { workerId, status: 'ACTIVE' },
  });

  if (!activeShift) {
    throw ApiError.notFound('No active shift found');
  }

  // Update shift
  const shift = await prisma.shift.update({
    where: { id: activeShift.id },
    data: {
      checkOut: new Date(),
      status: 'COMPLETED',
    },
    include: {
      worker: { include: { user: { select: { name: true } } } },
      zone: { select: { id: true, name: true } },
    },
  });

  // Update worker status
  await prisma.worker.update({
    where: { id: workerId },
    data: { status: 'OFF_DUTY' },
  });

  sendResponse(res, 200, shift, 'Checked out successfully');
});

/**
 * GET /api/shifts
 * List shifts with filters
 */
export const getShifts = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const workerId = req.query.workerId as string;
  const status = req.query.status as string;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (workerId) where.workerId = workerId;
  if (status) where.status = status;

  const [shifts, total] = await Promise.all([
    prisma.shift.findMany({
      where,
      skip,
      take: limit,
      include: {
        worker: { include: { user: { select: { name: true } } } },
        zone: { select: { id: true, name: true } },
      },
      orderBy: { checkIn: 'desc' },
    }),
    prisma.shift.count({ where }),
  ]);

  res.status(200).json({
    success: true,
    data: shifts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});
