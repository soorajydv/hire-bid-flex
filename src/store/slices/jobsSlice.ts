import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { jobsService } from '../../services/jobsService';

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: {
    type: 'fixed' | 'hourly' | 'monthly';
    min: number;
    max: number;
    rate?: number; // For hourly/monthly rates
  };
  postedBy: string;
  postedAt: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  bidsCount: number;
  acceptedBid?: string;
  urgent: boolean;
}

interface JobsState {
  jobs: Job[];
  myJobs: Job[];
  currentJob: Job | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    location: string;
    budgetType: string;
    budgetMin: number;
    budgetMax: number;
    urgent: boolean;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalJobs: number;
  };
}

const initialState: JobsState = {
  jobs: [],
  myJobs: [],
  currentJob: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    location: '',
    budgetType: '',
    budgetMin: 0,
    budgetMax: 10000,
    urgent: false,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
  },
};

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params: { page?: number; filters?: any }) => {
    return await jobsService.getJobs(params);
  }
);

export const fetchMyJobs = createAsyncThunk('jobs/fetchMyJobs', async () => {
  return await jobsService.getMyJobs();
});

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData: Omit<Job, 'id' | 'postedBy' | 'postedAt' | 'bidsCount' | 'status'>) => {
    return await jobsService.createJob(jobData);
  }
);

export const fetchJobDetails = createAsyncThunk(
  'jobs/fetchJobDetails',
  async (jobId: string) => {
    return await jobsService.getJobDetails(jobId);
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch jobs';
      })
      // Fetch my jobs
      .addCase(fetchMyJobs.fulfilled, (state, action) => {
        state.myJobs = action.payload;
      })
      // Create job
      .addCase(createJob.fulfilled, (state, action) => {
        state.myJobs.unshift(action.payload);
      })
      // Fetch job details
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.currentJob = action.payload;
      });
  },
});

export const { setFilters, clearFilters, setCurrentPage } = jobsSlice.actions;
export default jobsSlice.reducer;