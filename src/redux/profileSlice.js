import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    currentProfile: 'Personal',
    profiles: ['Personal', 'Work', 'Research'],
  },
  reducers: {
    setProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
    addProfile: (state, action) => {
      if (!state.profiles.includes(action.payload)) {
        state.profiles.push(action.payload);
      }
    },
    removeProfile: (state, action) => {
      state.profiles = state.profiles.filter(profile => profile !== action.payload);
      if (state.currentProfile === action.payload) {
        state.currentProfile = state.profiles[0] || '';
      }
    },
  },
});

export const { setProfile, addProfile, removeProfile } = profileSlice.actions;
export default profileSlice.reducer;
