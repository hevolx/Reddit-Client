import type { Post } from './postsSlice';
import { formatScore } from './formatScore';
import { formatRelativeTime } from './formatRelativeTime';

type PostCardProps = {
  post: Post;
  onSelect?: (post: Post) => void;
  onUpvote?: (post: Post) => void;
  onDownvote?: (post: Post) => void;
};

const isValidImageUrl = (url: string) =>
  url.startsWith('http://') || url.startsWith('https://');

/** Displays a single Reddit post with title, author, score, comment count, age, and optional thumbnail. */
export const PostCard = (_props: PostCardProps) => {
  const showThumbnail =
    !!_props.post.thumbnail &&
    _props.post.thumbnail !== 'self' &&
    _props.post.thumbnail !== 'default' &&
    isValidImageUrl(_props.post.thumbnail);

  return (
    <>
      <h2>{_props.post.title}</h2>
      <p data-testid="post-author">Posted by {_props.post.author}</p>
      <p data-testid="post-score">{formatScore(_props.post.score)}</p>
      <p data-testid="post-comment-count">{_props.post.numComments}</p>
      <p data-testid="post-time">{formatRelativeTime(_props.post.createdUtc)}</p>
      {showThumbnail
        ? <img data-testid="post-thumbnail" src={_props.post.thumbnail} alt="" />
        : null}
      <button
        type="button"
        data-testid="post-card"
        aria-label={`Open post: ${_props.post.title || _props.post.id}`}
        onClick={() => _props.onSelect?.(_props.post)}
      />
      <button
        type="button"
        aria-label="Upvote"
        onClick={() => _props.onUpvote?.(_props.post)}
        disabled={!_props.onUpvote}
      />
      <button
        type="button"
        aria-label="Downvote"
        onClick={() => _props.onDownvote?.(_props.post)}
        disabled={!_props.onDownvote}
      />
    </>
  );
};
