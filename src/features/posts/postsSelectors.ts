import type { Post } from './postsSlice';

export type PostsState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  posts: Post[];
  error: string | null;
};

type RootState = { posts: PostsState };

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;