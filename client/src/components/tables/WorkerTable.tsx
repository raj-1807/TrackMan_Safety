import React from 'react';
import { Eye, Edit, MoreHorizontal } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  hidden?: string; // responsive class like 'hidden md:table-cell'
}

interface WorkerTableProps {
  columns: Column[];
  data: any[];
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
}

const WorkerTable: React.FC<WorkerTableProps> = ({ columns, data, onView, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 ${col.hidden || ''}`}
              >
                {col.label}
              </th>
            ))}
            <th className="text-right text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
              {columns.map((col) => (
                <td key={col.key} className={`px-5 py-3.5 ${col.hidden || ''}`}>
                  {col.render ? col.render(row[col.key], row) : (
                    <span className="text-sm text-slate-700">{row[col.key]}</span>
                  )}
                </td>
              ))}
              <td className="px-5 py-3.5 text-right">
                <div className="flex items-center justify-end gap-1">
                  {onView && (
                    <button onClick={() => onView(row)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer">
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  {onEdit && (
                    <button onClick={() => onEdit(row)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all cursor-pointer">
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="py-12 text-center text-sm text-slate-400">No data found</div>
      )}
    </div>
  );
};

export default WorkerTable;
