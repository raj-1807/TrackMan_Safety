import { Request, Response, NextFunction } from 'express';

/**
 * Custom API Error class with status code
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }

  static conflict(message: string) {
    return new ApiError(409, message);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message, false);
  }
}

/**
 * Async handler wrapper — catches errors and passes to Express error handler
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Standard API response format
 */
export const sendResponse = (
  res: Response,
  statusCode: number,
  data: any,
  message = 'Success'
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Standard paginated response
 */
export const sendPaginatedResponse = (
  res: Response,
  data: any[],
  total: number,
  page: number,
  limit: number,
  message = 'Success'
) => {
  res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};
