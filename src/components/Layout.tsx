import React, { useState, useMemo } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { ThreadList } from './ThreadList';
import Profile from './Profile';
import { categories, threads, currentUser } from '../utils/data';
import { RefreshCw, Settings, HelpCircle } from 'lucide-react';

const Layout: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(threads[0].id);
  const [isReplying, setIsReplying] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const handleSync = async () => {
    setIsSyncing(true);
    try {
      // Simulate sync delay - replace with actual sync logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Here you would typically fetch new messages from your backend
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSendReply = () => {
    setIsReplying(false);
    setSelectedThreadId(null);
    // Here you would typically send the reply to your backend
  };
  
  const filteredThreads = useMemo(() => {
    let filtered = [...threads];
    
    // Filter by platform
    if (activeCategory === 'slack') {
      filtered = filtered.filter(thread => thread.platform === 'slack');
    } else if (activeCategory === 'discord') {
      filtered = filtered.filter(thread => thread.platform === 'discord');
    }
    
    // Sort based on category
    if (activeCategory === 'priority') {
      // Sort by priority first, then by timestamp
      filtered.sort((a, b) => {
        const priorityA = a.priority || 3;
        const priorityB = b.priority || 3;
        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    } else if (activeCategory === 'all') {
      // Sort purely by timestamp for 'all' category
      filtered.sort((a, b) => {
        const timeA = new Date(b.timestamp).getTime();
        const timeB = new Date(a.timestamp).getTime();
        return timeA - timeB;
      });
    } else {
      // For other categories, sort by timestamp with urgent items at top
      filtered.sort((a, b) => {
        // Always put urgent items at the top
        if (a.priority === 1 && b.priority !== 1) return -1;
        if (b.priority === 1 && a.priority !== 1) return 1;
        
        // Then sort by timestamp
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    }
    
    return filtered;
  }, [activeCategory]);

  const selectedThread = useMemo(() => {
    return threads.find(thread => thread.id === selectedThreadId) || null;
  }, [selectedThreadId]);
  
  return (
    <div className="h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="w-[280px] border-r border-slate-200 flex-shrink-0 hidden lg:block flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="font-medium text-slate-900">Messages</h2>
              <button
                onClick={handleSync}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-700 rounded-lg hover:bg-slate-100 transition-colors ${
                  isSyncing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSyncing}
              >
                <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                <span>Sync</span>
              </button>
            </div>
            <Navigation 
              categories={categories} 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
          
          {/* Bottom Settings Section */}
          <div className="mt-auto border-t border-slate-200 p-4 space-y-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <HelpCircle size={16} />
              <span>Help & Support</span>
            </button>
            <div className="flex items-center gap-3 px-3 py-2 mt-2 border-t border-slate-200">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Thread List */}
        <div className="w-full lg:flex-1 border-r border-slate-200 overflow-y-auto">
          <ThreadList 
            threads={filteredThreads} 
            selectedThreadId={selectedThreadId}
            setSelectedThreadId={(id) => {
              setSelectedThreadId(id);
              setIsReplying(true);
            }}
            onReply={() => setIsReplying(true)}
          />
        </div>
        
        {/* Quick Reply - Wider */}
        <div className="hidden lg:block w-[400px] flex-shrink-0 overflow-hidden">
          <Profile 
            user={currentUser} 
            isReplying={isReplying}
            selectedThread={selectedThread}
            onCloseReply={() => {
              setIsReplying(false);
              setSelectedThreadId(null);
            }}
            onSendReply={handleSendReply}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;