export const selectAllPosts = (state: { posts: { posts: any[] } }) => {
  return state.posts.posts;
}
