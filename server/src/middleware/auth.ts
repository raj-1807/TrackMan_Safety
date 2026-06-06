import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { ApiError } from '../utils/helpers';
import { Role } from '@prisma/client';

// Extend Express Request to include user data
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: Role;
        name: string;
      };
    }
  }
}

interface JwtPayload {
  id: string;
  email: string;
  role: Role;
  name: string;
}

/**
 * Authentication middleware — verifies JWT token from Authorization header
 */
export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Access token is required');
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
    };

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else if (error instanceof jwt.TokenExpiredError) {
      next(ApiError.unauthorized('Token has expired'));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(ApiError.unauthorized('Invalid token'));
    } else {
      next(ApiError.unauthorized('Authentication failed'));
    }
  }
};

/**
 * Role-based authorization middleware
 * Usage: authorize(Role.SUPERVISOR, Role.CONTROL_ROOM)
 */
export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `Access denied. Required roles: ${allowedRoles.join(', ')}`
        )
      );
    }

    next();
  };
};
