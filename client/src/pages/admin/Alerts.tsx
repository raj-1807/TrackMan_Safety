import React, { useState } from 'react';
import AlertCard from '../../components/cards/AlertCard';
import StatCard from '../../components/cards/StatCard';
import { AlertTriangle, Bell, CheckCircle, Clock, Shield } from 'lucide-react';

interface Alert {
  type: 'SOS' | 'ZONE_BREACH' | 'TRAIN_APPROACHING' | 'DEVICE_OFFLINE' | 'GEOFENCE_EXIT';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  workerName: string;
  time: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
}

const initialAlerts: Alert[] = [
  { type: 'SOS', severity: 'CRITICAL', message: 'EMERGENCY: Worker Suresh Patel triggered SOS at Ghaziabad Yard', workerName: 'Suresh Patel', time: 'Just now', status: 'ACTIVE' },
  { type: 'ZONE_BREACH', severity: 'HIGH', message: 'Worker entered Danger Zone: Nizamuddin Bridge without authorization', workerName: 'Amit Sharma', time: '2 min ago', status: 'ACTIVE' },
  { type: 'TRAIN_APPROACHING', severity: 'HIGH', message: 'Train 12301 approaching Track 3 — 3 workers in zone', workerName: 'System', time: '8 min ago', status: 'ACTIVE' },
  { type: 'DEVICE_OFFLINE', severity: 'MEDIUM', message: 'Worker device went offline for 10+ minutes', workerName: 'Ravi Verma', time: '15 min ago', status: 'ACKNOWLEDGED' },
  { type: 'GEOFENCE_EXIT', severity: 'HIGH', message: 'Worker exited assigned maintenance zone', workerName: 'Vikram Singh', time: '1 hr ago', status: 'RESOLVED' },
  { type: 'DEVICE_OFFLINE', severity: 'LOW', message: 'Worker device battery below 15%', workerName: 'Manoj Yadav', time: '2 hrs ago', status: 'RESOLVED' },
];

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const handleAcknowledge = (i: number) => {
    setAlerts((prev) => prev.map((a, idx) => idx === i ? { ...a, status: 'ACKNOWLEDGED' as const } : a));
  };
  const handleResolve = (i: number) => {
    setAlerts((prev) => prev.map((a, idx) => idx === i ? { ...a, status: 'RESOLVED' as const } : a));
  };

  const filtered = alerts.filter((a) => {
    return (statusFilter === 'all' || a.status === statusFilter) &&
           (severityFilter === 'all' || a.severity === severityFilter);
  });

  const counts = {
    total: alerts.length,
    active: alerts.filter((a) => a.status === 'ACTIVE').length,
    acknowledged: alerts.filter((a) => a.status === 'ACKNOWLEDGED').length,
    resolved: alerts.filter((a) => a.status === 'RESOLVED').length,
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Alert Center</h2>
        <p className="text-sm text-gray-500 mt-0.5">Monitor, acknowledge, and resolve safety alerts</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Total Alerts" value={counts.total} icon={Bell} color="blue" />
        <StatCard title="Active" value={counts.active} icon={AlertTriangle} color="red" />
        <StatCard title="Acknowledged" value={counts.acknowledged} icon={Clock} color="amber" />
        <StatCard title="Resolved" value={counts.resolved} icon={CheckCircle} color="emerald" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-xs font-medium text-gray-500">Status:</span>
          <div className="flex items-center gap-1.5">
            {['all', 'ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  statusFilter === s ? 'bg-[#1a237e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {s === 'all' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <span className="text-xs font-medium text-gray-500 sm:ml-4">Severity:</span>
          <div className="flex items-center gap-1.5">
            {['all', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((s) => (
              <button key={s} onClick={() => setSeverityFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  severityFilter === s ? 'bg-[#1a237e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {s === 'all' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((alert, i) => {
          const oi = alerts.indexOf(alert);
          return (
            <AlertCard key={oi} {...alert}
              onAcknowledge={() => handleAcknowledge(oi)}
              onResolve={() => handleResolve(oi)}
            />
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Shield className="w-10 h-10 text-green-300 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-700">All Clear</h3>
            <p className="text-sm text-gray-400 mt-1">No alerts match your current filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
