import type { Post } from '../posts/postsSlice';

export function selectFilteredPosts(state: {
  posts: { posts: Post[] };
  filter: { query: string, category: null };
}) {
  return state.posts.posts.filter((post) => {
    const title = post.title.toLowerCase();
    const query = state.filter.query.toLowerCase();
    return title.includes(query);
  });
}