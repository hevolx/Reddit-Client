import type { Post } from './postsSlice';
import { formatScore } from './formatScore';
import { formatRelativeTime } from './formatRelativeTime';

type PostCardProps = {
  post: Post;
  onSelect?: (post: Post) => void;
};

const isValidImageUrl = (url: string) =>
  url.startsWith('http://') || url.startsWith('https://');

export const PostCard = (_props: PostCardProps) => {
  const showThumbnail =
    _props.post.thumbnail !== 'self' &&
    _props.post.thumbnail !== 'default' &&
    _props.post.thumbnail !== '' &&
    isValidImageUrl(_props.post.thumbnail);

  return (
    <>
      <h1>{_props.post.title}</h1>
      <p data-testid="post-author">Posted by {_props.post.author}</p>
      <p data-testid="post-score">{formatScore(_props.post.score)}</p>
      <p data-testid="post-comment-count">{_props.post.numComments}</p>
      <p data-testid="post-time">{formatRelativeTime(_props.post.createdUtc)}</p>
      {showThumbnail
        ? <img data-testid="post-thumbnail" src={_props.post.thumbnail} alt="" />
        : null}
      <button
        data-testid="post-card"
        aria-label={`Open post: ${_props.post.title || _props.post.id}`}
        onClick={() => _props.onSelect?.(_props.post)}
      />
      <button aria-label="Upvote"></button>
      <button aria-label="Downvote"></button>
    </>
  );
};
