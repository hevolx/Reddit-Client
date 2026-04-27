import type { Post } from '../posts/postsSlice';

export function selectFilteredPosts(state: {
  posts: { posts: Post[] };
  filter: { query: string, category?: string };
}) {
  return state.posts.posts.filter((post) => {
    const title = post.title.toLowerCase();
    const query = state.filter.query.toLowerCase();
    const category = state.filter.category?.toLowerCase();

    return (!category || post.subreddit.toLowerCase() === category) && title.includes(query);


  });
}