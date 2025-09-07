import { Bid } from '../store/slices/bidsSlice';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock bids database
let mockBids: Bid[] = [
  {
    id: '1',
    jobId: '2',
    bidderId: 'user1',
    bidderName: 'Sarah Wilson',
    amount: 350,
    message: 'I have 5+ years of graphic design experience. Can deliver high-quality logo within 3 days.',
    status: 'accepted',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    contactDetails: {
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Designer Ave, Creative District'
    }
  },
  {
    id: '2',
    jobId: '5',
    bidderId: 'user1',
    bidderName: 'Sarah Wilson',
    amount: 1200,
    message: 'Professional landscaper with 8 years experience. Can start next week.',
    status: 'accepted',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    contactDetails: {
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Designer Ave, Creative District'
    }
  },
  {
    id: '3',
    jobId: '4',
    bidderId: 'user1',
    bidderName: 'Sarah Wilson',
    amount: 3500,
    message: 'Full-stack developer with React/Node.js expertise. Portfolio available upon request.',
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    jobId: '1',
    bidderId: 'user1',
    bidderName: 'Sarah Wilson',
    amount: 125,
    message: 'I can help with the plumbing repair. Available this weekend.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
];

let bidIdCounter = 5;

export const bidsService = {
  async getJobBids(jobId: string) {
    await delay(600);
    return mockBids.filter(bid => bid.jobId === jobId);
  },

  async getMyBids() {
    await delay(600);
    
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const userId = token.replace('mock-token-', '');
    return mockBids.filter(bid => bid.bidderId === userId);
  },

  async placeBid(bidData: { jobId: string; amount: number; message: string }) {
    await delay(800);
    
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const userId = token.replace('mock-token-', '');
    
    // Mock user name (in real app, get from user service)
    const userName = 'Current User';
    
    const newBid: Bid = {
      id: bidIdCounter.toString(),
      jobId: bidData.jobId,
      bidderId: userId,
      bidderName: userName,
      amount: bidData.amount,
      message: bidData.message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    mockBids.push(newBid);
    bidIdCounter++;
    
    // Update job bids count (mock)
    // In real app, this would be handled by backend
    
    return newBid;
  },

  async acceptBid(bidId: string) {
    await delay(500);
    
    const bidIndex = mockBids.findIndex(bid => bid.id === bidId);
    if (bidIndex === -1) throw new Error('Bid not found');
    
    // Update bid status
    mockBids[bidIndex].status = 'accepted';
    
    // Reject all other bids for the same job
    const jobId = mockBids[bidIndex].jobId;
    mockBids.forEach(bid => {
      if (bid.jobId === jobId && bid.id !== bidId && bid.status === 'pending') {
        bid.status = 'rejected';
      }
    });
    
    return mockBids[bidIndex];
  },

  async rejectBid(bidId: string) {
    await delay(500);
    
    const bidIndex = mockBids.findIndex(bid => bid.id === bidId);
    if (bidIndex === -1) throw new Error('Bid not found');
    
    mockBids[bidIndex].status = 'rejected';
    return mockBids[bidIndex];
  },
};