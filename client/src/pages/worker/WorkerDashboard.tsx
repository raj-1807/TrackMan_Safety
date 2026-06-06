import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  MapPin,
  AlertTriangle,
  Clock,
  Phone,
  Navigation,
  LogOut,
  Activity,
  User,
} from 'lucide-react';

const WorkerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-5 safe-area-inset-top">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-bold">TrackMan Safety</h1>
              <p className="text-xs text-blue-200">Welcome, {user?.name?.split(' ')[0]}</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/login'); }} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all cursor-pointer">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Status Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-600">Your Status</h2>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              On Duty
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Clock className="w-5 h-5 text-blue-600 mb-1" />
              <p className="text-lg font-bold text-slate-900">4h 32m</p>
              <p className="text-[11px] text-slate-500">Shift Duration</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Navigation className="w-5 h-5 text-emerald-600 mb-1" />
              <p className="text-lg font-bold text-slate-900">Active</p>
              <p className="text-[11px] text-slate-500">GPS Tracking</p>
            </div>
          </div>
        </div>

        {/* SOS Button */}
        <button className="w-full py-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-red-500/30 active:scale-[0.98] transition-transform cursor-pointer animate-pulse-glow">
          <AlertTriangle className="w-7 h-7" />
          🚨 SOS EMERGENCY
        </button>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center gap-2 hover:shadow-md transition-all cursor-pointer group">
            <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Check In</span>
          </button>
          <button className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center gap-2 hover:shadow-md transition-all cursor-pointer group">
            <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm font-semibold text-slate-700">View Map</span>
          </button>
          <button className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center gap-2 hover:shadow-md transition-all cursor-pointer group">
            <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Alerts</span>
          </button>
          <button className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center gap-2 hover:shadow-md transition-all cursor-pointer group">
            <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Profile</span>
          </button>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Recent Alerts</h3>
          <div className="space-y-2.5">
            {[
              { msg: 'Train approaching Track 3 — clear immediately', time: '5 min ago', type: 'danger' },
              { msg: 'You are near Danger Zone: Nizamuddin Bridge', time: '1 hr ago', type: 'warning' },
            ].map((alert, i) => (
              <div key={i} className={`p-3 rounded-xl border ${
                alert.type === 'danger' ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'
              }`}>
                <p className={`text-sm font-medium ${alert.type === 'danger' ? 'text-red-800' : 'text-amber-800'}`}>{alert.msg}</p>
                <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
