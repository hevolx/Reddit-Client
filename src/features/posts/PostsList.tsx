import type { PostsState } from './postsSelectors';

export const PostsList = (props: PostsState) => {
  if (props.status == 'loading') {
    return (
      <ul>
        {Array.from({ length: 5 }).map((_, i) =>
          <div key={i} data-testid="post-skeleton" />
        )}
      </ul>
    );
  }
  else if (props.status == 'failed') {
    return (
      <>
        <div data-testid="posts-error" />
        <button>Try again</button>
      </>
    )
  }
  else if (props.posts.length == 0) {
    return <p>No posts</p>;
  } else {
    return (
      <ul>
        {props.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    );
  }
};