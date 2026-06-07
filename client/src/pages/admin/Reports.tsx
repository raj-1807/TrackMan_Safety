import React, { useState } from 'react';
import {
  FileBarChart,
  Download,
  TrendingUp,
  Users,
  AlertTriangle,
  MapPin,
  Clock,
  Activity,
  Shield,
  CheckCircle,
  XCircle,
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
          {/* ─── Overview Tab ─────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Chart */}
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
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500 cursor-pointer relative group"
                            style={{ height: `${height * 2.5}px` }}
                          >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all text-xs font-bold text-slate-700 bg-white shadow-md px-2 py-1 rounded-lg whitespace-nowrap">
                              {height} shifts
                            </div>
                          </div>
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

          {/* ─── Worker Activity Tab ──────────────────────── */}
          {activeTab === 'workers' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Worker</th>
                      <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Total Shifts</th>
                      <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Total Hours</th>
                      <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Avg Duration</th>
                      <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Zone Breaches</th>
                      <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">SOS Count</th>
                      <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'Amit Sharma', id: 'TM-1001', shifts: 28, hours: '196h', avgDuration: '7h', breaches: 0, sos: 0, status: 'excellent' },
                      { name: 'Vikram Singh', id: 'TM-1002', shifts: 25, hours: '175h', avgDuration: '7h', breaches: 1, sos: 0, status: 'good' },
                      { name: 'Suresh Patel', id: 'TM-1003', shifts: 24, hours: '168h', avgDuration: '7h', breaches: 0, sos: 1, status: 'good' },
                      { name: 'Manoj Yadav', id: 'TM-1004', shifts: 22, hours: '154h', avgDuration: '7h', breaches: 2, sos: 0, status: 'warning' },
                      { name: 'Ravi Verma', id: 'TM-1005', shifts: 20, hours: '140h', avgDuration: '7h', breaches: 3, sos: 0, status: 'warning' },
                    ].map((w) => (
                      <tr key={w.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                              {w.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{w.name}</p>
                              <p className="text-xs text-slate-400">{w.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-slate-700">{w.shifts}</td>
                        <td className="px-5 py-3.5 text-sm text-slate-600">{w.hours}</td>
                        <td className="px-5 py-3.5 text-sm text-slate-600">{w.avgDuration}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-sm font-semibold ${w.breaches > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
                            {w.breaches}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-sm font-semibold ${w.sos > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                            {w.sos}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${
                            w.status === 'excellent' ? 'text-emerald-700 bg-emerald-50'
                              : w.status === 'good' ? 'text-blue-700 bg-blue-50'
                              : 'text-amber-700 bg-amber-50'
                          }`}>
                            {w.status === 'excellent' ? '★ Excellent' : w.status === 'good' ? 'Good' : '⚠ Needs Review'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── Alert History Tab ────────────────────────── */}
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {/* Summary Row */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Total Alerts', value: '34', icon: AlertTriangle, color: 'text-blue-600 bg-blue-50' },
                  { label: 'Resolved', value: '28', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
                  { label: 'Avg Resolve Time', value: '4.2m', icon: Clock, color: 'text-amber-600 bg-amber-50' },
                  { label: 'Unresolved', value: '6', icon: XCircle, color: 'text-red-600 bg-red-50' },
                ].map((s) => (
                  <div key={s.label} className="p-3 bg-slate-50 rounded-xl text-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${s.color}`}>
                      <s.icon className="w-4 h-4" />
                    </div>
                    <p className="text-xl font-bold text-slate-900">{s.value}</p>
                    <p className="text-[10px] text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                {[
                  { date: 'Today', items: [
                    { time: '14:32', type: 'SOS', worker: 'Suresh Patel', message: 'SOS triggered at Ghaziabad Yard', status: 'ACTIVE', severity: 'CRITICAL' },
                    { time: '12:15', type: 'ZONE_BREACH', worker: 'Amit Sharma', message: 'Entered danger zone without authorization', status: 'RESOLVED', severity: 'HIGH' },
                  ]},
                  { date: 'Yesterday', items: [
                    { time: '18:45', type: 'DEVICE_OFFLINE', worker: 'Ravi Verma', message: 'Device offline for 15+ minutes', status: 'RESOLVED', severity: 'MEDIUM' },
                    { time: '09:30', type: 'GEOFENCE_EXIT', worker: 'Vikram Singh', message: 'Exited maintenance zone', status: 'RESOLVED', severity: 'HIGH' },
                    { time: '06:12', type: 'TRAIN_APPROACHING', worker: 'System', message: 'Train 12301 approaching Track 3', status: 'RESOLVED', severity: 'HIGH' },
                  ]},
                  { date: '2 days ago', items: [
                    { time: '16:20', type: 'SOS', worker: 'Manoj Yadav', message: 'SOS triggered during heavy rain', status: 'RESOLVED', severity: 'CRITICAL' },
                    { time: '11:00', type: 'DEVICE_OFFLINE', worker: 'Ravi Verma', message: 'Battery below 10%', status: 'RESOLVED', severity: 'LOW' },
                  ]},
                ].map((group) => (
                  <div key={group.date} className="mb-6">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 sticky top-0 bg-white py-1">{group.date}</h4>
                    <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                      {group.items.map((item, i) => (
                        <div key={i} className="relative pl-4">
                          <div className={`absolute -left-[9px] w-4 h-4 rounded-full border-2 border-white ${
                            item.severity === 'CRITICAL' ? 'bg-red-500' : item.severity === 'HIGH' ? 'bg-amber-500' : item.severity === 'MEDIUM' ? 'bg-blue-500' : 'bg-slate-400'
                          }`} />
                          <div className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono text-slate-400">{item.time}</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                item.severity === 'CRITICAL' ? 'text-red-700 bg-red-100' : item.severity === 'HIGH' ? 'text-amber-700 bg-amber-100' : 'text-blue-700 bg-blue-100'
                              }`}>
                                {item.type.replace('_', ' ')}
                              </span>
                              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                item.status === 'RESOLVED' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 font-medium">{item.message}</p>
                            <p className="text-xs text-slate-400 mt-1">Worker: {item.worker}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Zone Usage Tab ───────────────────────────── */}
          {activeTab === 'zones' && (
            <div className="space-y-6">
              {/* Zone cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'New Delhi Station - Track 3', type: 'MAINTENANCE', totalWorkers: 45, activeNow: 3, breaches: 1, shifts: 28, color: 'blue' },
                  { name: 'Nizamuddin Bridge', type: 'DANGER', totalWorkers: 0, activeNow: 0, breaches: 4, shifts: 0, color: 'red' },
                  { name: 'Ghaziabad Yard', type: 'SAFE', totalWorkers: 22, activeNow: 2, breaches: 0, shifts: 15, color: 'emerald' },
                ].map((zone) => (
                  <div key={zone.name} className={`p-5 bg-white rounded-2xl border border-${zone.color}-100 hover:shadow-md transition-all`}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`w-3 h-3 rounded-full bg-${zone.color}-500`} />
                      <h4 className="text-sm font-semibold text-slate-900 truncate">{zone.name}</h4>
                    </div>
                    <div className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full mb-4 text-${zone.color}-700 bg-${zone.color}-50`}>
                      {zone.type}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg text-center">
                        <p className="text-lg font-bold text-slate-900">{zone.totalWorkers}</p>
                        <p className="text-[10px] text-slate-500">Total Workers</p>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg text-center">
                        <p className="text-lg font-bold text-slate-900">{zone.activeNow}</p>
                        <p className="text-[10px] text-slate-500">Active Now</p>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg text-center">
                        <p className={`text-lg font-bold ${zone.breaches > 0 ? 'text-amber-600' : 'text-slate-900'}`}>{zone.breaches}</p>
                        <p className="text-[10px] text-slate-500">Breaches</p>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg text-center">
                        <p className="text-lg font-bold text-slate-900">{zone.shifts}</p>
                        <p className="text-[10px] text-slate-500">Shifts</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Usage over time */}
              <div className="border border-slate-200 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  Zone Utilization This Week
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'New Delhi Station - Track 3', usage: 85, color: 'bg-blue-500' },
                    { name: 'Ghaziabad Yard', usage: 62, color: 'bg-emerald-500' },
                    { name: 'Nizamuddin Bridge', usage: 0, color: 'bg-red-500' },
                    { name: 'Mathura Junction - Track 7', usage: 45, color: 'bg-blue-500' },
                    { name: 'Agra Railway Crossing', usage: 0, color: 'bg-red-500' },
                  ].map((zone) => (
                    <div key={zone.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-600 truncate max-w-[200px]">{zone.name}</span>
                        <span className="text-xs font-bold text-slate-700">{zone.usage}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${zone.color} transition-all duration-500`} style={{ width: `${zone.usage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
