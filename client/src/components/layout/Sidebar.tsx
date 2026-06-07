import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Monitor,
  Users,
  MapPin,
  AlertTriangle,
  FileBarChart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles?: string[];
}

const allNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Live Monitoring', path: '/admin/monitoring', icon: Monitor, roles: ['CONTROL_ROOM'] },
  { label: 'Worker Management', path: '/admin/workers', icon: Users },
  { label: 'Zone Management', path: '/admin/zones', icon: MapPin },
  { label: 'Alerts', path: '/admin/alerts', icon: AlertTriangle },
  { label: 'Reports', path: '/admin/reports', icon: FileBarChart, roles: ['CONTROL_ROOM'] },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = allNavItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role || '');
  });

  const roleLabel = user?.role === 'CONTROL_ROOM' ? 'Control Room' : 'Supervisor';

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen bg-[#0d1b3e] text-white flex flex-col z-50 transition-all duration-200 ${
          collapsed ? 'w-[64px]' : 'w-[240px]'
        } ${collapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}
      >
        {/* Header */}
        <div className={`flex items-center gap-3 px-4 h-14 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
          {!collapsed && (
            <>
              <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white leading-tight">TrackMan Safety</p>
                <p className="text-[10px] text-white/40">{roleLabel} Panel</p>
              </div>
            </>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {!collapsed && (
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-3 mb-2">Navigation</p>
          )}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded text-[13px] font-medium transition-colors ${
                  collapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-white/10 p-2">
          <div className={`flex items-center gap-2 px-3 py-2 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-white/40 truncate">{roleLabel}</p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={handleLogout}
                className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-16 w-6 h-6 bg-[#0d1b3e] border border-white/20 rounded-full items-center justify-center text-white/60 hover:text-white hover:bg-[#1a2d5a] transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
