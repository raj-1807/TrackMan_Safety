import api from './api';

export const workerService = {
  getAll: (params?: { page?: number; limit?: number; status?: string; search?: string }) =>
    api.get('/workers', { params }),

  getById: (id: string) =>
    api.get(`/workers/${id}`),

  updateStatus: (id: string, status: string) =>
    api.put(`/workers/${id}/status`, { status }),

  getLocationHistory: (id: string, params?: { from?: string; to?: string; limit?: number }) =>
    api.get(`/workers/${id}/location-history`, { params }),
};

export default workerService;
