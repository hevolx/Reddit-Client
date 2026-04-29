import { Post } from './postsSlice'

type PostDetailProps = {
  post: Post;
};

export const PostDetail = (_props: PostDetailProps) => {
  return (
    <>
      <h1>{_props.post.title}</h1>
      <p data-testid="post-selftext">{_props.post.selftext}</p>
    </>
  )
}
