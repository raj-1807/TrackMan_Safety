import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Shield, MapPin, AlertTriangle, Clock, Navigation, LogOut, User,
  PlayCircle, StopCircle, X, CheckCircle, Phone,
} from 'lucide-react';

const WorkerDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOnDuty, setIsOnDuty] = useState(true);
  const [shiftSeconds, setShiftSeconds] = useState(16320);
  const [gpsActive, setGpsActive] = useState(true);
  const [showSOSConfirm, setShowSOSConfirm] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(3);

  useEffect(() => {
    if (!isOnDuty) return;
    const t = setInterval(() => setShiftSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [isOnDuty]);

  useEffect(() => {
    if (!showSOSConfirm) return;
    setSosCountdown(3);
    const t = setInterval(() => {
      setSosCountdown((c) => {
        if (c <= 1) { clearInterval(t); setShowSOSConfirm(false); setSosTriggered(true); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [showSOSConfirm]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m ${sec.toString().padStart(2, '0')}s`;
  };

  const handleShiftToggle = () => {
    if (isOnDuty) { setIsOnDuty(false); setGpsActive(false); }
    else { setIsOnDuty(true); setShiftSeconds(0); setGpsActive(true); }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* SOS Overlay */}
      {showSOSConfirm && (
        <div className="fixed inset-0 z-[9999] bg-red-700/95 flex items-center justify-center p-6">
          <div className="text-center text-white max-w-sm">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">SOS Alert</h2>
            <p className="text-red-100 text-lg mb-4">
              Sending in <span className="font-bold text-3xl">{sosCountdown}</span> seconds
            </p>
            <p className="text-red-200 text-sm mb-6">Your location will be sent to all supervisors and control room</p>
            <button onClick={() => { setShowSOSConfirm(false); setSosCountdown(3); }}
              className="px-6 py-2.5 bg-white text-red-700 font-bold rounded text-sm cursor-pointer">
              <X className="w-4 h-4 inline mr-1" /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* SOS Sent */}
      {sosTriggered && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg p-6 max-w-sm text-center shadow-xl">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-7 h-7 text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">SOS Sent</h2>
            <p className="text-sm text-gray-500 mb-4">Emergency alert sent to supervisor and control room.</p>
            <div className="bg-red-50 rounded p-3 mb-4 text-left text-xs text-red-600">
              <p>Worker: {user?.name}</p>
              <p>Location: New Delhi Station — Track 3</p>
              <p>Time: {new Date().toLocaleTimeString()}</p>
            </div>
            <div className="flex gap-2">
              <a href="tel:100" className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-600 text-white font-medium rounded text-sm cursor-pointer">
                <Phone className="w-4 h-4" /> Call Emergency
              </a>
              <button onClick={() => setSosTriggered(false)} className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded text-sm cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-[#1a237e] text-white px-4 py-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold">TrackMan Safety</h1>
              <p className="text-[11px] text-white/50">Welcome, {user?.name?.split(' ')[0]}</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/login'); }} className="p-2 bg-white/10 rounded hover:bg-white/20 cursor-pointer">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-600">Your Status</h2>
            <span className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded ${
              isOnDuty ? 'text-green-700 bg-green-50' : 'text-gray-500 bg-gray-100'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isOnDuty ? 'bg-green-500' : 'bg-gray-400'}`} />
              {isOnDuty ? 'On Duty' : 'Off Duty'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600 mb-1" />
              <p className="text-base font-bold text-gray-900 font-mono">{formatTime(shiftSeconds)}</p>
              <p className="text-[10px] text-gray-500">Shift Duration</p>
            </div>
            <div className={`p-3 rounded-lg ${gpsActive ? 'bg-green-50' : 'bg-gray-100'}`}>
              <Navigation className={`w-4 h-4 mb-1 ${gpsActive ? 'text-green-600' : 'text-gray-400'}`} />
              <p className="text-base font-bold text-gray-900">{gpsActive ? 'Active' : 'Off'}</p>
              <p className="text-[10px] text-gray-500">GPS Tracking</p>
            </div>
          </div>
          <button onClick={handleShiftToggle}
            className={`w-full mt-3 py-2.5 font-medium rounded flex items-center justify-center gap-2 text-sm cursor-pointer transition-colors ${
              isOnDuty ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-green-600 text-white hover:bg-green-700'
            }`}>
            {isOnDuty ? <><StopCircle className="w-4 h-4" /> End Shift</> : <><PlayCircle className="w-4 h-4" /> Start Shift</>}
          </button>
        </div>

        {/* SOS */}
        <button onClick={() => setShowSOSConfirm(true)}
          className="w-full py-4 bg-red-600 text-white text-lg font-bold rounded-lg flex items-center justify-center gap-3 shadow-md active:scale-[0.98] transition-transform cursor-pointer">
          <AlertTriangle className="w-6 h-6" />
          SOS EMERGENCY
        </button>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Clock, label: isOnDuty ? 'Check Out' : 'Check In', action: handleShiftToggle, bg: 'bg-blue-50', color: 'text-blue-600' },
            { icon: MapPin, label: 'View Map', action: () => navigate('/worker/map'), bg: 'bg-green-50', color: 'text-green-600' },
            { icon: AlertTriangle, label: 'SOS Alert', action: () => setShowSOSConfirm(true), bg: 'bg-amber-50', color: 'text-amber-600' },
            { icon: User, label: 'Profile', action: () => navigate('/worker/profile'), bg: 'bg-purple-50', color: 'text-purple-600' },
          ].map((item) => (
            <button key={item.label} onClick={item.action}
              className="p-3.5 bg-white rounded-lg border border-gray-200 flex flex-col items-center gap-2 hover:border-gray-300 transition-colors cursor-pointer">
              <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Alerts</h3>
          <div className="space-y-2">
            {[
              { msg: 'Train approaching Track 3 — clear immediately', time: '5 min ago', type: 'danger' },
              { msg: 'You are near Danger Zone: Nizamuddin Bridge', time: '1 hr ago', type: 'warning' },
              { msg: 'Shift started. GPS tracking active.', time: '4 hrs ago', type: 'info' },
            ].map((a, i) => (
              <div key={i} className={`p-2.5 rounded border ${
                a.type === 'danger' ? 'border-red-200 bg-red-50' : a.type === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-blue-200 bg-blue-50'
              }`}>
                <p className={`text-sm font-medium ${
                  a.type === 'danger' ? 'text-red-800' : a.type === 'warning' ? 'text-amber-800' : 'text-blue-800'
                }`}>{a.msg}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
          <div className="max-w-lg mx-auto flex items-center justify-around">
            {[
              { icon: Shield, label: 'Home', path: '/worker/dashboard', active: true },
              { icon: MapPin, label: 'Map', path: '/worker/map' },
              { icon: AlertTriangle, label: 'SOS', isSOS: true },
              { icon: User, label: 'Profile', path: '/worker/profile' },
            ].map((item) => (
              <button key={item.label}
                onClick={() => { if (item.isSOS) setShowSOSConfirm(true); else if (item.path) navigate(item.path); }}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded cursor-pointer ${
                  item.isSOS ? 'text-red-500' : item.active ? 'text-[#1a237e]' : 'text-gray-400'
                }`}>
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="h-14" />
      </div>
    </div>
  );
};

export default WorkerDashboard;
