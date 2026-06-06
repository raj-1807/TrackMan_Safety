import { Request, Response } from 'express';
import prisma from '../config/database';
import { asyncHandler, sendResponse, sendPaginatedResponse, ApiError } from '../utils/helpers';

/**
 * GET /api/alerts
 * List alerts with filters
 */
export const getAlerts = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const status = req.query.status as string;
  const type = req.query.type as string;
  const severity = req.query.severity as string;
  const workerId = req.query.workerId as string;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (status) where.status = status;
  if (type) where.type = type;
  if (severity) where.severity = severity;
  if (workerId) where.workerId = workerId;

  const [alerts, total] = await Promise.all([
    prisma.alert.findMany({
      where,
      skip,
      take: limit,
      include: {
        worker: {
          include: {
            user: { select: { name: true } },
          },
        },
        zone: { select: { id: true, name: true, type: true } },
        resolvedBy: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.alert.count({ where }),
  ]);

  sendPaginatedResponse(res, alerts, total, page, limit);
});

/**
 * POST /api/alerts/sos
 * Trigger an SOS alert
 */
export const triggerSOS = asyncHandler(async (req: Request, res: Response) => {
  const { workerId, latitude, longitude, message } = req.body;

  if (!workerId) {
    throw ApiError.badRequest('Worker ID is required');
  }

  // Update worker status to SOS
  await prisma.worker.update({
    where: { id: workerId },
    data: { status: 'SOS' },
  });

  // Create critical SOS alert
  const alert = await prisma.alert.create({
    data: {
      workerId,
      type: 'SOS',
      severity: 'CRITICAL',
      status: 'ACTIVE',
      message: message || '🚨 EMERGENCY: Worker triggered SOS!',
      latitude,
      longitude,
    },
    include: {
      worker: {
        include: { user: { select: { name: true, phone: true } } },
      },
    },
  });

  sendResponse(res, 201, alert, 'SOS alert triggered');
});

/**
 * PUT /api/alerts/:id/acknowledge
 * Acknowledge an alert
 */
export const acknowledgeAlert = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.user) {
    throw ApiError.unauthorized();
  }

  const alert = await prisma.alert.update({
    where: { id },
    data: {
      status: 'ACKNOWLEDGED',
      resolvedById: req.user.id,
    },
    include: {
      worker: { include: { user: { select: { name: true } } } },
      resolvedBy: { select: { id: true, name: true } },
    },
  });

  sendResponse(res, 200, alert, 'Alert acknowledged');
});

/**
 * PUT /api/alerts/:id/resolve
 * Resolve an alert
 */
export const resolveAlert = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.user) {
    throw ApiError.unauthorized();
  }

  const alert = await prisma.alert.update({
    where: { id },
    data: {
      status: 'RESOLVED',
      resolvedAt: new Date(),
      resolvedById: req.user.id,
    },
    include: {
      worker: { include: { user: { select: { name: true } } } },
      resolvedBy: { select: { id: true, name: true } },
    },
  });

  // If it was an SOS, update worker status back to ON_DUTY
  if (alert.type === 'SOS') {
    await prisma.worker.update({
      where: { id: alert.workerId },
      data: { status: 'ON_DUTY' },
    });
  }

  sendResponse(res, 200, alert, 'Alert resolved');
});
