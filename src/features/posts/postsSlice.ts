import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: { status: 'idle' },
  reducers: {
    postsReducer: (state, action) => {
      state: undefined;
    }
  }
})

export const { postsReducer } = postsSlice.actions;
export default postsSlice.reducer;