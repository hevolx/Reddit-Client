import { Post } from './postsSlice';
import { Comments } from '../comments/commentsSlice';
import { formatRelativeTime } from './formatRelativeTime';
import { formatScore } from './formatScore';

type PostDetailProps = {
  post: Post;
  status?: string;
  comments?: Comments[];
};

export const PostDetail = ({ post, status, comments }: PostDetailProps) => {
  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <div className="post-detail-meta">
          <span className="post-detail-subreddit">r/{post.subreddit}</span>
          <span className="post-dot">•</span>
          <span>Posted by u/{post.author}</span>
          <span className="post-dot">•</span>
          <span>{formatRelativeTime(post.createdUtc)}</span>
        </div>
        <h1 className="post-detail-title">{post.title}</h1>
      </div>

      {post.selftext && (
        <p className="post-selftext" data-testid="post-selftext">{post.selftext}</p>
      )}

      <div className="comments-section">
        <p className="comments-heading">
          {formatScore(post.numComments)} Comments
        </p>

        {status === 'loading' && (
          <p className="comments-status" data-testid="comments-loading">Loading comments...</p>
        )}
        {status === 'failed' && (
          <p className="comments-status" data-testid="comments-error">Failed to load comments.</p>
        )}
        {status !== 'loading' && status !== 'failed' && (comments?.length ?? 0) === 0 && (
          <p className="comments-status" data-testid="comments-empty">No comments yet.</p>
        )}
        {status !== 'loading' && status !== 'failed' && comments?.map((comment) => (
          <div key={comment.id} className="comment" data-testid="comment">
            <div className="comment-header">
              <span className="comment-author">{comment.author}</span>
              <span className="comment-score">{formatScore(comment.score)} points</span>
            </div>
            <p className="comment-body">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
