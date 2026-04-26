import type { Post } from './postsSlice';

type PostCardProps = {
  post: Post;
};

export const PostCard = (_props: PostCardProps) => {
  return <h1>{_props.post.title}</h1>
};
