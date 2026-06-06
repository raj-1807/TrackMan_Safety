import { Request, Response } from 'express';
import prisma from '../config/database';
import { asyncHandler, sendResponse, sendPaginatedResponse, ApiError } from '../utils/helpers';

/**
 * GET /api/workers
 * List all workers with pagination and filtering
 */
export const getWorkers = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const status = req.query.status as string;
  const search = req.query.search as string;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { employeeId: { contains: search, mode: 'insensitive' } },
      { user: { name: { contains: search, mode: 'insensitive' } } },
      { department: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [workers, total] = await Promise.all([
    prisma.worker.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.worker.count({ where }),
  ]);

  sendPaginatedResponse(res, workers, total, page, limit);
});

/**
 * GET /api/workers/:id
 * Get a single worker with details
 */
export const getWorker = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const worker = await prisma.worker.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
      shifts: {
        take: 5,
        orderBy: { checkIn: 'desc' },
        include: {
          zone: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!worker) {
    throw ApiError.notFound('Worker not found');
  }

  sendResponse(res, 200, worker);
});

/**
 * PUT /api/workers/:id/status
 * Update worker status
 */
export const updateWorkerStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    throw ApiError.badRequest('Status is required');
  }

  const worker = await prisma.worker.update({
    where: { id },
    data: { status },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  sendResponse(res, 200, worker, 'Worker status updated');
});

/**
 * GET /api/workers/:id/location-history
 * Get location history for a worker
 */
export const getWorkerLocationHistory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const from = req.query.from as string;
  const to = req.query.to as string;
  const limit = parseInt(req.query.limit as string) || 100;

  const where: any = { workerId: id };

  if (from || to) {
    where.recordedAt = {};
    if (from) where.recordedAt.gte = new Date(from);
    if (to) where.recordedAt.lte = new Date(to);
  }

  const locations = await prisma.location.findMany({
    where,
    take: limit,
    orderBy: { recordedAt: 'desc' },
  });

  sendResponse(res, 200, locations);
});
