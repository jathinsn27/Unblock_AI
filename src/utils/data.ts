import { Category, Thread, User } from '../types';

export const categories: Category[] = [
  { 
    id: 'all',
    name: 'All',
    type: 'channel',
    icon: 'inbox',
    unreadCount: 10
  },
  { 
    id: 'priority',
    name: 'Priority',
    type: 'channel',
    icon: 'star',
    unreadCount: 5
  },
  { 
    id: 'slack', 
    name: 'Slack', 
    type: 'channel',
    platform: 'slack',
    unreadCount: 3 
  },
  { 
    id: 'discord', 
    name: 'Discord', 
    type: 'channel',
    platform: 'discord',
    unreadCount: 2 
  }
];

export const threads: Thread[] = [
  {
    id: '1',
    sender: {
      name: 'Laura Shea',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      status: 'online'
    },
    content: 'Hey team! Just pushed the latest design changes to staging 🎨\n\nKey updates:\n- New animation system\n- Updated color palette\n- Improved accessibility\n\nPlease review and let me know your thoughts!',
    preview: 'Check out the new animations and let me know what you think!',
    timestamp: '2:34 PM',
    unread: true,
    pinned: true,
    priority: 2,
    hasAttachments: false,
    platform: 'slack',
    channel: { name: 'design-team', type: 'public' },
    reactions: [
      { emoji: '👍', count: 3 },
      { emoji: '🎨', count: 2 }
    ]
  },
  {
    id: '2',
    sender: {
      name: 'Discord Bot',
      avatar: 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      status: 'online'
    },
    content: '🎮 **New Game Challenge**\n\nJoin us for tonight\'s gaming session!\n- Game: Valorant\n- Time: 8 PM EST\n- Channel: Gaming Voice\n\nReact with 🎮 to join!',
    preview: 'Join us for tonight\'s gaming session!',
    timestamp: '2:30 PM',
    unread: true,
    pinned: false,
    priority: 3,
    hasAttachments: false,
    platform: 'discord',
    channel: { name: 'gaming', type: 'public' },
    reactions: [
      { emoji: '🎮', count: 8 },
      { emoji: '👍', count: 5 }
    ]
  },
  {
    id: '3',
    sender: {
      name: 'Rahul',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      status: 'dnd'
    },
    content: '🚀 **Deployment Update**\n\nNew features are now live:\n- Enhanced message threading\n- Improved search functionality\n- Performance optimizations\n\nPlease test and report any issues!',
    preview: 'New features are now live in production',
    timestamp: '2:20 PM',
    unread: false,
    pinned: false,
    priority: 1,
    hasAttachments: true,
    platform: 'discord',
    channel: { name: 'deployments', type: 'public' }
  },
  {
    id: '4',
    sender: {
      name: 'Emily Chen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      status: 'online'
    },
    content: '📱 **Mobile App Update**\n\nJust released v2.3.0 to the App Store:\n- New dark mode implementation\n- Push notification improvements\n- Battery optimization\n- Bug fixes and performance updates\n\nPlease update and share your feedback! 🚀',
    preview: 'Mobile app v2.3.0 is now live on the App Store',
    timestamp: '2:15 PM',
    unread: true,
    pinned: true,
    priority: 2,
    hasAttachments: false,
    platform: 'slack',
    channel: { name: 'mobile-dev', type: 'public' },
    reactions: [
      { emoji: '🎉', count: 5 },
      { emoji: '🚀', count: 3 },
      { emoji: '👏', count: 4 }
    ]
  },
  {
    id: '5',
    sender: {
      name: 'Alex Morgan',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      status: 'away'
    },
    content: '🎯 **Weekly Team Goals**\n\nHey team! Here\'s what we\'re focusing on this week:\n\n1. Complete user research interviews\n2. Finalize Q2 roadmap\n3. Launch beta testing program\n4. Review analytics dashboard\n\nLet\'s crush these goals! 💪',
    preview: 'Weekly team goals and priorities',
    timestamp: '2:10 PM',
    unread: true,
    pinned: false,
    priority: 2,
    hasAttachments: true,
    platform: 'discord',
    channel: { name: 'team-goals', type: 'public' },
    reactions: [
      { emoji: '💪', count: 7 },
      { emoji: '🎯', count: 4 }
    ]
  },
  {
    id: '6',
    sender: {
      name: 'Sarah Kim',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      status: 'online'
    },
    content: '🎨 **Design System Updates**\n\nExciting updates to our design system:\n\n- New component library released\n- Updated typography scale\n- Accessibility improvements\n- New icon set\n\nCheck out the Figma file for details! ✨',
    preview: 'Design system updates and new components',
    timestamp: '2:05 PM',
    unread: false,
    pinned: false,
    priority: 3,
    hasAttachments: true,
    platform: 'slack',
    channel: { name: 'design', type: 'public' },
    reactions: [
      { emoji: '✨', count: 6 },
      { emoji: '🎨', count: 4 }
    ]
  },
  {
    id: '7',
    sender: {
      name: 'Marcus Johnson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      status: 'online'
    },
    content: '📊 **Analytics Report**\n\nQ1 numbers are in!\n\n- User engagement up 45%\n- Average session time: 12 mins\n- Mobile usage increased by 60%\n- Customer satisfaction: 4.8/5\n\nGreat work everyone! 🎉',
    preview: 'Q1 analytics report and metrics',
    timestamp: '2:00 PM',
    unread: true,
    pinned: true,
    priority: 1,
    hasAttachments: true,
    platform: 'slack',
    channel: { name: 'analytics', type: 'public' },
    reactions: [
      { emoji: '📈', count: 8 },
      { emoji: '🎉', count: 5 },
      { emoji: '👏', count: 6 }
    ]
  },
  {
    id: '8',
    sender: {
      name: 'David Park',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      status: 'dnd'
    },
    content: '🔧 **Infrastructure Update**\n\nCompleted server upgrades:\n\n- Increased server capacity\n- Improved load balancing\n- Enhanced security measures\n- Backup system optimization\n\nMonitoring for any issues. Let me know if you notice anything! 🚀',
    preview: 'Server infrastructure upgrades completed',
    timestamp: '1:55 PM',
    unread: false,
    pinned: false,
    priority: 1,
    hasAttachments: false,
    platform: 'discord',
    channel: { name: 'infrastructure', type: 'public' },
    reactions: [
      { emoji: '👨‍💻', count: 4 },
      { emoji: '🚀', count: 3 }
    ]
  }
];

export const currentUser: User = {
  name: 'Laura Shea',
  handle: '@laurashea',
  status: 'online',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
  title: 'Senior Product Designer',
  recentThreads: [
    { title: 'Design System Updates', content: '' },
    { title: 'New Feature Discussion', content: '' },
    { title: 'UI Feedback Thread', content: '' }
  ],
  socialLinks: [
    { type: 'Twitter', handle: '@laurashea', link: 'https://twitter.com/laurashea' },
    { type: 'LinkedIn', handle: 'LinkedIn', link: 'https://linkedin.com' }
  ]
};