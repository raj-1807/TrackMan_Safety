import React from 'react';
import StatCard from '../../components/cards/StatCard';
import WorkerCard from '../../components/cards/WorkerCard';
import AlertCard from '../../components/cards/AlertCard';
import MapComponent from '../../components/maps/MapComponent';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  MapPin,
  AlertTriangle,
  Clock,
  Shield,
  Activity,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data — will be replaced with API calls
  const stats = [
    { title: 'Active Workers', value: '12', icon: Users, color: 'emerald' as const, trend: { value: '+3', isPositive: true } },
    { title: 'Total Zones', value: '8', icon: MapPin, color: 'blue' as const, trend: { value: '+1', isPositive: true } },
    { title: 'Active Alerts', value: '4', icon: AlertTriangle, color: 'amber' as const, trend: { value: '+2', isPositive: false } },
    { title: 'Active Shifts', value: '12', icon: Clock, color: 'purple' as const },
    { title: 'SOS Today', value: '0', icon: Shield, color: 'red' as const },
    { title: 'Uptime', value: '99.8%', icon: Activity, color: 'cyan' as const, trend: { value: '+0.2%', isPositive: true } },
  ];

  const recentWorkers = [
    { name: 'Amit Sharma', employeeId: 'TM-1001', designation: 'Senior Trackman', status: 'ON_DUTY' as const, phone: '+91-9876543212', lastLocation: 'New Delhi Station - Track 3', lastSeen: '2 min ago' },
    { name: 'Vikram Singh', employeeId: 'TM-1002', designation: 'Senior Trackman', status: 'ON_DUTY' as const, lastLocation: 'Nizamuddin Bridge', lastSeen: '5 min ago' },
    { name: 'Suresh Patel', employeeId: 'TM-1003', designation: 'Trackman', status: 'SOS' as const, lastLocation: 'Ghaziabad Yard', lastSeen: 'Just now' },
    { name: 'Manoj Yadav', employeeId: 'TM-1004', designation: 'Trackman', status: 'OFF_DUTY' as const, lastSeen: '2 hrs ago' },
    { name: 'Ravi Verma', employeeId: 'TM-1005', designation: 'Trackman', status: 'DISCONNECTED' as const, lastSeen: '45 min ago' },
  ];

  const recentAlerts = [
    { type: 'SOS' as const, severity: 'CRITICAL' as const, message: '🚨 EMERGENCY: Worker Suresh Patel triggered SOS at Ghaziabad Yard!', workerName: 'Suresh Patel', time: 'Just now', status: 'ACTIVE' as const },
    { type: 'ZONE_BREACH' as const, severity: 'HIGH' as const, message: 'Worker entered Danger Zone: Nizamuddin Bridge', workerName: 'Amit Sharma', time: '2 min ago', status: 'ACTIVE' as const },
    { type: 'DEVICE_OFFLINE' as const, severity: 'MEDIUM' as const, message: 'Worker device went offline for 10+ minutes', workerName: 'Ravi Verma', time: '15 min ago', status: 'ACKNOWLEDGED' as const },
    { type: 'GEOFENCE_EXIT' as const, severity: 'HIGH' as const, message: 'Worker exited assigned maintenance zone without authorization', workerName: 'Vikram Singh', time: '1 hr ago', status: 'RESOLVED' as const },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-sm text-slate-500 mt-1">Real-time safety monitoring of all railway workers</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={stat.title} className="animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Map Preview + Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Live Map */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-semibold text-slate-900">Live Worker Map</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-700">Live</span>
              </div>
              <button
                onClick={() => navigate('/admin/monitoring')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Full Screen →
              </button>
            </div>
          </div>
          <MapComponent height="h-80" />
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-semibold text-slate-900">Recent Alerts</h3>
            </div>
            <button
              onClick={() => navigate('/admin/alerts')}
              className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full hover:bg-red-100 transition-all cursor-pointer"
            >
              4 Active
            </button>
          </div>
          <div className="p-3 space-y-2 max-h-[380px] overflow-y-auto">
            {recentAlerts.map((alert, i) => (
              <AlertCard key={i} {...alert} />
            ))}
          </div>
        </div>
      </div>

      {/* Worker Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-semibold text-slate-900">Worker Status</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Updated 30s ago</span>
            <button
              onClick={() => navigate('/admin/workers')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              View All →
            </button>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {recentWorkers.map((worker) => (
            <WorkerCard key={worker.employeeId} {...worker} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
