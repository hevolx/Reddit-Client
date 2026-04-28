import { createSlice } from '@reduxjs/toolkit'

interface CommentsState {
  commentsByPostId: {};
  status: string;
  error: string | null;
}

const initialState: CommentsState = {
  status: 'idle',
  commentsByPostId: {},
  error: null,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {

  },
});

export default commentsSlice.reducer;