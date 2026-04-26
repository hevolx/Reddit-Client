import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle',
  posts: [],
  error: null
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit: string) => {
    fetch(`https://www.reddit.com/r/${subreddit}.json`);
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
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export const { postsReducer } = postsSlice.actions;
export default postsSlice.reducer;