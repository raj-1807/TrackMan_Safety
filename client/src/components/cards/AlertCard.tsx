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
  DEVICE_OFFLINE:    { icon: WifiOff, color: 'text-gray-500' },
  GEOFENCE_EXIT:     { icon: Navigation, color: 'text-orange-500' },
};

const severityConfig = {
  LOW:      'text-blue-700 bg-blue-50',
  MEDIUM:   'text-amber-700 bg-amber-50',
  HIGH:     'text-orange-700 bg-orange-50',
  CRITICAL: 'text-red-700 bg-red-50',
};

const statusConfig = {
  ACTIVE:       { label: 'Active', color: 'text-red-600 bg-red-50' },
  ACKNOWLEDGED: { label: 'Acknowledged', color: 'text-amber-600 bg-amber-50' },
  RESOLVED:     { label: 'Resolved', color: 'text-green-600 bg-green-50' },
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
  const statusInfo = statusConfig[status];

  return (
    <div
      onClick={onClick}
      className={`p-3 bg-white rounded-lg border transition-colors cursor-pointer ${
        severity === 'CRITICAL' && status === 'ACTIVE'
          ? 'border-red-300 bg-red-50/20'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
          severity === 'CRITICAL' ? 'bg-red-100' : 'bg-gray-100'
        }`}>
          <typeInfo.icon className={`w-4 h-4 ${typeInfo.color}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${severityConfig[severity]}`}>
              {severity}
            </span>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
          <p className="text-sm text-gray-800 font-medium leading-snug">{message}</p>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-400">
            <span className="font-medium text-gray-500">{workerName}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {time}
            </span>
          </div>

          {/* Actions */}
          {(onAcknowledge || onResolve) && status !== 'RESOLVED' && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
              {onAcknowledge && status === 'ACTIVE' && (
                <button
                  onClick={(e) => { e.stopPropagation(); onAcknowledge(); }}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  <CheckCircle className="w-3 h-3" />
                  Acknowledge
                </button>
              )}
              {onResolve && (status === 'ACTIVE' || status === 'ACKNOWLEDGED') && (
                <button
                  onClick={(e) => { e.stopPropagation(); onResolve(); }}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-green-700 bg-green-50 border border-green-200 rounded hover:bg-green-100 transition-colors cursor-pointer"
                >
                  <CheckCheck className="w-3 h-3" />
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
