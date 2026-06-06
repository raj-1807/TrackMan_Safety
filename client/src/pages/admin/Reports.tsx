import React, { useState } from 'react';
import {
  FileBarChart,
  Calendar,
  Download,
  TrendingUp,
  Users,
  AlertTriangle,
  MapPin,
  Clock,
  Activity,
  Shield,
} from 'lucide-react';

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7d');

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'workers', label: 'Worker Activity' },
    { key: 'alerts', label: 'Alert History' },
    { key: 'zones', label: 'Zone Usage' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reports & Analytics</h2>
          <p className="text-sm text-slate-500 mt-1">Detailed insights into worker safety and system performance</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {['24h', '7d', '30d', '90d'].map((d) => (
              <button
                key={d}
                onClick={() => setDateRange(d)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  dateRange === d ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Shifts Logged', value: '156', icon: Clock, color: 'text-blue-600 bg-blue-50', trend: '+12%' },
          { label: 'Avg Response Time', value: '2.4m', icon: Activity, color: 'text-emerald-600 bg-emerald-50', trend: '-18%' },
          { label: 'Zone Breaches', value: '7', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50', trend: '-30%' },
          { label: 'Safety Score', value: '94%', icon: Shield, color: 'text-blue-600 bg-blue-50', trend: '+5%' },
        ].map((stat) => (
          <div key={stat.label} className="p-5 bg-white rounded-2xl border border-slate-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-600">{stat.trend}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-100 px-5">
          <div className="flex items-center gap-1 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'text-blue-600 border-blue-600'
                    : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Chart Placeholder */}
              <div className="border border-slate-200 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Weekly Activity Trend
                </h3>
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                    const height = [65, 78, 45, 88, 70, 55, 40][i];
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex flex-col gap-1">
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                            style={{ height: `${height * 2.5}px` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    Top Active Workers
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Amit Sharma', hours: '42h', shifts: 6 },
                      { name: 'Vikram Singh', hours: '38h', shifts: 5 },
                      { name: 'Suresh Patel', hours: '35h', shifts: 5 },
                    ].map((w, i) => (
                      <div key={w.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold">#{i + 1}</span>
                          <span className="text-sm font-medium text-slate-700">{w.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-900">{w.hours}</p>
                          <p className="text-xs text-slate-400">{w.shifts} shifts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Zone Activity
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'New Delhi Station - Track 3', workers: 12, type: 'MAINTENANCE' },
                      { name: 'Nizamuddin Bridge', workers: 0, type: 'DANGER' },
                      { name: 'Ghaziabad Yard', workers: 5, type: 'SAFE' },
                    ].map((z) => (
                      <div key={z.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            z.type === 'MAINTENANCE' ? 'bg-blue-500' : z.type === 'DANGER' ? 'bg-red-500' : 'bg-emerald-500'
                          }`} />
                          <span className="text-sm font-medium text-slate-700 truncate max-w-[180px]">{z.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{z.workers} workers</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <FileBarChart className="w-14 h-14 text-slate-200 mb-4" />
              <h3 className="text-lg font-semibold text-slate-600">Coming Soon</h3>
              <p className="text-sm text-slate-400 mt-1">{tabs.find((t) => t.key === activeTab)?.label} report will be available in the next update</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
