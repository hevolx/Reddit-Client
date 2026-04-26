import type { PostsState } from './postsSelectors';

export const PostsList = (props: PostsState) => {
  if (props.posts.length == 0) {
    return <p>No posts</p>;
  }
  return null;
};