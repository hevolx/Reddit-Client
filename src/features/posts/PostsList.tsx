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
  else if (props.posts.length == 0) {
    return <p>No posts</p>;
  } else {
    return null
  }
};