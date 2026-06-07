import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white px-5 py-3 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-gray-400">
        <p>© 2026 TrackMan Safety — Indian Railways, Ministry of Railways, Govt. of India</p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            All Systems Operational
          </span>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
