import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Clock,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import { ZONE_TYPE_LABELS, ZONE_COLORS } from '../../utils/constants';

interface Zone {
  id: string;
  name: string;
  type: 'MAINTENANCE' | 'DANGER' | 'SAFE';
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  createdBy: string;
  workerCount: number;
  alertCount: number;
}

const mockZones: Zone[] = [
  { id: '1', name: 'New Delhi Station - Track 3 Maintenance', type: 'MAINTENANCE', isActive: true, startTime: '06:00 AM', endTime: '02:00 PM', createdBy: 'Rajesh Kumar', workerCount: 3, alertCount: 1 },
  { id: '2', name: 'Nizamuddin Bridge - Danger Zone', type: 'DANGER', isActive: true, createdBy: 'Control Room Admin', workerCount: 0, alertCount: 4 },
  { id: '3', name: 'Ghaziabad Yard - Safe Zone', type: 'SAFE', isActive: true, createdBy: 'Rajesh Kumar', workerCount: 2, alertCount: 0 },
  { id: '4', name: 'Mathura Junction - Track 7 Repair', type: 'MAINTENANCE', isActive: false, startTime: '10:00 PM', endTime: '04:00 AM', createdBy: 'Rajesh Kumar', workerCount: 0, alertCount: 0 },
  { id: '5', name: 'Agra Railway Crossing - Restricted', type: 'DANGER', isActive: true, createdBy: 'Control Room Admin', workerCount: 0, alertCount: 2 },
];

const ZoneManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = mockZones.filter((z) => {
    const matchSearch = z.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || z.type === typeFilter;
    return matchSearch && matchType;
  });

  const typeBadge = (type: string) => {
    const colorMap: Record<string, string> = {
      MAINTENANCE: 'text-blue-700 bg-blue-50 border-blue-200',
      DANGER: 'text-red-700 bg-red-50 border-red-200',
      SAFE: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    };
    return (
      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${colorMap[type] || ''}`}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ZONE_COLORS[type] }} />
        {ZONE_TYPE_LABELS[type]}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Zone Management</h2>
          <p className="text-sm text-slate-500 mt-1">Create and manage geofenced safety zones</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all shadow-sm cursor-pointer">
          <Plus className="w-4 h-4" />
          Create Zone
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { type: 'MAINTENANCE', icon: MapPin, count: mockZones.filter((z) => z.type === 'MAINTENANCE').length, color: 'blue' },
          { type: 'DANGER', icon: AlertTriangle, count: mockZones.filter((z) => z.type === 'DANGER').length, color: 'red' },
          { type: 'SAFE', icon: Shield, count: mockZones.filter((z) => z.type === 'SAFE').length, color: 'emerald' },
        ].map((item) => (
          <div key={item.type} className={`p-4 bg-white rounded-2xl border border-${item.color}-100 flex items-center gap-4 hover:shadow-md transition-all`}>
            <div className={`w-11 h-11 bg-${item.color}-100 rounded-xl flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 text-${item.color}-600`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{item.count}</p>
              <p className="text-xs text-slate-500 font-medium">{ZONE_TYPE_LABELS[item.type]} Zones</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search zones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            {['all', 'MAINTENANCE', 'DANGER', 'SAFE'].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  typeFilter === t ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t === 'all' ? 'All' : ZONE_TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Zone Name</th>
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Type</th>
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Schedule</th>
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Workers</th>
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Alerts</th>
                <th className="text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((zone) => (
                <tr key={zone.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: ZONE_COLORS[zone.type] }} />
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{zone.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">{typeBadge(zone.type)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${
                      zone.isActive ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 bg-slate-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${zone.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                      {zone.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    {zone.startTime ? (
                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        {zone.startTime} - {zone.endTime}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-400">Always on</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="text-sm font-semibold text-slate-700">{zone.workerCount}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className={`text-sm font-semibold ${zone.alertCount > 0 ? 'text-amber-600' : 'text-slate-400'}`}>{zone.alertCount}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all cursor-pointer"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ZoneManagement;
