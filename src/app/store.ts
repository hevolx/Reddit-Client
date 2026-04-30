import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import filterReducer from '../features/search/filterSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    filter: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
