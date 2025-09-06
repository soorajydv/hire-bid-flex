import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import jobsSlice from './slices/jobsSlice';
import bidsSlice from './slices/bidsSlice';
import notificationsSlice from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    jobs: jobsSlice,
    bids: bidsSlice,
    notifications: notificationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;