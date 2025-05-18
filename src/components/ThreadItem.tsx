import React, { useState } from 'react';
import { Thread } from '../types';
import { Pin, Paperclip, MessageSquare, ChevronDown, ChevronUp, AlertTriangle, AlertCircle, Bell } from 'lucide-react';

interface ThreadItemProps {
  thread: Thread;
  isSelected: boolean;
  onClick: () => void;
  onReply: () => void;
}

const getPriorityIcon = (priority?: 1 | 2 | 3) => {
  switch (priority) {
    case 1:
      return <AlertTriangle size={14} className="text-red-500" />;
    case 2:
      return <AlertCircle size={14} className="text-amber-500" />;
    case 3:
      return <Bell size={14} className="text-slate-400" />;
    default:
      return null;
  }
};

const getPriorityLabel = (priority?: 1 | 2 | 3) => {
  switch (priority) {
    case 1:
      return 'Urgent';
    case 2:
      return 'High';
    case 3:
      return 'Normal';
    default:
      return '';
  }
};

export const ThreadItem: React.FC<ThreadItemProps> = ({ thread, isSelected, onClick, onReply }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDiscord = thread.platform === 'discord';
  const isUrgent = thread.priority === 1;
  
  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div
      className={`group px-4 py-3 border-b border-slate-100 cursor-pointer transition-all hover:scale-[1.01] ${
        isSelected ? 'bg-slate-50' : 'hover:bg-slate-50'
      } ${isUrgent ? 'relative overflow-hidden' : ''}`}
      onClick={onClick}
    >
      {isUrgent && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 animate-pulse" />
      )}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 relative">
          <img
            src={thread.sender.avatar}
            alt={thread.sender.name}
            className={`w-10 h-10 object-cover rounded-full ring-2 ${
              isUrgent ? 'ring-red-200 group-hover:ring-red-300' : 'ring-slate-100 group-hover:ring-slate-200'
            } transition-all`}
            loading="lazy"
          />
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white ${
            thread.sender.status === 'online' ? 'bg-green-500' : 
            thread.sender.status === 'dnd' ? 'bg-red-500' : 'bg-slate-400'
          }`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`font-medium ${
              isDiscord ? 'text-indigo-600' : 'text-slate-900'
            }`}>
              {thread.sender.name}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded ${
              isDiscord ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {isDiscord ? 'Discord' : 'Slack'}
            </span>
            {thread.priority && (
              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium ${
                thread.priority === 1 ? 'bg-red-100 text-red-700 shadow-sm shadow-red-100 animate-pulse' :
                thread.priority === 2 ? 'bg-amber-100 text-amber-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {getPriorityIcon(thread.priority)}
                {getPriorityLabel(thread.priority)}
              </span>
            )}
            {thread.channel && (
              <span className="text-xs text-slate-500">
                in #{thread.channel.name}
              </span>
            )}
            <span className="text-xs text-slate-400">{thread.timestamp}</span>
          </div>
          
          <div className={`text-sm ${isExpanded ? '' : 'line-clamp-2'} ${
            isUrgent ? 'text-red-900 font-medium' :
            isDiscord ? 'text-slate-800' : 'text-slate-700'
          }`}>
            <div className="whitespace-pre-line">{thread.content}</div>
          </div>
          
          <button
            onClick={handleExpandClick}
            className="text-xs text-slate-500 hover:text-slate-700 mt-1 flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={14} />
                <span>Show less</span>
              </>
            ) : (
              <>
                <ChevronDown size={14} />
                <span>Show more</span>
              </>
            )}
          </button>
          
          {thread.reactions && thread.reactions.length > 0 && (
            <div className="flex gap-2 mt-2">
              {thread.reactions.map((reaction, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs cursor-pointer hover:scale-110 transition-transform ${
                    isDiscord ? 'bg-indigo-100' : 'bg-slate-100'
                  }`}
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-slate-600">{reaction.count}</span>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2 ml-3 flex-shrink-0">
          {thread.pinned && (
            <Pin size={14} className="text-amber-500" />
          )}
          {thread.hasAttachments && (
            <Paperclip size={14} className="text-slate-400" />
          )}
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