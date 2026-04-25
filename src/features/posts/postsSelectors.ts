export const selectAllPosts = (state: { posts: { posts: any[] } }) => {
  return state.posts.posts;
}

export const selectPostsStatus = (state: { posts: { status: string } }) => {
  return state.posts.status;
}