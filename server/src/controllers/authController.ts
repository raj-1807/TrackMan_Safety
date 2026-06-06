import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import prisma from '../config/database';
import { asyncHandler, sendResponse, ApiError } from '../utils/helpers';
import { Role } from '@prisma/client';

/**
 * Generate access and refresh tokens for a user
 */
const generateTokens = (user: { id: string; email: string; role: Role; name: string }) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn as string }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    config.jwtRefreshSecret,
    { expiresIn: config.jwtRefreshExpiresIn as string }
  );

  return { accessToken, refreshToken };
};

/**
 * POST /api/auth/register
 * Register a new user
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role, phone } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    throw ApiError.badRequest('Name, email, and password are required');
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw ApiError.conflict('A user with this email already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: role || Role.TRACKMAN,
      phone,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      createdAt: true,
    },
  });

  // Generate tokens
  const tokens = generateTokens({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  sendResponse(res, 201, { user, ...tokens }, 'User registered successfully');
});

/**
 * POST /api/auth/login
 * Login with email and password
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw ApiError.badRequest('Email and password are required');
  }

  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  if (!user.isActive) {
    throw ApiError.forbidden('Account has been deactivated');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  // Generate tokens
  const tokens = generateTokens({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  sendResponse(res, 200, {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    },
    ...tokens,
  }, 'Login successful');
});

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw ApiError.unauthorized();
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      isActive: true,
      createdAt: true,
      worker: {
        select: {
          id: true,
          employeeId: true,
          designation: true,
          department: true,
          status: true,
        },
      },
    },
  });

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  sendResponse(res, 200, user);
});

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token
 */
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    throw ApiError.badRequest('Refresh token is required');
  }

  try {
    const decoded = jwt.verify(token, config.jwtRefreshSecret) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, name: true, isActive: true },
    });

    if (!user || !user.isActive) {
      throw ApiError.unauthorized('Invalid refresh token');
    }

    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    sendResponse(res, 200, tokens, 'Token refreshed');
  } catch (error) {
    throw ApiError.unauthorized('Invalid or expired refresh token');
  }
});
