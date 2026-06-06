import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  token: string | null;
  onLocationUpdate?: (data: any) => void;
  onAlertNew?: (data: any) => void;
  onWorkerStatus?: (data: any) => void;
}

export const useSocket = ({ token, onLocationUpdate, onAlertNew, onWorkerStatus }: UseSocketOptions) => {
  const socketRef = useRef<Socket | null>(null);

  const connect = useCallback(() => {
    if (!token || socketRef.current?.connected) return;

    const socket = io(window.location.origin, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('🔌 Socket connected');
    });

    socket.on('location:broadcast', (data) => {
      onLocationUpdate?.(data);
    });

    socket.on('alert:new', (data) => {
      onAlertNew?.(data);
    });

    socket.on('worker:status', (data) => {
      onWorkerStatus?.(data);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Socket disconnected');
    });

    socketRef.current = socket;
  }, [token, onLocationUpdate, onAlertNew, onWorkerStatus]);

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect();
    socketRef.current = null;
  }, []);

  const emit = useCallback((event: string, data: any) => {
    socketRef.current?.emit(event, data);
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { socket: socketRef.current, emit, disconnect };
};

export default useSocket;
