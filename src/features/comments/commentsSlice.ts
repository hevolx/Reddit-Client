import { createSlice } from '@reduxjs/toolkit'

interface CommentsState {
  commentsByPostId: {};
}

const initialState: CommentsState = {
  commentsByPostId: {},
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {

  },
});

export default commentsSlice.reducer;