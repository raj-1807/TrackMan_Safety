import React, { useState } from 'react';
import WorkerCard from '../../components/cards/WorkerCard';
import LiveMap from '../../components/maps/LiveMap';
import type { MapWorker } from '../../components/maps/MapComponent';
import {
  Users,
  Filter,
  RefreshCw,
  Radio,
} from 'lucide-react';

const defaultWorkers: MapWorker[] = [
  { id: '1', name: 'Amit Sharma', employeeId: 'TM-1001', status: 'ON_DUTY', lat: 28.6424, lng: 77.2195, lastSeen: '2 min ago' },
  { id: '2', name: 'Vikram Singh', employeeId: 'TM-1002', status: 'ON_DUTY', lat: 28.5875, lng: 77.2536, lastSeen: '5 min ago' },
  { id: '3', name: 'Suresh Patel', employeeId: 'TM-1003', status: 'SOS', lat: 28.6692, lng: 77.4538, lastSeen: 'Just now' },
  { id: '4', name: 'Manoj Yadav', employeeId: 'TM-1004', status: 'OFF_DUTY', lat: 28.6315, lng: 77.2167, lastSeen: '2 hrs ago' },
  { id: '5', name: 'Ravi Verma', employeeId: 'TM-1005', status: 'DISCONNECTED', lat: 28.6508, lng: 77.2334, lastSeen: '45 min ago' },
];

const Monitoring: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const workerCards = [
    { name: 'Amit Sharma', employeeId: 'TM-1001', designation: 'Senior Trackman', status: 'ON_DUTY' as const, lastLocation: 'New Delhi Station - Track 3', lastSeen: '2 min ago', phone: '+91-9876543212' },
    { name: 'Vikram Singh', employeeId: 'TM-1002', designation: 'Senior Trackman', status: 'ON_DUTY' as const, lastLocation: 'Nizamuddin Bridge', lastSeen: '5 min ago' },
    { name: 'Suresh Patel', employeeId: 'TM-1003', designation: 'Trackman', status: 'SOS' as const, lastLocation: 'Ghaziabad Yard', lastSeen: 'Just now' },
    { name: 'Manoj Yadav', employeeId: 'TM-1004', designation: 'Trackman', status: 'OFF_DUTY' as const, lastSeen: '2 hrs ago' },
    { name: 'Ravi Verma', employeeId: 'TM-1005', designation: 'Trackman', status: 'DISCONNECTED' as const, lastSeen: '45 min ago' },
  ];

  const filteredWorkers = selectedFilter === 'all'
    ? workerCards
    : workerCards.filter((w) => w.status === selectedFilter);

  const statusCounts = {
    all: workerCards.length,
    ON_DUTY: workerCards.filter((w) => w.status === 'ON_DUTY').length,
    SOS: workerCards.filter((w) => w.status === 'SOS').length,
    OFF_DUTY: workerCards.filter((w) => w.status === 'OFF_DUTY').length,
    DISCONNECTED: workerCards.filter((w) => w.status === 'DISCONNECTED').length,
  };

  const filters = [
    { key: 'all', label: 'All Workers', count: statusCounts.all, color: 'bg-slate-500' },
    { key: 'ON_DUTY', label: 'On Duty', count: statusCounts.ON_DUTY, color: 'bg-emerald-500' },
    { key: 'SOS', label: 'SOS', count: statusCounts.SOS, color: 'bg-red-500' },
    { key: 'OFF_DUTY', label: 'Off Duty', count: statusCounts.OFF_DUTY, color: 'bg-slate-400' },
    { key: 'DISCONNECTED', label: 'Disconnected', count: statusCounts.DISCONNECTED, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Real-Time Monitoring</h2>
          <p className="text-sm text-slate-500 mt-1">Live GPS tracking of all workers on the field</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-all shadow-sm cursor-pointer">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Main Content: Map + Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-blue-600 animate-pulse" />
              <h3 className="text-sm font-semibold text-slate-900">Live Tracking Map</h3>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                {statusCounts.ON_DUTY} Active
              </span>
            </div>
          </div>
          <LiveMap workers={defaultWorkers} height="h-[500px]" />
        </div>

        {/* Worker Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">Workers</h3>
            </div>
            {/* Status Filters */}
            <div className="flex flex-wrap gap-1.5">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setSelectedFilter(f.key)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedFilter === f.key
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedFilter === f.key ? 'bg-white' : f.color}`} />
                  {f.label}
                  <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                    selectedFilter === f.key ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
                  }`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredWorkers.map((worker) => (
              <WorkerCard key={worker.employeeId} {...worker} />
            ))}
            {filteredWorkers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Filter className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">No workers match filter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
