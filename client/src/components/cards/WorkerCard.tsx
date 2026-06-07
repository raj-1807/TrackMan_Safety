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
  ON_DUTY:      { label: 'On Duty',      color: 'text-green-700 bg-green-50 border-green-200', dot: 'bg-green-500' },
  OFF_DUTY:     { label: 'Off Duty',     color: 'text-gray-600 bg-gray-50 border-gray-200', dot: 'bg-gray-400' },
  SOS:          { label: 'SOS ALERT',    color: 'text-red-700 bg-red-50 border-red-200', dot: 'bg-red-500' },
  DISCONNECTED: { label: 'Disconnected', color: 'text-amber-700 bg-amber-50 border-amber-200', dot: 'bg-amber-500' },
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
      className={`p-3 bg-white rounded-lg border transition-colors cursor-pointer ${
        isSOS ? 'border-red-300 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`w-9 h-9 rounded flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${
          isSOS ? 'bg-red-600' : 'bg-[#1a237e]'
        }`}>
          {name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded border whitespace-nowrap ${statusInfo.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
              {statusInfo.label}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{employeeId}{designation ? ` · ${designation}` : ''}</p>
          <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-400">
            {lastLocation && (
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate max-w-[120px]">{lastLocation}</span>
              </span>
            )}
            {lastSeen && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 flex-shrink-0" />
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
