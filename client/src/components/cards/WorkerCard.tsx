import React from 'react';
import { MapPin, Phone, Clock, Signal, SignalZero } from 'lucide-react';

interface WorkerCardProps {
  name: string;
  employeeId: string;
  designation?: string;
  status: 'ON_DUTY' | 'OFF_DUTY' | 'SOS' | 'DISCONNECTED';
  phone?: string;
  lastLocation?: string;
  lastSeen?: string;
  onClick?: () => void;
}

const statusConfig = {
  ON_DUTY:      { label: 'On Duty',      color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', icon: Signal },
  OFF_DUTY:     { label: 'Off Duty',     color: 'text-slate-600 bg-slate-50 border-slate-200', dot: 'bg-slate-400', icon: SignalZero },
  SOS:          { label: '🚨 SOS',       color: 'text-red-700 bg-red-50 border-red-200', dot: 'bg-red-500', icon: Signal },
  DISCONNECTED: { label: 'Disconnected', color: 'text-amber-700 bg-amber-50 border-amber-200', dot: 'bg-amber-500', icon: SignalZero },
};

const WorkerCard: React.FC<WorkerCardProps> = ({
  name,
  employeeId,
  designation,
  status,
  phone,
  lastLocation,
  lastSeen,
  onClick,
}) => {
  const statusInfo = statusConfig[status];
  const isSOS = status === 'SOS';

  return (
    <div
      onClick={onClick}
      className={`relative p-4 bg-white rounded-2xl border transition-all duration-300 cursor-pointer group ${
        isSOS
          ? 'border-red-300 shadow-lg shadow-red-100 hover:shadow-xl hover:shadow-red-200'
          : 'border-slate-200 hover:shadow-lg hover:-translate-y-0.5'
      }`}
    >
      {/* SOS pulse ring */}
      {isSOS && (
        <div className="absolute -top-1 -right-1 w-4 h-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500" />
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
          isSOS ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
        }`}>
          {name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${statusInfo.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot} ${status === 'ON_DUTY' ? 'animate-pulse' : ''}`} />
              {statusInfo.label}
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-0.5">{employeeId}{designation ? ` • ${designation}` : ''}</p>

          <div className="flex items-center gap-3 mt-2.5 text-[11px] text-slate-400">
            {lastLocation && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate max-w-[120px]">{lastLocation}</span>
              </span>
            )}
            {phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {phone}
              </span>
            )}
            {lastSeen && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lastSeen}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
