import React, { useState } from 'react';
import AddWorkerModal from '../../components/modals/AddWorkerModal';
import { Users, Search, Plus, Download, ChevronDown, Eye, Edit, MoreHorizontal } from 'lucide-react';

interface Worker {
  id: string; name: string; employeeId: string; email: string; phone: string;
  designation: string; department: string; status: string; lastSeen: string;
}

const initialWorkers: Worker[] = [
  { id: '1', name: 'Amit Sharma', employeeId: 'TM-1001', email: 'amit@trackman.com', phone: '+91-9876543212', designation: 'Senior Trackman', department: 'Track Maintenance', status: 'ON_DUTY', lastSeen: '2 min ago' },
  { id: '2', name: 'Vikram Singh', employeeId: 'TM-1002', email: 'vikram@trackman.com', phone: '+91-9876543213', designation: 'Senior Trackman', department: 'Track Maintenance', status: 'ON_DUTY', lastSeen: '5 min ago' },
  { id: '3', name: 'Suresh Patel', employeeId: 'TM-1003', email: 'suresh@trackman.com', phone: '+91-9876543214', designation: 'Trackman', department: 'Track Maintenance', status: 'SOS', lastSeen: 'Just now' },
  { id: '4', name: 'Manoj Yadav', employeeId: 'TM-1004', email: 'manoj@trackman.com', phone: '+91-9876543215', designation: 'Trackman', department: 'Track Maintenance', status: 'OFF_DUTY', lastSeen: '2 hrs ago' },
  { id: '5', name: 'Ravi Verma', employeeId: 'TM-1005', email: 'ravi@trackman.com', phone: '+91-9876543216', designation: 'Trackman', department: 'Track Maintenance', status: 'DISCONNECTED', lastSeen: '45 min ago' },
];

const statusBadge = (status: string) => {
  const c: Record<string, string> = {
    ON_DUTY: 'text-green-700 bg-green-50 border-green-200',
    OFF_DUTY: 'text-gray-600 bg-gray-50 border-gray-200',
    SOS: 'text-red-700 bg-red-50 border-red-200',
    DISCONNECTED: 'text-amber-700 bg-amber-50 border-amber-200',
  };
  const labels: Record<string, string> = { ON_DUTY: 'On Duty', OFF_DUTY: 'Off Duty', SOS: 'SOS', DISCONNECTED: 'Disconnected' };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${c[status] || c.OFF_DUTY}`}>{labels[status] || status}</span>;
};

const WorkerManagement: React.FC = () => {
  const [workers, setWorkers] = useState(initialWorkers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = workers.filter((w) => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.employeeId.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (statusFilter === 'all' || w.status === statusFilter);
  });

  const handleAddWorker = (data: any) => {
    setWorkers((prev) => [...prev, {
      id: String(prev.length + 1), name: data.name, employeeId: `TM-${1000 + prev.length + 1}`,
      email: data.email, phone: data.phone, designation: data.designation,
      department: data.department, status: 'OFF_DUTY', lastSeen: 'Never',
    }]);
  };

  return (
    <div className="space-y-5">
      <AddWorkerModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleAddWorker} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Worker Management</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage all trackmen in the system</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors cursor-pointer">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a237e] text-white text-sm font-medium rounded hover:bg-[#283593] transition-colors cursor-pointer">
            <Plus className="w-4 h-4" /> Add Worker
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search by name or ID..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-colors" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 focus:outline-none cursor-pointer">
              <option value="all">All Status</option>
              <option value="ON_DUTY">On Duty</option>
              <option value="OFF_DUTY">Off Duty</option>
              <option value="SOS">SOS</option>
              <option value="DISCONNECTED">Disconnected</option>
            </select>
          </div>
          <p className="text-xs text-gray-400">{filtered.length} workers</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {['Worker', 'ID', 'Contact', 'Designation', 'Status', 'Last Seen', 'Actions'].map((h) => (
                  <th key={h} className={`text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-2.5 ${
                    ['Contact','Designation'].includes(h) ? 'hidden md:table-cell' : h === 'Last Seen' ? 'hidden sm:table-cell' : ''
                  } ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((w) => (
                <tr key={w.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded flex items-center justify-center text-white font-bold text-xs ${
                        w.status === 'SOS' ? 'bg-red-600' : 'bg-[#1a237e]'
                      }`}>{w.name.charAt(0)}</div>
                      <span className="text-sm font-medium text-gray-800">{w.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">{w.employeeId}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-sm text-gray-600">{w.email}</p>
                    <p className="text-xs text-gray-400">{w.phone}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-sm text-gray-600">{w.designation}</td>
                  <td className="px-4 py-3">{statusBadge(w.status)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-sm text-gray-500">{w.lastSeen}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded cursor-pointer"><Edit className="w-4 h-4" /></button>
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

export default WorkerManagement;
