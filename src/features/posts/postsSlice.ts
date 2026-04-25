import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle',
  posts: [],
  error: null
}


export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    return 'posts/fetchPosts/pending';
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    postsReducer: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading',
        state.error = null;
    });
  }
});

export const { postsReducer } = postsSlice.actions;
export default postsSlice.reducer;