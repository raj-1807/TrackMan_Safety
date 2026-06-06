import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../components/layout/AdminLayout';

// Auth Pages
import Login from '../pages/auth/Login';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import Monitoring from '../pages/admin/Monitoring';
import WorkerManagement from '../pages/admin/WorkerManagement';
import ZoneManagement from '../pages/admin/ZoneManagement';
import Alerts from '../pages/admin/Alerts';
import Reports from '../pages/admin/Reports';

// Worker Pages
import WorkerDashboard from '../pages/worker/WorkerDashboard';
import WorkerMap from '../pages/worker/WorkerMap';
import Profile from '../pages/worker/Profile';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes — with Sidebar Layout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['SUPERVISOR', 'CONTROL_ROOM']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="monitoring" element={<Monitoring />} />
        <Route path="workers" element={<WorkerManagement />} />
        <Route path="zones" element={<ZoneManagement />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Worker Routes — Mobile-first, no sidebar */}
      <Route
        path="/worker"
        element={
          <ProtectedRoute allowedRoles={['TRACKMAN']}>
            <></>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
      <Route
        path="/worker/dashboard"
        element={
          <ProtectedRoute allowedRoles={['TRACKMAN']}>
            <WorkerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/worker/map"
        element={
          <ProtectedRoute allowedRoles={['TRACKMAN']}>
            <WorkerMap />
          </ProtectedRoute>
        }
      />
      <Route
        path="/worker/profile"
        element={
          <ProtectedRoute allowedRoles={['TRACKMAN']}>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Default Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
