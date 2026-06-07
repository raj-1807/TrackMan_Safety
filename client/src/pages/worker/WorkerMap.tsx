import React from 'react';
import { Navigation, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MAP_CONFIG, ZONE_COLORS } from '../../utils/constants';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const workerIcon = L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="position:relative; width:24px; height:24px;">
      <div style="position:absolute; inset:-8px; border-radius:50%; background:rgba(37,99,235,0.15); animation: workerPulse 2s ease-out infinite;"></div>
      <div style="position:relative; width:24px; height:24px; background:#2563eb; border:4px solid white; border-radius:50%; box-shadow:0 2px 12px rgba(37,99,235,0.5); z-index:10;"></div>
    </div>
    <style>@keyframes workerPulse { 0%{transform:scale(1);opacity:0.8} 100%{transform:scale(2.5);opacity:0} }</style>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const WorkerMap: React.FC = () => {
  const navigate = useNavigate();
  const myLat = 28.6424;
  const myLng = 77.2195;

  const zones = [
    { id: '1', name: 'New Delhi Station - Track 3', type: 'MAINTENANCE', lat: 28.6424, lng: 77.2195, radius: 500 },
    { id: '2', name: 'Nizamuddin Bridge - Danger Zone', type: 'DANGER', lat: 28.5875, lng: 77.2536, radius: 300 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-[1000]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg transition-all cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-semibold text-slate-900">Live Map</h1>
          <p className="text-xs text-slate-400">Your current location & nearby zones</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full">
          <Navigation className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[11px] font-semibold text-emerald-700">GPS Active</span>
        </div>
      </header>

      {/* Map */}
      <div className="flex-1 relative" style={{ minHeight: 'calc(100vh - 130px)' }}>
        <MapContainer
          center={[myLat, myLng]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution={MAP_CONFIG.attribution}
            url={MAP_CONFIG.tileUrl}
          />

          {/* My location marker */}
          <Marker position={[myLat, myLng]} icon={workerIcon}>
            <Popup>
              <div style={{ minWidth: 140 }}>
                <p style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>📍 Your Location</p>
                <p style={{ fontSize: 11, color: '#64748b', margin: '4px 0 0' }}>
                  {myLat.toFixed(4)}, {myLng.toFixed(4)}
                </p>
                <p style={{ fontSize: 10, color: '#94a3b8', margin: '2px 0 0' }}>Accuracy: ±5m</p>
              </div>
            </Popup>
          </Marker>

          {/* Zone circles */}
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
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>{zone.name}</p>
                  <p style={{ fontSize: 11, color: ZONE_COLORS[zone.type], fontWeight: 600, margin: '4px 0 0' }}>
                    {zone.type} ZONE
                  </p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>

      {/* Bottom Info */}
      <div className="bg-white border-t border-slate-200 p-4 safe-area-inset-bottom">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Your Location</p>
            <p className="text-xs text-slate-400">New Delhi Station — Track 3</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono text-slate-600">{myLat.toFixed(4)}, {myLng.toFixed(4)}</p>
            <p className="text-xs text-slate-400">Accuracy: ±5m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerMap;
