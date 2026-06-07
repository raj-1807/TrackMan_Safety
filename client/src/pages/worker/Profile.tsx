import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Badge, Calendar, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f0f2f5]">
      <header className="bg-[#1a237e] text-white px-4 pt-4 pb-14">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded hover:bg-white/20 cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-bold">My Profile</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 -mt-10 space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
          <div className="w-16 h-16 bg-[#1a237e] rounded-lg flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{user?.role?.replace('_', ' ')}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {profileInfo.map((item, i) => (
            <div key={item.label} className={`flex items-center gap-3 px-4 py-3 ${i < profileInfo.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium">{item.label}</p>
                <p className="text-sm font-medium text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
