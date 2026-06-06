import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: { value: string; isPositive: boolean };
  color: 'blue' | 'emerald' | 'amber' | 'red' | 'purple' | 'cyan';
}

const colorMap = {
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-600',    border: 'border-blue-100',    iconBg: 'bg-blue-100' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', iconBg: 'bg-emerald-100' },
  amber:   { bg: 'bg-amber-50',   text: 'text-amber-600',   border: 'border-amber-100',   iconBg: 'bg-amber-100' },
  red:     { bg: 'bg-red-50',     text: 'text-red-600',     border: 'border-red-100',     iconBg: 'bg-red-100' },
  purple:  { bg: 'bg-purple-50',  text: 'text-purple-600',  border: 'border-purple-100',  iconBg: 'bg-purple-100' },
  cyan:    { bg: 'bg-cyan-50',    text: 'text-cyan-600',    border: 'border-cyan-100',    iconBg: 'bg-cyan-100' },
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color }) => {
  const colors = colorMap[color];

  return (
    <div className={`relative p-5 bg-white rounded-2xl border ${colors.border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden`}>
      {/* Subtle background glow */}
      <div className={`absolute -top-10 -right-10 w-24 h-24 ${colors.bg} rounded-full opacity-50 group-hover:opacity-80 transition-opacity blur-2xl`} />

      <div className="relative flex items-start justify-between mb-4">
        <div className={`w-11 h-11 ${colors.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            trend.isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
          }`}>
            {trend.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.value}
          </div>
        )}
      </div>

      <div className="relative">
        <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</p>
        <p className="text-sm text-slate-500 mt-1 font-medium">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
