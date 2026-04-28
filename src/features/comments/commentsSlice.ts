import { createSlice } from '@reduxjs/toolkit'

interface CommentsState {
  status: string;
  commentsByPostId: {};
}

const initialState: CommentsState = {
  status: 'idle',
  commentsByPostId: {},
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {

  },
});

export default commentsSlice.reducer;