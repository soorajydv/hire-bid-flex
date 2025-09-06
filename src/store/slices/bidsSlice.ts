import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bidsService } from '../../services/bidsService';

export interface Bid {
  id: string;
  jobId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface BidsState {
  bids: Bid[];
  myBids: Bid[];
  loading: boolean;
  error: string | null;
}

const initialState: BidsState = {
  bids: [],
  myBids: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchJobBids = createAsyncThunk(
  'bids/fetchJobBids',
  async (jobId: string) => {
    return await bidsService.getJobBids(jobId);
  }
);

export const fetchMyBids = createAsyncThunk('bids/fetchMyBids', async () => {
  return await bidsService.getMyBids();
});

export const placeBid = createAsyncThunk(
  'bids/placeBid',
  async (bidData: { jobId: string; amount: number; message: string }) => {
    return await bidsService.placeBid(bidData);
  }
);

export const acceptBid = createAsyncThunk(
  'bids/acceptBid',
  async (bidId: string) => {
    return await bidsService.acceptBid(bidId);
  }
);

export const rejectBid = createAsyncThunk(
  'bids/rejectBid',
  async (bidId: string) => {
    return await bidsService.rejectBid(bidId);
  }
);

const bidsSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch job bids
      .addCase(fetchJobBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobBids.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload;
      })
      .addCase(fetchJobBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bids';
      })
      // Fetch my bids
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.myBids = action.payload;
      })
      // Place bid
      .addCase(placeBid.fulfilled, (state, action) => {
        state.myBids.push(action.payload);
      })
      // Accept bid
      .addCase(acceptBid.fulfilled, (state, action) => {
        const bidIndex = state.bids.findIndex(bid => bid.id === action.payload.id);
        if (bidIndex !== -1) {
          state.bids[bidIndex] = action.payload;
        }
      })
      // Reject bid
      .addCase(rejectBid.fulfilled, (state, action) => {
        const bidIndex = state.bids.findIndex(bid => bid.id === action.payload.id);
        if (bidIndex !== -1) {
          state.bids[bidIndex] = action.payload;
        }
      });
  },
});

export default bidsSlice.reducer;