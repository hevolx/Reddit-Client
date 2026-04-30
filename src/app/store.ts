import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';

/** The global Redux store instance for the application. */
export const store = configureStore({
  reducer: {
    posts: postsReducer
  },
});

/** Typed dispatch function inferred from the store, includes support for thunks. */
export type AppDispatch = typeof store.dispatch;

/** The complete shape of the Redux state tree, inferred from all reducers. */
export type RootState = ReturnType<typeof store.getState>;

/** Typed thunk action creator for use with Redux Toolkit's async operations. */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
