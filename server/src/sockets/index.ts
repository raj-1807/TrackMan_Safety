import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';
import { config } from '../config';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
  userName?: string;
}

export const setupSocketIO = (httpServer: HttpServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: config.corsOrigins,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Authentication middleware for Socket.IO
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as any;
      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      socket.userName = decoded.name;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`🔌 User connected: ${socket.userName} (${socket.userId})`);

    // Worker joins their own room
    if (socket.userId) {
      socket.join(`user:${socket.userId}`);
    }

    // Supervisors/Control Room join the dashboard room
    if (socket.userRole === 'SUPERVISOR' || socket.userRole === 'CONTROL_ROOM') {
      socket.join('dashboard');
    }

    // ─── Location Update ─────────────────────────────────────────────
    socket.on('location:update', (data: {
      workerId: string;
      latitude: number;
      longitude: number;
      accuracy?: number;
      speed?: number;
    }) => {
      // Broadcast to dashboard users
      io.to('dashboard').emit('location:broadcast', {
        ...data,
        userName: socket.userName,
        timestamp: new Date().toISOString(),
      });
    });

    // ─── SOS Alert ───────────────────────────────────────────────────
    socket.on('alert:sos', (data: {
      workerId: string;
      latitude?: number;
      longitude?: number;
      message?: string;
    }) => {
      console.log(`🚨 SOS from ${socket.userName}!`);

      // Broadcast to all dashboard users
      io.to('dashboard').emit('alert:new', {
        type: 'SOS',
        severity: 'CRITICAL',
        workerName: socket.userName,
        ...data,
        timestamp: new Date().toISOString(),
      });
    });

    // ─── Worker Status Change ────────────────────────────────────────
    socket.on('worker:status', (data: { workerId: string; status: string }) => {
      io.to('dashboard').emit('worker:status', {
        ...data,
        userName: socket.userName,
        timestamp: new Date().toISOString(),
      });
    });

    // ─── Disconnect ─────────────────────────────────────────────────
    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${socket.userName}`);

      // Notify dashboard that a worker disconnected
      io.to('dashboard').emit('worker:status', {
        userId: socket.userId,
        userName: socket.userName,
        status: 'DISCONNECTED',
        timestamp: new Date().toISOString(),
      });
    });
  });

  return io;
};
