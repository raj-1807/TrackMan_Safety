import React, { useState } from 'react';
import WorkerCard from '../../components/cards/WorkerCard';
import LiveMap from '../../components/maps/LiveMap';
import type { MapWorker } from '../../components/maps/MapComponent';
import { Users, Filter, RefreshCw, Radio } from 'lucide-react';

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
    { key: 'all', label: 'All', count: statusCounts.all },
    { key: 'ON_DUTY', label: 'On Duty', count: statusCounts.ON_DUTY },
    { key: 'SOS', label: 'SOS', count: statusCounts.SOS },
    { key: 'OFF_DUTY', label: 'Off Duty', count: statusCounts.OFF_DUTY },
    { key: 'DISCONNECTED', label: 'Offline', count: statusCounts.DISCONNECTED },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Real-Time Monitoring</h2>
          <p className="text-sm text-gray-500 mt-0.5">Live GPS tracking of workers on the field</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1a237e] text-white text-sm font-medium rounded hover:bg-[#283593] transition-colors cursor-pointer">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="xl:col-span-3 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#1a237e]" />
              <h3 className="text-sm font-semibold text-gray-900">Live Tracking Map</h3>
              <span className="text-[10px] bg-green-50 text-green-700 font-medium px-2 py-0.5 rounded border border-green-200">
                {statusCounts.ON_DUTY} Active
              </span>
            </div>
          </div>
          <LiveMap workers={defaultWorkers} height="h-[480px]" />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[#1a237e]" />
              <h3 className="text-sm font-semibold text-gray-900">Workers</h3>
            </div>
            <div className="flex flex-wrap gap-1">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setSelectedFilter(f.key)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedFilter === f.key
                      ? 'bg-[#1a237e] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredWorkers.map((worker) => (
              <WorkerCard key={worker.employeeId} {...worker} />
            ))}
            {filteredWorkers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Filter className="w-8 h-8 mb-2" />
                <p className="text-sm">No workers match filter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
