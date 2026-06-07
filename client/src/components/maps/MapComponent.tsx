import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MAP_CONFIG, ZONE_COLORS } from '../../utils/constants';

// ─── Fix Leaflet default marker icon issue with bundlers ──────────────────────
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Custom marker icons by status ───────────────────────────────────────────
const createStatusIcon = (color: string) =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 16px; height: 16px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -12],
  });

const statusIcons: Record<string, L.DivIcon> = {
  ON_DUTY: createStatusIcon('#10b981'),
  OFF_DUTY: createStatusIcon('#94a3b8'),
  SOS: createStatusIcon('#ef4444'),
  DISCONNECTED: createStatusIcon('#f59e0b'),
};

// ─── Types ───────────────────────────────────────────────────────────────────
export interface MapWorker {
  id: string;
  name: string;
  employeeId: string;
  status: 'ON_DUTY' | 'OFF_DUTY' | 'SOS' | 'DISCONNECTED';
  lat: number;
  lng: number;
  lastSeen?: string;
}

export interface MapZone {
  id: string;
  name: string;
  type: 'MAINTENANCE' | 'DANGER' | 'SAFE';
  lat: number;
  lng: number;
  radius: number;
}

interface MapComponentProps {
  height?: string;
  showWorkers?: boolean;
  showZones?: boolean;
  workers?: MapWorker[];
  zones?: MapZone[];
  center?: [number, number];
  zoom?: number;
}

// ─── Default mock data ───────────────────────────────────────────────────────
const defaultWorkers: MapWorker[] = [
  { id: '1', name: 'Amit Sharma', employeeId: 'TM-1001', status: 'ON_DUTY', lat: 28.6424, lng: 77.2195, lastSeen: '2 min ago' },
  { id: '2', name: 'Vikram Singh', employeeId: 'TM-1002', status: 'ON_DUTY', lat: 28.5875, lng: 77.2536, lastSeen: '5 min ago' },
  { id: '3', name: 'Suresh Patel', employeeId: 'TM-1003', status: 'SOS', lat: 28.6692, lng: 77.4538, lastSeen: 'Just now' },
  { id: '4', name: 'Manoj Yadav', employeeId: 'TM-1004', status: 'OFF_DUTY', lat: 28.6315, lng: 77.2167, lastSeen: '2 hrs ago' },
  { id: '5', name: 'Ravi Verma', employeeId: 'TM-1005', status: 'DISCONNECTED', lat: 28.6508, lng: 77.2334, lastSeen: '45 min ago' },
];

const defaultZones: MapZone[] = [
  { id: '1', name: 'New Delhi Station - Track 3', type: 'MAINTENANCE', lat: 28.6424, lng: 77.2195, radius: 500 },
  { id: '2', name: 'Nizamuddin Bridge - Danger Zone', type: 'DANGER', lat: 28.5875, lng: 77.2536, radius: 300 },
  { id: '3', name: 'Ghaziabad Yard - Safe Zone', type: 'SAFE', lat: 28.6692, lng: 77.4538, radius: 700 },
];

// ─── Status badge labels ─────────────────────────────────────────────────────
const statusLabels: Record<string, { label: string; color: string }> = {
  ON_DUTY: { label: 'On Duty', color: '#10b981' },
  OFF_DUTY: { label: 'Off Duty', color: '#94a3b8' },
  SOS: { label: '🚨 SOS', color: '#ef4444' },
  DISCONNECTED: { label: 'Disconnected', color: '#f59e0b' },
};

// ─── Component ───────────────────────────────────────────────────────────────
const MapComponent: React.FC<MapComponentProps> = ({
  height = 'h-96',
  showWorkers = true,
  showZones = true,
  workers = defaultWorkers,
  zones = defaultZones,
  center = MAP_CONFIG.center,
  zoom = MAP_CONFIG.zoom,
}) => {
  return (
    <div className={`${height} rounded-2xl overflow-hidden border border-slate-200`}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution={MAP_CONFIG.attribution}
          url={MAP_CONFIG.tileUrl}
        />

        {/* Zone Circles */}
        {showZones && zones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{
              color: ZONE_COLORS[zone.type] || '#3B82F6',
              fillColor: ZONE_COLORS[zone.type] || '#3B82F6',
              fillOpacity: 0.12,
              weight: 2,
              dashArray: zone.type === 'DANGER' ? '8 4' : undefined,
            }}
          >
            <Popup>
              <div style={{ minWidth: 160 }}>
                <p style={{ fontWeight: 700, fontSize: 13, margin: '0 0 4px' }}>{zone.name}</p>
                <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>
                  Type: <span style={{ color: ZONE_COLORS[zone.type], fontWeight: 600 }}>{zone.type}</span>
                </p>
                <p style={{ fontSize: 11, color: '#64748b', margin: '2px 0 0' }}>Radius: {zone.radius}m</p>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Worker Markers */}
        {showWorkers && workers.map((worker) => (
          <Marker
            key={worker.id}
            position={[worker.lat, worker.lng]}
            icon={statusIcons[worker.status] || statusIcons.OFF_DUTY}
          >
            <Popup>
              <div style={{ minWidth: 160 }}>
                <p style={{ fontWeight: 700, fontSize: 13, margin: '0 0 2px' }}>{worker.name}</p>
                <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 4px' }}>{worker.employeeId}</p>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                  backgroundColor: statusLabels[worker.status]?.color + '18',
                  color: statusLabels[worker.status]?.color,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    backgroundColor: statusLabels[worker.status]?.color,
                  }} />
                  {statusLabels[worker.status]?.label}
                </div>
                {worker.lastSeen && (
                  <p style={{ fontSize: 10, color: '#94a3b8', margin: '6px 0 0' }}>Last seen: {worker.lastSeen}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
