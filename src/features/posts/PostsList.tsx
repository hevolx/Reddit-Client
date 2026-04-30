import type { PostsState } from './postsSelectors';

type PostsListProps = PostsState & { onRetry?: () => void };

/** Renders the posts list, skeleton loaders, an error state, or nothing depending on `status`. */
export const PostsList = ({ status, error, onRetry, posts }: PostsListProps) => {
  if (status === 'idle') {
    return null;
  }
  if (status === 'loading') {
    return (
      <ul>
        {Array.from({ length: 5 }).map((_, i) =>
          <li key={i} data-testid="post-skeleton" aria-busy="true" />
        )}
      </ul>
    );
  }
  if (status === 'failed') {
    return (
      <>
        <div data-testid="posts-error" role="alert">
          {error ?? 'Failed to load posts.'}
        </div>
        {onRetry && (
          <button onClick={onRetry}>Try again</button>
        )}
      </>
    );
  }
  // status === 'succeeded'
  if (posts.length === 0) {
    return <p>No posts</p>;
  }
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};