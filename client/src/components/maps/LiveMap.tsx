import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { MAP_CONFIG, ZONE_COLORS } from '../../utils/constants';
import type { MapWorker, MapZone } from './MapComponent';
import { Maximize2, Minimize2 } from 'lucide-react';

// ─── Fix Leaflet default marker icon issue ───────────────────────────────────
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Custom Pulsing SOS Icon ─────────────────────────────────────────────────
const createWorkerIcon = (color: string, isSOS = false) =>
  L.divIcon({
    className: 'custom-live-marker',
    html: `
      <div style="position:relative; width:20px; height:20px;">
        ${isSOS ? `<div style="
          position:absolute; inset:-6px;
          border-radius:50%;
          background: ${color}40;
          animation: sosPing 1.5s ease-out infinite;
        "></div>` : ''}
        <div style="
          position:relative; width:20px; height:20px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 10px ${color}60;
          z-index: 10;
        "></div>
      </div>
      <style>
        @keyframes sosPing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }
      </style>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -14],
  });

const workerIcons: Record<string, L.DivIcon> = {
  ON_DUTY: createWorkerIcon('#10b981'),
  OFF_DUTY: createWorkerIcon('#94a3b8'),
  SOS: createWorkerIcon('#ef4444', true),
  DISCONNECTED: createWorkerIcon('#f59e0b'),
};

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

const statusLabels: Record<string, { label: string; color: string }> = {
  ON_DUTY: { label: 'On Duty', color: '#10b981' },
  OFF_DUTY: { label: 'Off Duty', color: '#94a3b8' },
  SOS: { label: '🚨 SOS', color: '#ef4444' },
  DISCONNECTED: { label: 'Disconnected', color: '#f59e0b' },
};

interface LiveMapProps {
  workers?: MapWorker[];
  zones?: MapZone[];
  height?: string;
  onWorkerClick?: (worker: MapWorker) => void;
}

const LiveMap: React.FC<LiveMapProps> = ({
  workers = defaultWorkers,
  zones = defaultZones,
  height = 'h-[500px]',
  onWorkerClick,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-[9999] h-screen' : height} rounded-2xl overflow-hidden`}>
      {/* Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 p-3 shadow-lg">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Legend</p>
        <div className="space-y-1.5">
          {[
            { label: 'On Duty', color: '#10b981' },
            { label: 'SOS Alert', color: '#ef4444' },
            { label: 'Disconnected', color: '#f59e0b' },
            { label: 'Off Duty', color: '#94a3b8' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: item.color }} />
              <span className="text-[11px] text-slate-600 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
          {[
            { label: 'Maintenance', color: ZONE_COLORS.MAINTENANCE },
            { label: 'Danger Zone', color: ZONE_COLORS.DANGER },
            { label: 'Safe Zone', color: ZONE_COLORS.SAFE },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm border" style={{ backgroundColor: item.color + '25', borderColor: item.color }} />
              <span className="text-[11px] text-slate-600 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Toggle */}
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="absolute top-4 right-4 z-[1000] p-2 bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200 shadow-md hover:bg-white transition-all cursor-pointer"
        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      >
        {isFullscreen ? <Minimize2 className="w-4 h-4 text-slate-600" /> : <Maximize2 className="w-4 h-4 text-slate-600" />}
      </button>

      {/* Worker Count Badge */}
      <div className="absolute top-4 left-4 z-[1000] flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-slate-200 shadow-md">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-xs font-bold text-slate-700">
          {workers.filter((w) => w.status === 'ON_DUTY').length} Active
        </span>
        <span className="text-xs text-slate-400">/ {workers.length} Total</span>
      </div>

      <MapContainer
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Street Map">
            <TileLayer
              attribution={MAP_CONFIG.attribution}
              url={MAP_CONFIG.tileUrl}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='&copy; Esri'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Zone Circles */}
        {zones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{
              color: ZONE_COLORS[zone.type] || '#3B82F6',
              fillColor: ZONE_COLORS[zone.type] || '#3B82F6',
              fillOpacity: 0.1,
              weight: 2,
              dashArray: zone.type === 'DANGER' ? '10 5' : undefined,
            }}
          >
            <Popup>
              <div style={{ minWidth: 180 }}>
                <p style={{ fontWeight: 700, fontSize: 13, margin: '0 0 4px' }}>{zone.name}</p>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
                  backgroundColor: ZONE_COLORS[zone.type] + '18',
                  color: ZONE_COLORS[zone.type],
                }}>
                  {zone.type.replace('_', ' ')}
                </div>
                <p style={{ fontSize: 11, color: '#64748b', margin: '6px 0 0' }}>Radius: {zone.radius}m</p>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Worker Markers */}
        {workers.map((worker) => (
          <Marker
            key={worker.id}
            position={[worker.lat, worker.lng]}
            icon={workerIcons[worker.status] || workerIcons.OFF_DUTY}
            eventHandlers={{
              click: () => onWorkerClick?.(worker),
            }}
          >
            <Popup>
              <div style={{ minWidth: 180 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: worker.status === 'SOS' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #3b82f6, #4f46e5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: 12,
                  }}>
                    {worker.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>{worker.name}</p>
                    <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{worker.employeeId}</p>
                  </div>
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
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
                <p style={{ fontSize: 10, color: '#94a3b8', margin: '2px 0 0' }}>
                  📍 {worker.lat.toFixed(4)}, {worker.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LiveMap;
