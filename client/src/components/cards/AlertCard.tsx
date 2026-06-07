import React from 'react';
import { AlertTriangle, Shield, WifiOff, Navigation, Clock, CheckCircle, CheckCheck } from 'lucide-react';

interface AlertCardProps {
  type: 'ZONE_BREACH' | 'SOS' | 'TRAIN_APPROACHING' | 'DEVICE_OFFLINE' | 'GEOFENCE_EXIT';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  workerName: string;
  time: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  onClick?: () => void;
  onAcknowledge?: () => void;
  onResolve?: () => void;
}

const typeConfig = {
  ZONE_BREACH:       { icon: Shield, color: 'text-red-500' },
  SOS:               { icon: AlertTriangle, color: 'text-red-600' },
  TRAIN_APPROACHING: { icon: Navigation, color: 'text-amber-500' },
  DEVICE_OFFLINE:    { icon: WifiOff, color: 'text-slate-500' },
  GEOFENCE_EXIT:     { icon: Navigation, color: 'text-orange-500' },
};

const severityConfig = {
  LOW:      { color: 'text-blue-700 bg-blue-50 border-blue-200' },
  MEDIUM:   { color: 'text-amber-700 bg-amber-50 border-amber-200' },
  HIGH:     { color: 'text-orange-700 bg-orange-50 border-orange-200' },
  CRITICAL: { color: 'text-red-700 bg-red-50 border-red-200' },
};

const statusConfig = {
  ACTIVE:       { label: 'Active', color: 'text-red-600 bg-red-50' },
  ACKNOWLEDGED: { label: 'Acknowledged', color: 'text-amber-600 bg-amber-50' },
  RESOLVED:     { label: 'Resolved', color: 'text-emerald-600 bg-emerald-50' },
};

const AlertCard: React.FC<AlertCardProps> = ({
  type,
  severity,
  message,
  workerName,
  time,
  status,
  onClick,
  onAcknowledge,
  onResolve,
}) => {
  const typeInfo = typeConfig[type];
  const sevInfo = severityConfig[severity];
  const statusInfo = statusConfig[status];
  const isCritical = severity === 'CRITICAL';

  return (
    <div
      onClick={onClick}
      className={`relative p-4 bg-white rounded-2xl border transition-all duration-300 cursor-pointer group ${
        isCritical
          ? 'border-red-200 hover:shadow-lg hover:shadow-red-100'
          : 'border-slate-200 hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      {/* Critical pulse */}
      {isCritical && status === 'ACTIVE' && (
        <div className="absolute top-3 right-3">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isCritical ? 'bg-red-100' : 'bg-slate-100'
        }`}>
          <typeInfo.icon className={`w-5 h-5 ${typeInfo.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${sevInfo.color}`}>
              {severity}
            </span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
          <p className="text-sm text-slate-800 font-medium leading-snug line-clamp-2">{message}</p>
          <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
            <span className="font-medium text-slate-500">{workerName}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {time}
            </span>
          </div>

          {/* Action Buttons */}
          {(onAcknowledge || onResolve) && status !== 'RESOLVED' && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
              {onAcknowledge && status === 'ACTIVE' && (
                <button
                  onClick={(e) => { e.stopPropagation(); onAcknowledge(); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-all cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Acknowledge
                </button>
              )}
              {onResolve && (status === 'ACTIVE' || status === 'ACKNOWLEDGED') && (
                <button
                  onClick={(e) => { e.stopPropagation(); onResolve(); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Resolve
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
