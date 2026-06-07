import React from 'react';
import { Navigation, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MAP_CONFIG, ZONE_COLORS } from '../../utils/constants';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const workerIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="width:18px;height:18px;background:#1a237e;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(26,35,126,0.4);"></div>`,
  iconSize: [18, 18], iconAnchor: [9, 9],
});

const WorkerMap: React.FC = () => {
  const navigate = useNavigate();
  const myLat = 28.6424, myLng = 77.2195;

  const zones = [
    { id: '1', name: 'New Delhi Station - Track 3', type: 'MAINTENANCE', lat: 28.6424, lng: 77.2195, radius: 500 },
    { id: '2', name: 'Nizamuddin Bridge - Danger Zone', type: 'DANGER', lat: 28.5875, lng: 77.2536, radius: 300 },
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-[1000]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-sm font-semibold text-gray-900">Live Map</h1>
          <p className="text-[11px] text-gray-400">Your location & nearby zones</p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 border border-green-200 rounded">
          <Navigation className="w-3 h-3 text-green-600" />
          <span className="text-[10px] font-medium text-green-700">GPS Active</span>
        </div>
      </header>

      <div className="flex-1 relative" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <MapContainer center={[myLat, myLng]} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={true} scrollWheelZoom={true}>
          <TileLayer attribution={MAP_CONFIG.attribution} url={MAP_CONFIG.tileUrl} />
          <Marker position={[myLat, myLng]} icon={workerIcon}>
            <Popup><div><p style={{fontWeight:700,fontSize:13,margin:0}}>Your Location</p><p style={{fontSize:11,color:'#64748b',margin:'4px 0 0'}}>{myLat.toFixed(4)}, {myLng.toFixed(4)}</p></div></Popup>
          </Marker>
          {zones.map((z) => (
            <Circle key={z.id} center={[z.lat, z.lng]} radius={z.radius}
              pathOptions={{ color: ZONE_COLORS[z.type]||'#3B82F6', fillColor: ZONE_COLORS[z.type]||'#3B82F6', fillOpacity: 0.1, weight: 2, dashArray: z.type==='DANGER'?'10 5':undefined }}>
              <Popup><div><p style={{fontWeight:700,fontSize:13,margin:0}}>{z.name}</p><p style={{fontSize:11,color:ZONE_COLORS[z.type],fontWeight:600,margin:'4px 0 0'}}>{z.type} ZONE</p></div></Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>

      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-gray-900">Your Location</p><p className="text-xs text-gray-400">New Delhi Station — Track 3</p></div>
          <div className="text-right"><p className="text-sm font-mono text-gray-600">{myLat.toFixed(4)}, {myLng.toFixed(4)}</p><p className="text-xs text-gray-400">Accuracy: ±5m</p></div>
        </div>
      </div>
    </div>
  );
};

export default WorkerMap;
