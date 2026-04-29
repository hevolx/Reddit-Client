import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface CommentsState {
  commentsByPostId: Record<string, {}[]>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CommentsState = {
  status: 'idle',
  commentsByPostId: {},
  error: null,
}

type FetchCommentsArg = {
  postId: string;
  permalink: string;
};


export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (arg: FetchCommentsArg) => {
    const response = await fetch(`https://www.reddit.com${arg.permalink.replace(/\/$/, '')}.json`);
    const data = await response.json();

    return { postId: data.postId, comments: data.comments }
  }
);


const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.commentsByPostId[action.payload.postId] = action.payload.comments;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Unknown error';
    });
  }
});

export default commentsSlice.reducer;