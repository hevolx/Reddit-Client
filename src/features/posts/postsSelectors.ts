import type { Post } from './postsSlice';

export type PostsState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  posts: Post[];
  error: string | null;
};

type RootState = { posts: PostsState };

/** Selects the full list of fetched posts. */
export const selectAllPosts = (state: RootState) => state.posts.posts;
/** Selects the current fetch status. */
export const selectPostsStatus = (state: RootState) => state.posts.status;
/** Selects the error message from a failed fetch, or null. */
export const selectPostsError = (state: RootState) => state.posts.error;