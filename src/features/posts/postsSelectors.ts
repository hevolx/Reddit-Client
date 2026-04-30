import type { Post } from './postsSlice';

export type PostsState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  posts: Post[];
  error: string | null;
};

type RootState = { posts: PostsState };

/** Selects the full list of fetched posts. */
export const selectAllPosts = ({ posts }: RootState) => posts.posts;
/** Selects the current fetch status. */
export const selectPostsStatus = ({ posts }: RootState) => posts.status;
/** Selects the error message from a failed fetch, or null. */
export const selectPostsError = ({ posts }: RootState) => posts.error;