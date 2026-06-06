import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
        <p>© 2026 TrackMan Safety • Railway Worker Protection System</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            All systems operational
          </span>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
