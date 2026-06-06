import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Badge,
  Calendar,
  Shield,
  Edit,
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const profileInfo = [
    { icon: Mail, label: 'Email', value: user?.email || '' },
    { icon: Phone, label: 'Phone', value: user?.phone || '+91-9876543212' },
    { icon: Badge, label: 'Role', value: user?.role?.replace('_', ' ') || '' },
    { icon: Shield, label: 'Employee ID', value: 'TM-1001' },
    { icon: Calendar, label: 'Joined', value: 'January 2024' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 pt-5 pb-16">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold">My Profile</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 -mt-12 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3 shadow-lg shadow-blue-500/20">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{user?.role?.replace('_', ' ')}</p>
          <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-xl hover:bg-blue-100 transition-all mx-auto cursor-pointer">
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Info */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {profileInfo.map((item, i) => (
            <div key={item.label} className={`flex items-center gap-4 px-5 py-4 ${i < profileInfo.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                <p className="text-sm font-semibold text-slate-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
