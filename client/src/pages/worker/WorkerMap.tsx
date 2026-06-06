import React from 'react';
import { MapPin, Navigation, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MAP_CONFIG } from '../../utils/constants';

const WorkerMap: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-50">
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
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 flex items-center justify-center relative">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full shadow-lg shadow-blue-500/40 animate-pulse border-2 border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-400/10 rounded-full animate-ping" />
        <div className="text-center relative z-10 mt-32">
          <MapPin className="w-12 h-12 text-blue-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Leaflet Map Integration</p>
          <p className="text-xs text-slate-400 mt-1">Center: {MAP_CONFIG.center.join(', ')}</p>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="bg-white border-t border-slate-200 p-4 safe-area-inset-bottom">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Your Location</p>
            <p className="text-xs text-slate-400">New Delhi Station — Track 3</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono text-slate-600">28.6139, 77.2090</p>
            <p className="text-xs text-slate-400">Accuracy: ±5m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerMap;
