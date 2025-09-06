import { Bid } from '../store/slices/bidsSlice';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock bids database
let mockBids: Bid[] = [
  {
    id: '1',
    jobId: '1',
    bidderId: '2',
    bidderName: 'Jane Smith',
    amount: 120,
    message: 'I have 10+ years of plumbing experience. Can start immediately.',
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    jobId: '1',
    bidderId: '3',
    bidderName: 'Mike Johnson',
    amount: 100,
    message: 'Local plumber with excellent reviews. Available today.',
    status: 'pending',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

let bidIdCounter = 3;

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