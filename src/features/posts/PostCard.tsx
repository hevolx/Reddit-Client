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

export const PostCard = ({ post, onSelect, onUpvote, onDownvote }: PostCardProps) => {
  const showThumbnail =
    !!post.thumbnail &&
    post.thumbnail !== 'self' &&
    post.thumbnail !== 'default' &&
    isValidImageUrl(post.thumbnail);

  return (
    <div className="post-card">
      <div className="post-vote">
        <button
          type="button"
          className="vote-btn vote-up"
          aria-label="Upvote"
          onClick={() => onUpvote?.(post)}
          disabled={!onUpvote}
        >
          ▲
        </button>
        <span className="vote-score" data-testid="post-score">
          {formatScore(post.score)}
        </span>
        <button
          type="button"
          className="vote-btn vote-down"
          aria-label="Downvote"
          onClick={() => onDownvote?.(post)}
          disabled={!onDownvote}
        >
          ▼
        </button>
      </div>

      <div className="post-body">
        <div className="post-meta">
          <span className="post-subreddit">r/{post.subreddit}</span>
          <span className="post-dot">•</span>
          <span data-testid="post-author">Posted by {post.author}</span>
          <span className="post-dot">•</span>
          <span data-testid="post-time">{formatRelativeTime(post.createdUtc)}</span>
        </div>

        <h2 className="post-title">
          <button
            type="button"
            className="post-title-btn"
            data-testid="post-card"
            aria-label={`Open post: ${post.title || post.id}`}
            onClick={() => onSelect?.(post)}
          >
            {post.title}
          </button>
        </h2>

        <div className="post-actions">
          <span className="post-action" data-testid="post-comment-count">
            💬 {formatScore(post.numComments)} comments
          </span>
        </div>
      </div>

      {showThumbnail && (
        <div className="post-thumbnail-wrap">
          <img
            data-testid="post-thumbnail"
            className="post-thumbnail"
            src={post.thumbnail}
            alt=""
          />
        </div>
      )}
    </div>
  );
};
