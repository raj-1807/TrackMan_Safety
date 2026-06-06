import { Request, Response } from 'express';
import prisma from '../config/database';
import { asyncHandler, sendResponse, sendPaginatedResponse, ApiError } from '../utils/helpers';

/**
 * GET /api/zones
 * List all zones with pagination
 */
export const getZones = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const type = req.query.type as string;
  const isActive = req.query.isActive as string;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (type) where.type = type;
  if (isActive !== undefined) where.isActive = isActive === 'true';

  const [zones, total] = await Promise.all([
    prisma.zone.findMany({
      where,
      skip,
      take: limit,
      include: {
        createdBy: { select: { id: true, name: true } },
        _count: { select: { alerts: true, shifts: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.zone.count({ where }),
  ]);

  sendPaginatedResponse(res, zones, total, page, limit);
});

/**
 * POST /api/zones
 * Create a new zone
 */
export const createZone = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, boundary, type, startTime, endTime } = req.body;

  if (!name || !boundary) {
    throw ApiError.badRequest('Name and boundary are required');
  }

  if (!req.user) {
    throw ApiError.unauthorized();
  }

  const zone = await prisma.zone.create({
    data: {
      name,
      description,
      boundary,
      type: type || 'MAINTENANCE',
      startTime: startTime ? new Date(startTime) : null,
      endTime: endTime ? new Date(endTime) : null,
      createdById: req.user.id,
    },
    include: {
      createdBy: { select: { id: true, name: true } },
    },
  });

  sendResponse(res, 201, zone, 'Zone created successfully');
});

/**
 * PUT /api/zones/:id
 * Update a zone
 */
export const updateZone = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, boundary, type, isActive, startTime, endTime } = req.body;

  const zone = await prisma.zone.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(description !== undefined && { description }),
      ...(boundary && { boundary }),
      ...(type && { type }),
      ...(isActive !== undefined && { isActive }),
      ...(startTime !== undefined && { startTime: startTime ? new Date(startTime) : null }),
      ...(endTime !== undefined && { endTime: endTime ? new Date(endTime) : null }),
    },
    include: {
      createdBy: { select: { id: true, name: true } },
    },
  });

  sendResponse(res, 200, zone, 'Zone updated successfully');
});

/**
 * DELETE /api/zones/:id
 * Delete a zone
 */
export const deleteZone = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.zone.delete({ where: { id } });

  sendResponse(res, 200, null, 'Zone deleted successfully');
});

/**
 * GET /api/zones/:id
 * Get a single zone with details
 */
export const getZone = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const zone = await prisma.zone.findUnique({
    where: { id },
    include: {
      createdBy: { select: { id: true, name: true } },
      _count: { select: { alerts: true, shifts: true } },
    },
  });

  if (!zone) {
    throw ApiError.notFound('Zone not found');
  }

  sendResponse(res, 200, zone);
});
