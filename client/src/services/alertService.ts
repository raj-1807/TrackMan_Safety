import api from './api';

export const alertService = {
  getAll: (params?: { page?: number; limit?: number; status?: string; type?: string; severity?: string }) =>
    api.get('/alerts', { params }),

  triggerSOS: (data: { workerId: string; latitude?: number; longitude?: number; message?: string }) =>
    api.post('/alerts/sos', data),

  acknowledge: (id: string) =>
    api.put(`/alerts/${id}/acknowledge`),

  resolve: (id: string) =>
    api.put(`/alerts/${id}/resolve`),
};

export default alertService;
