import type { Post } from './postsSlice';
import { formatScore } from './formatScore';
import { formatRelativeTime } from './formatRelativeTime';

type PostCardProps = {
  post: Post;
};

export const PostCard = (_props: PostCardProps) => {
  return (
    <>
      <h1>{_props.post.title}</h1>
      <p data-testid="post-author">Posted by {_props.post.author}</p>
      <p data-testid="post-score">{formatScore(_props.post.score)}</p>
      <p data-testid="post-comment-count">{_props.post.numComments}</p>
      <p data-testid="post-time">{formatRelativeTime(_props.post.createdUtc)}</p>
    </>
  );
};
