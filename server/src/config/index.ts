import dotenv from 'dotenv';
dotenv.config();

export const config = {
  // Server
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  databaseUrl: process.env.DATABASE_URL || '',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-change-me',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

  // CORS
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  workerAppUrl: process.env.WORKER_APP_URL || 'http://localhost:5174',

  // Cors origins
  get corsOrigins(): string[] {
    return [this.clientUrl, this.workerAppUrl];
  },
};
