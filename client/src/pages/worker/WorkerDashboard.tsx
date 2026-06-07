import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  MapPin,
  AlertTriangle,
  Clock,
  Navigation,
  LogOut,
  User,
  PlayCircle,
  StopCircle,
  X,
  CheckCircle,
  Phone,
} from 'lucide-react';

const WorkerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Shift state
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [shiftSeconds, setShiftSeconds] = useState(16320); // 4h 32m
  const [gpsActive, setGpsActive] = useState(true);

  // SOS state
  const [showSOSConfirm, setShowSOSConfirm] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(3);

  // Shift timer
  useEffect(() => {
    if (!isOnDuty) return;
    const timer = setInterval(() => setShiftSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isOnDuty]);

  // SOS countdown
  useEffect(() => {
    if (!showSOSConfirm) return;
    setSosCountdown(3);
    const timer = setInterval(() => {
      setSosCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          setShowSOSConfirm(false);
          setSosTriggered(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showSOSConfirm]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  const handleShiftToggle = () => {
    if (isOnDuty) {
      setIsOnDuty(false);
      setGpsActive(false);
    } else {
      setIsOnDuty(true);
      setShiftSeconds(0);
      setGpsActive(true);
    }
  };

  const cancelSOS = () => {
    setShowSOSConfirm(false);
    setSosCountdown(3);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SOS Confirmation Overlay */}
      {showSOSConfirm && (
        <div className="fixed inset-0 z-[9999] bg-red-600/95 flex items-center justify-center p-6">
          <div className="text-center text-white max-w-sm">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <AlertTriangle className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold mb-2">SOS Alert</h2>
            <p className="text-red-100 text-lg mb-6">
              Emergency alert will be sent in <span className="font-bold text-4xl">{sosCountdown}</span> seconds
            </p>
            <p className="text-red-200 text-sm mb-8">
              Your location and identity will be broadcast to all supervisors and control room
            </p>
            <button
              onClick={cancelSOS}
              className="px-8 py-3 bg-white text-red-600 font-bold rounded-xl text-lg hover:bg-red-50 transition-all cursor-pointer"
            >
              <X className="w-5 h-5 inline mr-2" />
              Cancel SOS
            </button>
          </div>
        </div>
      )}

      {/* SOS Triggered Confirmation */}
      {sosTriggered && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-8 max-w-sm text-center shadow-2xl animate-slide-up">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">🚨 SOS Sent!</h2>
            <p className="text-sm text-slate-500 mb-4">
              Emergency alert has been sent to your supervisor and control room. Help is on the way.
            </p>
            <div className="bg-red-50 rounded-xl p-3 mb-6 text-left">
              <p className="text-xs text-red-600 font-semibold">Alert Details:</p>
              <p className="text-xs text-red-500 mt-1">Worker: {user?.name}</p>
              <p className="text-xs text-red-500">Location: New Delhi Station — Track 3</p>
              <p className="text-xs text-red-500">Time: {new Date().toLocaleTimeString()}</p>
            </div>
            <div className="flex gap-3">
              <a
                href="tel:100"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl text-sm cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Call Emergency
              </a>
              <button
                onClick={() => setSosTriggered(false)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-200 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
            <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
              isOnDuty
                ? 'text-emerald-700 bg-emerald-50'
                : 'text-slate-600 bg-slate-100'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isOnDuty ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              {isOnDuty ? 'On Duty' : 'Off Duty'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Clock className="w-5 h-5 text-blue-600 mb-1" />
              <p className="text-lg font-bold text-slate-900 font-mono">{formatTime(shiftSeconds)}</p>
              <p className="text-[11px] text-slate-500">Shift Duration</p>
            </div>
            <div className={`p-3 rounded-xl ${gpsActive ? 'bg-emerald-50' : 'bg-slate-100'}`}>
              <Navigation className={`w-5 h-5 mb-1 ${gpsActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <p className="text-lg font-bold text-slate-900">{gpsActive ? 'Active' : 'Inactive'}</p>
              <p className="text-[11px] text-slate-500">GPS Tracking</p>
            </div>
          </div>

          {/* Shift Toggle */}
          <button
            onClick={handleShiftToggle}
            className={`w-full mt-4 py-3 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-sm ${
              isOnDuty
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
            }`}
          >
            {isOnDuty ? (
              <><StopCircle className="w-5 h-5" /> End Shift</>
            ) : (
              <><PlayCircle className="w-5 h-5" /> Start Shift</>
            )}
          </button>
        </div>

        {/* SOS Button */}
        <button
          onClick={() => setShowSOSConfirm(true)}
          className="w-full py-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-red-500/30 active:scale-[0.98] transition-transform cursor-pointer animate-pulse-glow"
        >
          <AlertTriangle className="w-7 h-7" />
          🚨 SOS EMERGENCY
        </button>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleShiftToggle}
            className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center gap-2 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-slate-700">{isOnDuty ? 'Check Out' : 'Check In'}</span>
          </button>
          <button
            onClick={() => navigate('/worker/map')}
            className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center gap-2 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm font-semibold text-slate-700">View Map</span>
          </button>
          <button
            onClick={() => setShowSOSConfirm(true)}
            className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center gap-2 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm font-semibold text-slate-700">SOS Alert</span>
          </button>
          <button
            onClick={() => navigate('/worker/profile')}
            className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center gap-2 hover:shadow-md transition-all cursor-pointer group"
          >
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
              { msg: 'Shift started successfully. GPS tracking active.', time: '4 hrs ago', type: 'info' },
            ].map((alert, i) => (
              <div key={i} className={`p-3 rounded-xl border ${
                alert.type === 'danger' ? 'border-red-200 bg-red-50'
                  : alert.type === 'warning' ? 'border-amber-200 bg-amber-50'
                  : 'border-blue-200 bg-blue-50'
              }`}>
                <p className={`text-sm font-medium ${
                  alert.type === 'danger' ? 'text-red-800'
                    : alert.type === 'warning' ? 'text-amber-800'
                    : 'text-blue-800'
                }`}>{alert.msg}</p>
                <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 safe-area-inset-bottom z-50">
          <div className="max-w-lg mx-auto flex items-center justify-around">
            {[
              { icon: Shield, label: 'Home', path: '/worker/dashboard', active: true },
              { icon: MapPin, label: 'Map', path: '/worker/map', active: false },
              { icon: AlertTriangle, label: 'SOS', path: '', active: false, isSOS: true },
              { icon: User, label: 'Profile', path: '/worker/profile', active: false },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.isSOS) setShowSOSConfirm(true);
                  else if (item.path) navigate(item.path);
                }}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  item.isSOS
                    ? 'text-red-500'
                    : item.active
                    ? 'text-blue-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.isSOS ? 'animate-pulse' : ''}`} />
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Spacer for bottom nav */}
        <div className="h-16" />
      </div>
    </div>
  );
};

export default WorkerDashboard;
