import React, { useState } from 'react';
import AlertCard from '../../components/cards/AlertCard';
import StatCard from '../../components/cards/StatCard';
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Filter,
  Shield,
} from 'lucide-react';

interface Alert {
  type: 'SOS' | 'ZONE_BREACH' | 'TRAIN_APPROACHING' | 'DEVICE_OFFLINE' | 'GEOFENCE_EXIT';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  workerName: string;
  time: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
}

const initialAlerts: Alert[] = [
  { type: 'SOS', severity: 'CRITICAL', message: '🚨 EMERGENCY: Worker Suresh Patel triggered SOS at Ghaziabad Yard!', workerName: 'Suresh Patel', time: 'Just now', status: 'ACTIVE' },
  { type: 'ZONE_BREACH', severity: 'HIGH', message: 'Worker entered Danger Zone: Nizamuddin Bridge without authorization', workerName: 'Amit Sharma', time: '2 min ago', status: 'ACTIVE' },
  { type: 'TRAIN_APPROACHING', severity: 'HIGH', message: 'Train 12301 approaching Track 3 — 3 workers in zone', workerName: 'System', time: '8 min ago', status: 'ACTIVE' },
  { type: 'DEVICE_OFFLINE', severity: 'MEDIUM', message: 'Worker device went offline for 10+ minutes', workerName: 'Ravi Verma', time: '15 min ago', status: 'ACKNOWLEDGED' },
  { type: 'GEOFENCE_EXIT', severity: 'HIGH', message: 'Worker exited assigned maintenance zone without authorization', workerName: 'Vikram Singh', time: '1 hr ago', status: 'RESOLVED' },
  { type: 'DEVICE_OFFLINE', severity: 'LOW', message: 'Worker device battery below 15%', workerName: 'Manoj Yadav', time: '2 hrs ago', status: 'RESOLVED' },
];

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const handleAcknowledge = (index: number) => {
    setAlerts((prev) => prev.map((a, i) => i === index ? { ...a, status: 'ACKNOWLEDGED' as const } : a));
  };

  const handleResolve = (index: number) => {
    setAlerts((prev) => prev.map((a, i) => i === index ? { ...a, status: 'RESOLVED' as const } : a));
  };

  const filtered = alerts.filter((a) => {
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchSeverity = severityFilter === 'all' || a.severity === severityFilter;
    return matchStatus && matchSeverity;
  });

  const counts = {
    total: alerts.length,
    active: alerts.filter((a) => a.status === 'ACTIVE').length,
    acknowledged: alerts.filter((a) => a.status === 'ACKNOWLEDGED').length,
    resolved: alerts.filter((a) => a.status === 'RESOLVED').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Alert Center</h2>
        <p className="text-sm text-slate-500 mt-1">Monitor, acknowledge, and resolve safety alerts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Alerts" value={counts.total} icon={Bell} color="blue" />
        <StatCard title="Active" value={counts.active} icon={AlertTriangle} color="red" />
        <StatCard title="Acknowledged" value={counts.acknowledged} icon={Clock} color="amber" />
        <StatCard title="Resolved" value={counts.resolved} icon={CheckCircle} color="emerald" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Filter by:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Status:</span>
            {['all', 'ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s === 'all' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:ml-4">
            <span className="text-xs text-slate-400">Severity:</span>
            {['all', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((s) => (
              <button
                key={s}
                onClick={() => setSeverityFilter(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  severityFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s === 'all' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {filtered.map((alert, i) => {
          // Find the original index in the unfiltered array
          const originalIndex = alerts.indexOf(alert);
          return (
            <div key={originalIndex} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <AlertCard
                {...alert}
                onAcknowledge={() => handleAcknowledge(originalIndex)}
                onResolve={() => handleResolve(originalIndex)}
              />
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Shield className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-700">All Clear!</h3>
            <p className="text-sm text-slate-400 mt-1">No alerts match your current filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
