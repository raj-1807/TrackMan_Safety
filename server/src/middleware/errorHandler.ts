import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/helpers';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('❌ Error:', err.message);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  // Prisma known request errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;
    if (prismaError.code === 'P2002') {
      const field = prismaError.meta?.target?.[0] || 'field';
      return res.status(409).json({
        success: false,
        message: `A record with this ${field} already exists`,
      });
    }
    if (prismaError.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }
  }

  // Validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: (err as any).errors,
    });
  }

  // Fallback
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 handler for undefined routes
 */
export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${_req.method} ${_req.originalUrl}`,
  });
};
