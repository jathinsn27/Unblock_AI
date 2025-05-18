import React from 'react';
import { Category } from '../types';
import { Settings, HelpCircle, User, Star, Inbox, MessageCircle } from 'lucide-react';

interface NavigationProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  const getCategoryIcon = (category: Category) => {
    switch (category.icon) {
      case 'star':
        return <Star size={18} />;
      case 'inbox':
        return <Inbox size={18} />;
      default:
        return <MessageCircle size={18} />;
    }
  };

  const bottomLinks = [
    { id: 'settings', name: 'Settings', icon: <Settings size={18} /> },
    { id: 'help', name: 'Help', icon: <HelpCircle size={18} /> },
    { id: 'account', name: 'Account', icon: <User size={18} /> },
  ];

  const getCategoryStyle = (category: Category) => {
    if (activeCategory === category.id) {
      if (category.id === 'all') {
        return 'bg-purple-50 text-purple-700';
      } else if (category.platform === 'discord') {
        return 'bg-indigo-50 text-indigo-700';
      } else if (category.icon === 'star') {
        return 'bg-amber-50 text-amber-700';
      } else {
        return 'bg-emerald-50 text-emerald-700';
      }
    }
    return 'text-slate-700 hover:bg-slate-100';
  };

  const getBadgeStyle = (category: Category) => {
    if (activeCategory === category.id) {
      if (category.id === 'all') {
        return 'bg-purple-100 text-purple-700';
      } else if (category.platform === 'discord') {
        return 'bg-indigo-100 text-indigo-700';
      } else if (category.icon === 'star') {
        return 'bg-amber-100 text-amber-700';
      } else {
        return 'bg-emerald-100 text-emerald-700';
      }
    }
    return 'bg-slate-200 text-slate-600';
  };

  return (
    <nav className="flex flex-col h-full">
      <div className="px-2 py-4">
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full text-left flex items-center gap-2 py-2 px-3 rounded-md transition-all hover:translate-x-1 ${
                getCategoryStyle(category)
              }`}
            >
              {getCategoryIcon(category)}
              <span>{category.name}</span>
              {category.unreadCount !== undefined && (
                <span className={`ml-auto text-xs px-2 rounded-full ${getBadgeStyle(category)}`}>
                  {category.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-auto border-t border-slate-200 px-2 py-4">
        {bottomLinks.map((link) => (
          <button
            key={link.id}
            className="w-full flex items-center gap-2 py-2 px-3 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {link.icon}
            <span className="hidden lg:inline">{link.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;