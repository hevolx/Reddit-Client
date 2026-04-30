import type { Post } from '../posts/postsSlice';

/** Filters posts by subreddit category (exact match) and title query (substring, case-insensitive). */
export function selectFilteredPosts({ filter, posts }: {
  posts: { posts: Post[] };
  filter: { query: string, category?: string };
}) {
  const queryLower = filter.query.toLowerCase();
  const categoryLower = filter.category?.toLowerCase();
  return posts.posts.filter((post) => {
    const title = post.title.toLowerCase();
    return (!categoryLower || post.subreddit.toLowerCase() === categoryLower) && title.includes(queryLower);
  });
}