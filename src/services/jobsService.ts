import { Job } from '../store/slices/jobsSlice';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock jobs database
let mockJobs: Job[] = [
  {
    id: '1',
    title: 'Plumbing Repair - Kitchen Sink',
    description: 'Need experienced plumber to fix leaking kitchen sink. Urgent repair needed.',
    category: 'Home Services',
    location: 'Downtown, City Center',
    budget: { min: 75, max: 150 },
    postedBy: 'user1',
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    bidsCount: 5,
    urgent: true,
  },
  {
    id: '2',
    title: 'Logo Design for Startup',
    description: 'Looking for creative graphic designer to create modern logo for tech startup.',
    category: 'Design',
    location: 'Remote',
    budget: { min: 200, max: 500 },
    postedBy: 'user1',
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'in_progress',
    bidsCount: 12,
    urgent: false,
  },
  {
    id: '3',
    title: 'House Cleaning Service',
    description: 'Weekly house cleaning service needed for 3-bedroom home.',
    category: 'Cleaning',
    location: 'Suburbs, North District',
    budget: { min: 100, max: 200 },
    postedBy: 'user1',
    postedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    bidsCount: 8,
    urgent: false,
  },
  {
    id: '4',
    title: 'Website Development',
    description: 'Full-stack web development for e-commerce platform. React/Node.js preferred.',
    category: 'Development',
    location: 'Downtown Tech Hub',
    budget: { min: 2000, max: 5000 },
    postedBy: 'user1',
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    bidsCount: 15,
    urgent: false,
  },
  {
    id: '5',
    title: 'Garden Landscaping',
    description: 'Complete backyard landscaping including lawn, plants, and decorative stones.',
    category: 'Gardening',
    location: 'Westside Residential',
    budget: { min: 800, max: 1500 },
    postedBy: 'user1',
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in_progress',
    bidsCount: 6,
    urgent: false,
  },
];

let jobIdCounter = 6;

export const jobsService = {
  async getJobs(params: { page?: number; filters?: any } = {}) {
    await delay(800);
    
    const { page = 1, filters = {} } = params;
    const pageSize = 10;
    
    let filteredJobs = [...mockJobs];
    
    // Apply filters
    if (filters.category) {
      filteredJobs = filteredJobs.filter(job => 
        job.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    
    if (filters.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.budgetMin || filters.budgetMax) {
      filteredJobs = filteredJobs.filter(job => 
        job.budget.min >= (filters.budgetMin || 0) && 
        job.budget.max <= (filters.budgetMax || 10000)
      );
    }
    
    if (filters.urgent) {
      filteredJobs = filteredJobs.filter(job => job.urgent);
    }
    
    // Get current user from token (mock)
    const token = localStorage.getItem('token');
    const currentUserId = token ? token.replace('mock-token-', '') : null;
    
    // Filter out jobs posted by current user
    if (currentUserId) {
      filteredJobs = filteredJobs.filter(job => job.postedBy !== currentUserId);
    }
    
    const totalJobs = filteredJobs.length;
    const totalPages = Math.ceil(totalJobs / pageSize);
    const startIndex = (page - 1) * pageSize;
    const jobs = filteredJobs.slice(startIndex, startIndex + pageSize);
    
    return {
      jobs,
      pagination: {
        currentPage: page,
        totalPages,
        totalJobs,
      },
    };
  },

  async getMyJobs() {
    await delay(600);
    
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const userId = token.replace('mock-token-', '');
    return mockJobs.filter(job => job.postedBy === userId);
  },

  async createJob(jobData: Omit<Job, 'id' | 'postedBy' | 'postedAt' | 'bidsCount' | 'status'>) {
    await delay(1000);
    
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const userId = token.replace('mock-token-', '');
    
    const newJob: Job = {
      ...jobData,
      id: jobIdCounter.toString(),
      postedBy: userId,
      postedAt: new Date().toISOString(),
      bidsCount: 0,
      status: 'open',
    };
    
    mockJobs.unshift(newJob);
    jobIdCounter++;
    
    return newJob;
  },

  async getJobDetails(jobId: string) {
    await delay(500);
    
    const job = mockJobs.find(j => j.id === jobId);
    if (!job) throw new Error('Job not found');
    
    return job;
  },

  async updateJobStatus(jobId: string, status: Job['status']) {
    await delay(500);
    
    const jobIndex = mockJobs.findIndex(j => j.id === jobId);
    if (jobIndex === -1) throw new Error('Job not found');
    
    mockJobs[jobIndex].status = status;
    return mockJobs[jobIndex];
  },
};