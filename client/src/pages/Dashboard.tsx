import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Users,
  MapPin,
  AlertTriangle,
  Clock,
  LogOut,
  Activity,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { label: 'Active Workers', value: '3', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { label: 'Total Zones', value: '3', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { label: 'Active Alerts', value: '1', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { label: 'Active Shifts', value: '3', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-slate-900">TrackMan Safety</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-medium text-slate-600">System Online</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.role?.replace('_', ' ')}</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p className="text-slate-500">
            Here's what's happening with your railway workers today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-5 bg-white rounded-xl border ${stat.border} hover:shadow-md transition-all duration-300 animate-slide-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Placeholder sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Live Map
            </h3>
            <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
              <p className="text-sm">Map will be integrated in Week 3</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Recent Alerts
            </h3>
            <div className="space-y-3">
              {[
                { msg: 'Worker entered Danger Zone: Nizamuddin Bridge', severity: 'HIGH', time: '2 min ago', color: 'bg-red-500' },
                { msg: 'Worker device went offline for 10+ minutes', severity: 'MEDIUM', time: '15 min ago', color: 'bg-amber-500' },
                { msg: 'Worker exited assigned maintenance zone', severity: 'HIGH', time: '1 hr ago', color: 'bg-red-500' },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`w-2 h-2 mt-2 rounded-full ${alert.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 truncate">{alert.msg}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{alert.time}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    alert.severity === 'HIGH' ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
