import type { Post } from '../posts/postsSlice';

export function selectFilteredPosts(state: {
  posts: { posts: Post[] };
  filter: string | null;
}) {
  return state.posts.posts
}