import { Post } from './postsSlice'

type PostDetailProps = {
  post: Post;
};

export const PostDetail = (_props: PostDetailProps) => {
  const showSelftext = !!_props.post.selftext;

  return (
    <>
      <h1>{_props.post.title}</h1>
      {showSelftext
        ? <p data-testid="post-selftext">{_props.post.selftext}</p>
        : null}
    </>
  )
}
