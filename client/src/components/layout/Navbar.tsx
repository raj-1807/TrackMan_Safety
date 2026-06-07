import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Menu, Activity } from 'lucide-react';

interface NavbarProps {
  onMenuToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const roleLabel = user?.role === 'CONTROL_ROOM' ? 'Control Room' : user?.role === 'SUPERVISOR' ? 'Supervisor' : 'Trackman';

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 sticky top-0 z-40">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-sm font-bold text-[#1a237e]">TrackMan Safety System</h1>
          <p className="text-[10px] text-gray-400">Indian Railways — Safety Monitoring</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* System Status */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded text-[11px]">
          <Activity className="w-3 h-3 text-green-600" />
          <span className="font-medium text-green-700">System Online</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors cursor-pointer">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">{user?.name}</p>
            <p className="text-[10px] text-gray-400">{roleLabel}</p>
          </div>
          <div className="w-8 h-8 bg-[#1a237e] rounded flex items-center justify-center text-white font-bold text-xs">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
