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
  blue:    { text: 'text-blue-600',    iconBg: 'bg-blue-50' },
  emerald: { text: 'text-emerald-600', iconBg: 'bg-emerald-50' },
  amber:   { text: 'text-amber-600',   iconBg: 'bg-amber-50' },
  red:     { text: 'text-red-600',     iconBg: 'bg-red-50' },
  purple:  { text: 'text-purple-600',  iconBg: 'bg-purple-50' },
  cyan:    { text: 'text-cyan-600',    iconBg: 'bg-cyan-50' },
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color }) => {
  const colors = colorMap[color];

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.value}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{title}</p>
    </div>
  );
};

export default StatCard;
