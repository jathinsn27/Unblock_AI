import React from 'react';
import { Thread } from '../types';
import { ThreadItem } from './ThreadItem';

export const ThreadList: React.FC<ThreadListProps> = ({
  threads,
  selectedThreadId,
  setSelectedThreadId,
  onReply
}) => {
  return (
    <div className="h-full overflow-y-auto">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          isSelected={selectedThreadId === thread.id}
          onClick={() => setSelectedThreadId(thread.id)}
          onReply={onReply}
        />
      ))}
    </div>
  );
};

interface ThreadListProps {
  threads: Thread[];
  selectedThreadId: string | null;
  setSelectedThreadId: (id: string) => void;
  onReply: () => void;
}