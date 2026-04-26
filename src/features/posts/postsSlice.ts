import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface RedditChild {
  data: {
    id: string;
    title: string;
    author: string;
    score: number;
    num_comments: number;
    created_utc: number;
    thumbnail: string;
    permalink: string;
  };
}

interface PostsState {
  status: string;
  posts: unknown[];
  error: string | null;
}

const initialState: PostsState = {
  status: 'idle',
  posts: [],
  error: null
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit: string) => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    if (response.ok) {
      const data = await response.json();
      const children = data.data.children;
      return children.map((child: RedditChild) => ({
        id: child.data.id,
        title: child.data.title,
        author: child.data.author,
        score: child.data.score,
        numComments: child.data.num_comments,
        createdUtc: child.data.created_utc,
        thumbnail: child.data.thumbnail,
        permalink: child.data.permalink
      }));
    } else {
      throw new Error('HTTP error 400');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
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
      state.error = action.error.message ?? 'Unknown error';
    });
  }
});

export default postsSlice.reducer;