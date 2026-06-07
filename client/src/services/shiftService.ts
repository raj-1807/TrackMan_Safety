import api from './api';

export const shiftService = {
  startShift: (data?: { latitude?: number; longitude?: number }) =>
    api.post('/shifts/start', data),

  endShift: (data?: { latitude?: number; longitude?: number }) =>
    api.post('/shifts/end', data),

  getActiveShift: () =>
    api.get('/shifts/active'),

  getHistory: (params?: { page?: number; limit?: number; from?: string; to?: string }) =>
    api.get('/shifts/history', { params }),

  getById: (id: string) =>
    api.get(`/shifts/${id}`),
};

export default shiftService;
