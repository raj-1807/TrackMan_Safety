// ─── API Base ────────────────────────────────────────────────────────────────
export const API_BASE_URL = '/api';

// ─── User Roles ──────────────────────────────────────────────────────────────
export const ROLES = {
  TRACKMAN: 'TRACKMAN',
  SUPERVISOR: 'SUPERVISOR',
  CONTROL_ROOM: 'CONTROL_ROOM',
} as const;

export const ROLE_LABELS: Record<string, string> = {
  TRACKMAN: 'Trackman',
  SUPERVISOR: 'Supervisor',
  CONTROL_ROOM: 'Control Room',
};

// ─── Worker Status ───────────────────────────────────────────────────────────
export const WORKER_STATUS = {
  ON_DUTY: 'ON_DUTY',
  OFF_DUTY: 'OFF_DUTY',
  SOS: 'SOS',
  DISCONNECTED: 'DISCONNECTED',
} as const;

export const WORKER_STATUS_LABELS: Record<string, string> = {
  ON_DUTY: 'On Duty',
  OFF_DUTY: 'Off Duty',
  SOS: 'SOS',
  DISCONNECTED: 'Disconnected',
};

// ─── Alert Types ─────────────────────────────────────────────────────────────
export const ALERT_TYPES = {
  ZONE_BREACH: 'ZONE_BREACH',
  SOS: 'SOS',
  TRAIN_APPROACHING: 'TRAIN_APPROACHING',
  DEVICE_OFFLINE: 'DEVICE_OFFLINE',
  GEOFENCE_EXIT: 'GEOFENCE_EXIT',
} as const;

export const ALERT_SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const;

export const ALERT_STATUS = {
  ACTIVE: 'ACTIVE',
  ACKNOWLEDGED: 'ACKNOWLEDGED',
  RESOLVED: 'RESOLVED',
} as const;

// ─── Zone Types ──────────────────────────────────────────────────────────────
export const ZONE_TYPES = {
  MAINTENANCE: 'MAINTENANCE',
  DANGER: 'DANGER',
  SAFE: 'SAFE',
} as const;

export const ZONE_TYPE_LABELS: Record<string, string> = {
  MAINTENANCE: 'Maintenance',
  DANGER: 'Danger Zone',
  SAFE: 'Safe Zone',
};

export const ZONE_COLORS: Record<string, string> = {
  MAINTENANCE: '#3B82F6',
  DANGER: '#EF4444',
  SAFE: '#10B981',
};

// ─── Map Config ──────────────────────────────────────────────────────────────
export const MAP_CONFIG = {
  center: [28.6139, 77.209] as [number, number], // New Delhi
  zoom: 13,
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
};

// ─── Pagination ──────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
