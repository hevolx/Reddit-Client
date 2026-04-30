import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/** Represents a single Reddit comment with author, body, and vote score. */
export interface Comments {
  id: string,
  author: string,
  body: string,
  score: number,
}

interface CommentsState {
  commentsByPostId: Record<string, Comments[]>;
  statusByPostId: Record<string, 'idle' | 'loading' | 'succeeded' | 'failed'>;
  errorByPostId: Record<string, string | null>;
}

const initialState: CommentsState = {
  commentsByPostId: {},
  statusByPostId: {},
  errorByPostId: {},
}

interface CommentsChild {
  kind: string;
  data: {
    id: string,
    author: string,
    body: string,
    score: number,
  };
}

type FetchCommentsArg = {
  postId: string;
  permalink: string;
}

/** Fetches the comment thread for a given post via the Reddit JSON API. */
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (arg: FetchCommentsArg) => {
    const response = await fetch(`/api/reddit${arg.permalink.replace(/\/$/, '')}.json`);
    if (response.ok) {
      const data = await response.json();
      if (!Array.isArray(data) || data.length < 2 || !data[1]?.data?.children) {
        return { postId: arg.postId, comments: [] };
      }
      const children = data[1].data.children;
      const comments = children
        .filter((child: CommentsChild) =>
          child.kind !== 'more' &&
          child.data &&
          child.data.author &&
          child.data.body &&
          child.data.author !== 'AutoModerator'
        )
        .map((child: CommentsChild): Comments => ({
          id: child.data.id,
          author: child.data.author,
          body: child.data.body,
          score: child.data.score ?? 0
        }));
      return { postId: arg.postId, comments: comments }
    } else {
      throw new Error(`HTTP error ${response.status}`);
    }
  }
);

/** Selects the cached comments for a specific post, or an empty array if not yet loaded. */
export function selectCommentsForPost(state: {
  comments: CommentsState;
}, postId: string) {
  return state.comments.commentsByPostId[postId] ?? []
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state, action) => {
      const postId = action.meta.arg.postId;
      state.statusByPostId[postId] = 'loading';
      state.errorByPostId[postId] = null;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      const postId = action.payload.postId;
      state.statusByPostId[postId] = 'succeeded';
      state.commentsByPostId[postId] = action.payload.comments;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      const postId = action.meta.arg.postId;
      state.statusByPostId[postId] = 'failed';
      state.errorByPostId[postId] = action.error.message ?? 'Unknown error';
    });
  }
});

export default commentsSlice.reducer;
