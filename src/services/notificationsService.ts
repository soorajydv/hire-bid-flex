import { Notification } from '../store/slices/notificationsSlice';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock notifications database
let mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'bid_received',
    title: 'New Bid Received',
    message: 'Jane Smith placed a bid of $120 on your Plumbing Repair job',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    jobId: '1',
    bidId: '1',
  },
  {
    id: '2',
    type: 'user_verified',
    title: 'Account Verified',
    message: 'Your account has been verified by our admin team',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

let notificationIdCounter = 3;

export const notificationsService = {
  async getNotifications() {
    await delay(500);
    
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    // In real app, filter by user ID
    return mockNotifications.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async markAsRead(notificationId: string) {
    await delay(300);
    
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (!notification) throw new Error('Notification not found');
    
    notification.read = true;
    return notification;
  },

  async markAllAsRead() {
    await delay(400);
    
    mockNotifications.forEach(n => n.read = true);
    return mockNotifications;
  },

  // Helper function to create notifications (used by other services)
  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>) {
    const newNotification: Notification = {
      ...notification,
      id: notificationIdCounter.toString(),
      createdAt: new Date().toISOString(),
    };
    
    mockNotifications.unshift(newNotification);
    notificationIdCounter++;
    
    return newNotification;
  },
};