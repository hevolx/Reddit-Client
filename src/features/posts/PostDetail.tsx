import { Post } from './postsSlice';
import { Comments } from '../comments/commentsSlice';

type PostDetailProps = {
  post: Post;
  status: string;
  comments?: Comments[];
};

export const PostDetail = ({ post, status, comments }: PostDetailProps) => {
  const showSelftext = !!post.selftext;
  const showStatus = "loading";

  return (
    <>
      <h1>{post.title}</h1>
      {showSelftext
        ? <p data-testid="post-selftext">{post.selftext}</p>
        : null}
      {showStatus == status
        ? <p data-testid="comments-loading">Loading comments...</p>
        : null}
      {comments?.length == 0
        ? <p data-testid="comments-empty">No comments yet</p>
        : comments?.map((comment) => {
          return (
            <div data-testid="comment">
              <p>{comment.author}</p>
              <p>{comment.body}</p>
              <p>{comment.score}</p>
            </div>
          )
        })}
    </>
  )
}
