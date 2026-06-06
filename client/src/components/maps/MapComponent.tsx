import React from 'react';
import { MapPin } from 'lucide-react';
import { MAP_CONFIG } from '../../utils/constants';

interface MapComponentProps {
  height?: string;
  showWorkers?: boolean;
  showZones?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  height = 'h-96',
  showWorkers = true,
  showZones = true,
}) => {
  // Placeholder — will be replaced with Leaflet integration
  return (
    <div className={`${height} bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 rounded-2xl border border-slate-200 flex items-center justify-center relative overflow-hidden`}>
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Mock worker positions */}
      {showWorkers && (
        <>
          <div className="absolute top-[30%] left-[35%] w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/30 animate-pulse" />
          <div className="absolute top-[50%] left-[55%] w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-[65%] left-[40%] w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/30 animate-ping" />
          <div className="absolute top-[40%] left-[70%] w-4 h-4 bg-amber-500 rounded-full shadow-lg shadow-amber-500/30" />
        </>
      )}

      {/* Mock zone overlays */}
      {showZones && (
        <>
          <div className="absolute top-[25%] left-[30%] w-28 h-20 bg-blue-400/10 border border-blue-400/20 rounded-xl" />
          <div className="absolute top-[55%] left-[45%] w-24 h-16 bg-red-400/10 border border-red-400/20 rounded-xl" />
        </>
      )}

      {/* Center label */}
      <div className="relative text-center z-10">
        <MapPin className="w-12 h-12 text-blue-200 mx-auto mb-3" />
        <p className="text-sm text-slate-500 font-medium">Leaflet.js Map</p>
        <p className="text-xs text-slate-400 mt-1">Center: {MAP_CONFIG.center.join(', ')}</p>
      </div>
    </div>
  );
};

export default MapComponent;
