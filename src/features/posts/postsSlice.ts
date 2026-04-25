import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: { status: 'idle', posts: [], error: null },
  reducers: {
    postsReducer: (state, action) => {
      state: [];
    }
  }
})

export const { postsReducer } = postsSlice.actions;
export default postsSlice.reducer;