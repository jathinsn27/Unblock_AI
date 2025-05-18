import React, { useState } from 'react';
import { Thread } from '../types';
import { MessageSquare } from 'lucide-react';

interface ThreadItemProps {
  thread: Thread;
  isSelected: boolean;
  onClick: () => void;
  onReply: () => void;
}

export const ThreadItem: React.FC<ThreadItemProps> = ({ thread, isSelected, onClick, onReply }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div
      className={`group px-4 py-3 border-b border-slate-100 cursor-pointer transition-all hover:scale-[1.01] ${
        isSelected ? 'bg-slate-50' : 'hover:bg-slate-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-slate-900">
              {thread.sender.name}
            </span>
            <span className="text-xs text-slate-400">{thread.timestamp}</span>
          </div>
          
          <div className={`text-sm ${isExpanded ? '' : 'line-clamp-2'} text-slate-700`}>
            <div className="whitespace-pre-line">{thread.content}</div>
          </div>
          
          <button
            onClick={handleExpandClick}
            className="text-xs text-slate-500 hover:text-slate-700 mt-1"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        </div>
        
        <div className="flex flex-col items-end gap-2 ml-3 flex-shrink-0">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onReply();
            }}
            className="opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-slate-200 rounded"
          >
            <MessageSquare size={14} className="text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
};