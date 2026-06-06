import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  Download,
  ChevronDown,
  Eye,
  Edit,
  MoreHorizontal,
  Signal,
  SignalZero,
} from 'lucide-react';

interface Worker {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  status: string;
  lastSeen: string;
}

const mockWorkers: Worker[] = [
  { id: '1', name: 'Amit Sharma', employeeId: 'TM-1001', email: 'amit@trackman.com', phone: '+91-9876543212', designation: 'Senior Trackman', department: 'Track Maintenance', status: 'ON_DUTY', lastSeen: '2 min ago' },
  { id: '2', name: 'Vikram Singh', employeeId: 'TM-1002', email: 'vikram@trackman.com', phone: '+91-9876543213', designation: 'Senior Trackman', department: 'Track Maintenance', status: 'ON_DUTY', lastSeen: '5 min ago' },
  { id: '3', name: 'Suresh Patel', employeeId: 'TM-1003', email: 'suresh@trackman.com', phone: '+91-9876543214', designation: 'Trackman', department: 'Track Maintenance', status: 'SOS', lastSeen: 'Just now' },
  { id: '4', name: 'Manoj Yadav', employeeId: 'TM-1004', email: 'manoj@trackman.com', phone: '+91-9876543215', designation: 'Trackman', department: 'Track Maintenance', status: 'OFF_DUTY', lastSeen: '2 hrs ago' },
  { id: '5', name: 'Ravi Verma', employeeId: 'TM-1005', email: 'ravi@trackman.com', phone: '+91-9876543216', designation: 'Trackman', department: 'Track Maintenance', status: 'DISCONNECTED', lastSeen: '45 min ago' },
];

const statusBadge = (status: string) => {
  const config: Record<string, { label: string; className: string }> = {
    ON_DUTY: { label: 'On Duty', className: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    OFF_DUTY: { label: 'Off Duty', className: 'text-slate-600 bg-slate-50 border-slate-200' },
    SOS: { label: '🚨 SOS', className: 'text-red-700 bg-red-50 border-red-200' },
    DISCONNECTED: { label: 'Disconnected', className: 'text-amber-700 bg-amber-50 border-amber-200' },
  };
  const c = config[status] || config.OFF_DUTY;
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full border ${c.className}`}>
      {status === 'ON_DUTY' && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />}
      {c.label}
    </span>
  );
};

const WorkerManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockWorkers.filter((w) => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || w.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Worker Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage and monitor all trackmen in the system</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all shadow-sm cursor-pointer">
            <Plus className="w-4 h-4" />
            Add Worker
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="ON_DUTY">On Duty</option>
                <option value="OFF_DUTY">Off Duty</option>
                <option value="SOS">SOS</option>
                <option value="DISCONNECTED">Disconnected</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <p className="text-xs text-slate-400">{filtered.length} workers found</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Worker</th>
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">ID</th>
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Contact</th>
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">Designation</th>
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Last Seen</th>
                <th className="text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((worker) => (
                <tr key={worker.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs ${
                        worker.status === 'SOS' ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                      }`}>
                        {worker.name.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{worker.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-slate-600 font-mono">{worker.employeeId}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <div>
                      <p className="text-sm text-slate-600">{worker.email}</p>
                      <p className="text-xs text-slate-400">{worker.phone}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="text-sm text-slate-600">{worker.designation}</span>
                  </td>
                  <td className="px-5 py-3.5">{statusBadge(worker.status)}</td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <span className="text-sm text-slate-500">{worker.lastSeen}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all cursor-pointer" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer" title="More">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm">
          <p className="text-slate-500">Showing 1-{filtered.length} of {filtered.length}</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-slate-500 bg-slate-100 rounded-lg text-xs font-medium cursor-pointer">Previous</button>
            <button className="px-3 py-1.5 text-white bg-blue-600 rounded-lg text-xs font-medium cursor-pointer">1</button>
            <button className="px-3 py-1.5 text-slate-500 bg-slate-100 rounded-lg text-xs font-medium cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerManagement;
