import type { Post } from './postsSlice';
import type { PostsState } from './postsSelectors';
import { PostCard } from './PostCard';

type PostsListProps = PostsState & {
  onRetry?: () => void;
  onSelect?: (post: Post) => void;
};

export const PostsList = ({ status, error, onRetry, posts, onSelect }: PostsListProps) => {
  if (status === 'idle') return null;

  if (status === 'loading') {
    return (
      <ul className="posts-list">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="post-skeleton" data-testid="post-skeleton" aria-busy="true" />
        ))}
      </ul>
    );
  }

  if (status === 'failed') {
    return (
      <div className="error-state" data-testid="posts-error" role="alert">
        <p>{error ?? 'Failed to load posts.'}</p>
        {onRetry && (
          <button className="retry-btn" onClick={onRetry}>Try again</button>
        )}
      </div>
    );
  }

  if (posts.length === 0) {
    return <p className="empty-state">No posts</p>;
  }

  return (
    <ul className="posts-list">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
};
