import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: { status: 'idle', posts: [] },
  reducers: {
    postsReducer: (state, action) => {
      state: [];
    }
  }
})

export const { postsReducer } = postsSlice.actions;
export default postsSlice.reducer;