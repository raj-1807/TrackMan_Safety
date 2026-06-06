import api from './api';

export const zoneService = {
  getAll: (params?: { page?: number; limit?: number; type?: string; isActive?: string }) =>
    api.get('/zones', { params }),

  getById: (id: string) =>
    api.get(`/zones/${id}`),

  create: (data: { name: string; description?: string; boundary: any; type?: string; startTime?: string; endTime?: string }) =>
    api.post('/zones', data),

  update: (id: string, data: any) =>
    api.put(`/zones/${id}`, data),

  delete: (id: string) =>
    api.delete(`/zones/${id}`),
};

export default zoneService;
