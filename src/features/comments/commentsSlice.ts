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

interface CommentsChild {
  data: {
    id: string,
    author: string,
    body: string,
    score: number,
  };
}

interface Comments {
  id: string,
  author: string,
  body: string,
  score: number,
}

type FetchCommentsArg = {
  postId: string;
  permalink: string;
}

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (arg: FetchCommentsArg) => {
    const response = await fetch(`https://www.reddit.com${arg.permalink.replace(/\/$/, '')}.json`);
    if (response.ok) {
      const data = await response.json();
      const children = data[1].data.children;
      const comments = children
        .filter((child: CommentsChild) => child.data.author !== 'AutoModerator')
        .map((child: CommentsChild): Comments => ({
          id: child.data.id,
          author: child.data.author,
          body: child.data.body,
          score: child.data.score
        }));
      return { postId: arg.postId, comments: comments }
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
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