import type { PostsState } from './postsSelectors';

type PostsListProps = PostsState & { onRetry?: () => void };

export const PostsList = (props: PostsListProps) => {
  if (props.status === 'idle') {
    return null;
  }
  if (props.status === 'loading') {
    return (
      <ul>
        {Array.from({ length: 5 }).map((_, i) =>
          <li key={i} data-testid="post-skeleton" />
        )}
      </ul>
    );
  }
  if (props.status === 'failed') {
    return (
      <>
        <div data-testid="posts-error" role="alert">
          {props.error ?? 'Failed to load posts.'}
        </div>
        <button onClick={props.onRetry}>Try again</button>
      </>
    );
  }
  // status === 'succeeded'
  if (props.posts.length === 0) {
    return <p>No posts</p>;
  }
  return (
    <ul>
      {props.posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};