import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { config } from './config';
import { setupSocketIO } from './sockets';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';

// Route imports
import authRoutes from './routes/authRoutes';
import workerRoutes from './routes/workerRoutes';
import zoneRoutes from './routes/zoneRoutes';
import alertRoutes from './routes/alertRoutes';
import shiftRoutes from './routes/shiftRoutes';
import locationRoutes from './routes/locationRoutes';

// ─── Initialize Express ──────────────────────────────────────────────────────
const app = express();
const httpServer = createServer(app);

// ─── Initialize Socket.IO ────────────────────────────────────────────────────
const io = setupSocketIO(httpServer);

// Make io accessible in routes (for emitting events from controllers)
app.set('io', io);

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: config.corsOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: '🚂 TrackMan Safety API is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/locations', locationRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = config.port;

httpServer.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════╗
  ║                                              ║
  ║   🚂 TrackMan Safety API Server              ║
  ║                                              ║
  ║   Port:        ${PORT}                          ║
  ║   Environment: ${config.nodeEnv.padEnd(11)}              ║
  ║   Health:      http://localhost:${PORT}/api/health ║
  ║   Socket.IO:   Enabled ✅                    ║
  ║                                              ║
  ╚══════════════════════════════════════════════╝
  `);
});

export { app, httpServer, io };
