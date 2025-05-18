export interface Thread {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    status: 'online' | 'offline' | 'away' | 'dnd';
  };
  content: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  pinned: boolean;
  hasAttachments: boolean;
  platform: 'slack' | 'discord';
  priority?: 1 | 2 | 3; // 1: Urgent, 2: High, 3: Normal
  reactions?: {
    emoji: string;
    count: number;
  }[];
  channel?: {
    name: string;
    type: 'public' | 'private' | 'dm';
  };
}

export interface Category {
  id: string;
  name: string;
  unreadCount?: number;
  type: 'channel' | 'dm' | 'mentions';
  platform?: 'slack' | 'discord';
  icon?: string;
}

export interface User {
  id: string;
  name: string;
  title: string;
  avatar: string;
  email: string;
  recentThreads: Thread[];
  handle: string;
  status: 'online' | 'offline' | 'away' | 'dnd';
  socialLinks: {
    type: string;
    handle: string;
    link?: string;
  }[];
}