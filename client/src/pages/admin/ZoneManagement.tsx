import React, { useState } from 'react';
import CreateZoneModal from '../../components/modals/CreateZoneModal';
import { MapPin, Plus, Search, Eye, Edit, Trash2, Clock, Shield, AlertTriangle } from 'lucide-react';
import { ZONE_TYPE_LABELS, ZONE_COLORS } from '../../utils/constants';

interface Zone {
  id: string; name: string; type: 'MAINTENANCE' | 'DANGER' | 'SAFE'; isActive: boolean;
  startTime?: string; endTime?: string; createdBy: string; workerCount: number; alertCount: number;
}

const initialZones: Zone[] = [
  { id: '1', name: 'New Delhi Station - Track 3 Maintenance', type: 'MAINTENANCE', isActive: true, startTime: '06:00 AM', endTime: '02:00 PM', createdBy: 'Rajesh Kumar', workerCount: 3, alertCount: 1 },
  { id: '2', name: 'Nizamuddin Bridge - Danger Zone', type: 'DANGER', isActive: true, createdBy: 'Control Room Admin', workerCount: 0, alertCount: 4 },
  { id: '3', name: 'Ghaziabad Yard - Safe Zone', type: 'SAFE', isActive: true, createdBy: 'Rajesh Kumar', workerCount: 2, alertCount: 0 },
  { id: '4', name: 'Mathura Junction - Track 7 Repair', type: 'MAINTENANCE', isActive: false, startTime: '10:00 PM', endTime: '04:00 AM', createdBy: 'Rajesh Kumar', workerCount: 0, alertCount: 0 },
  { id: '5', name: 'Agra Railway Crossing - Restricted', type: 'DANGER', isActive: true, createdBy: 'Control Room Admin', workerCount: 0, alertCount: 2 },
];

const ZoneManagement: React.FC = () => {
  const [zones, setZones] = useState(initialZones);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filtered = zones.filter((z) => {
    return z.name.toLowerCase().includes(search.toLowerCase()) && (typeFilter === 'all' || z.type === typeFilter);
  });

  const handleCreateZone = (data: any) => {
    setZones((prev) => [...prev, { id: String(prev.length + 1), name: data.name, type: data.type,
      isActive: true, startTime: data.startTime || undefined, endTime: data.endTime || undefined,
      createdBy: 'Current User', workerCount: 0, alertCount: 0 }]);
  };

  const typeBadge = (type: string) => {
    const c: Record<string, string> = {
      MAINTENANCE: 'text-blue-700 bg-blue-50 border-blue-200',
      DANGER: 'text-red-700 bg-red-50 border-red-200',
      SAFE: 'text-green-700 bg-green-50 border-green-200',
    };
    return (
      <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded border ${c[type] || ''}`}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ZONE_COLORS[type] }} />
        {ZONE_TYPE_LABELS[type]}
      </span>
    );
  };

  return (
    <div className="space-y-5">
      <CreateZoneModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSubmit={handleCreateZone} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Zone Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">Create and manage geofenced safety zones</p>
        </div>
        <button onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a237e] text-white text-sm font-medium rounded hover:bg-[#283593] transition-colors cursor-pointer">
          <Plus className="w-4 h-4" /> Create Zone
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { type: 'MAINTENANCE', icon: MapPin, count: zones.filter((z) => z.type === 'MAINTENANCE').length, bg: 'bg-blue-50', text: 'text-blue-600' },
          { type: 'DANGER', icon: AlertTriangle, count: zones.filter((z) => z.type === 'DANGER').length, bg: 'bg-red-50', text: 'text-red-600' },
          { type: 'SAFE', icon: Shield, count: zones.filter((z) => z.type === 'SAFE').length, bg: 'bg-green-50', text: 'text-green-600' },
        ].map((item) => (
          <div key={item.type} className="p-4 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
            <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 ${item.text}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{item.count}</p>
              <p className="text-xs text-gray-500">{ZONE_TYPE_LABELS[item.type]} Zones</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search zones..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-colors" />
          </div>
          <div className="flex items-center gap-1.5">
            {['all', 'MAINTENANCE', 'DANGER', 'SAFE'].map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  typeFilter === t ? 'bg-[#1a237e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>{t === 'all' ? 'All' : ZONE_TYPE_LABELS[t]}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-gray-50">
              {['Zone Name', 'Type', 'Status', 'Schedule', 'Workers', 'Alerts', 'Actions'].map((h) => (
                <th key={h} className={`text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5 ${
                  ['Schedule'].includes(h) ? 'hidden md:table-cell' : ['Workers','Alerts'].includes(h) ? 'hidden lg:table-cell' : ''
                } ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((z) => (
                <tr key={z.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: ZONE_COLORS[z.type] }} />
                      <span className="text-sm font-medium text-gray-800">{z.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{typeBadge(z.type)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      z.isActive ? 'text-green-700 bg-green-50' : 'text-gray-500 bg-gray-100'
                    }`}>{z.isActive ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {z.startTime ? (
                      <span className="flex items-center gap-1 text-sm text-gray-500"><Clock className="w-3.5 h-3.5" />{z.startTime} - {z.endTime}</span>
                    ) : <span className="text-sm text-gray-400">Always on</span>}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-sm font-medium text-gray-700">{z.workerCount}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`text-sm font-medium ${z.alertCount > 0 ? 'text-amber-600' : 'text-gray-400'}`}>{z.alertCount}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded cursor-pointer"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => setZones((p) => p.filter((x) => x.id !== z.id))}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded cursor-pointer"><Trash2 className="w-4 h-4" /></button>
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
