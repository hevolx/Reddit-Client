import { Post } from './postsSlice'

type PostDetailProps = {
  post: Post;
  status: string;
};

export const PostDetail = (_props: PostDetailProps) => {
  const showSelftext = !!_props.post.selftext;
  const showStatus = "loading";
  return (
    <>
      <h1>{_props.post.title}</h1>
      {showSelftext
        ? <p data-testid="post-selftext">{_props.post.selftext}</p>
        : null}
      {showStatus == _props.status
        ? <p data-testid="comments-loading">Loading comments...</p>
        : null}
    </>
  )
}
