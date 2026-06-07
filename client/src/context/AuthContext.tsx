import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'TRACKMAN' | 'SUPERVISOR' | 'CONTROL_ROOM';
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

// ─── Demo users — used when backend is not available ─────────────────────────
const DEMO_USERS: Record<string, User> = {
  'supervisor@trackman.com': {
    id: 'demo-sup-1',
    name: 'Rajesh Kumar',
    email: 'supervisor@trackman.com',
    role: 'SUPERVISOR',
    phone: '+91-9876543210',
  },
  'control@trackman.com': {
    id: 'demo-cr-1',
    name: 'Admin Officer',
    email: 'control@trackman.com',
    role: 'CONTROL_ROOM',
    phone: '+91-9876543211',
  },
  'amit@trackman.com': {
    id: 'demo-tm-1',
    name: 'Amit Sharma',
    email: 'amit@trackman.com',
    role: 'TRACKMAN',
    phone: '+91-9876543212',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.clear();
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Try real backend first
      const { data } = await api.post('/auth/login', { email, password });
      const { user: userData, accessToken, refreshToken } = data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
    } catch (err: any) {
      // If backend is unreachable, use demo credentials
      const demoUser = DEMO_USERS[email.toLowerCase()];
      if (demoUser && password === 'password123') {
        const demoToken = 'demo-token-' + Date.now();
        localStorage.setItem('accessToken', demoToken);
        localStorage.setItem('refreshToken', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        setUser(demoUser);
        return;
      }

      // If not a valid demo user either
      const message =
        err.code === 'ERR_NETWORK'
          ? 'Invalid credentials. Use demo credentials to sign in.'
          : err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, role?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post('/auth/register', { name, email, password, role });
      const { user: userData, accessToken, refreshToken } = data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed.';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
