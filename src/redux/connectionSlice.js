import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const testConnection = createAsyncThunk(
  'connection/test',
  async () => {
    const response = await fetch('http://localhost:5000/api/test-db-connection');
    console.log(response);
    return response.json();
  }
);

const connectionSlice = createSlice({
  name: 'connection',
  initialState: { status: 'pending', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(testConnection.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(testConnection.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(testConnection.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export default connectionSlice.reducer;
