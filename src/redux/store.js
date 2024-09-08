import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import connectionReducer from './connectionSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    connection: connectionReducer,
  },
});
