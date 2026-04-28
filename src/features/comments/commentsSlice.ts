import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async () => {
    return 'comments/fetchComments/pending'
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
  }
});

export default commentsSlice.reducer;