import React, { useEffect, useState } from 'react';
import { Thread } from '../types';
import { ThreadItem } from './ThreadItem';

export const ThreadList: React.FC<ThreadListProps> = ({
  threads,
  selectedThreadId, 
  setSelectedThreadId,
  onReply
}) => {
  const [syncedThreads, setSyncedThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const syncMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sync', {
          method: 'POST',
          body: JSON.stringify({
     
          })
        });
        const data = await response.json();
        
        if (data.successful && data.data.messages.matches) {
          const newThreads = data.data.messages.matches.map((match: any) => ({
            id: match.iid,
            title: match.text,
            timestamp: new Date(Number(match.ts.split('.')[0]) * 1000).toISOString(),
            channel: match.channel.name,
            user: {
              id: match.user,
              name: match.username,
            },
            platform: 'slack'
          }));
          
          setSyncedThreads([...newThreads, ...threads]);
        }
      } catch (error) {
        console.error('Error syncing messages:', error);
      }
    };

    syncMessages();
  }, [threads]);

  return (
    <div className="h-full overflow-y-auto">
      {syncedThreads.map((thread) => (
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