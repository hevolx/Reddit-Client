import type { Post } from '../posts/postsSlice';

/** Filters posts by subreddit category (exact match) and title query (substring, case-insensitive). */
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