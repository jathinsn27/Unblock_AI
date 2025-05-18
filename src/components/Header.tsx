import React from 'react';
import { Search, PenLine } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-slate-200">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-purple-600">Unblock Human</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:text-slate-700 transition-colors">
          <PenLine size={20} />
        </button>
        <button className="p-2 text-slate-500 hover:text-slate-700 transition-colors">
          <Search size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;