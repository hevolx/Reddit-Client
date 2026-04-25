import { describe, it, expect } from 'vitest';
import { selectAllPosts, selectPostsStatus } from '../../../src/features/posts/postsSelectors';

describe('postsSelectors', () => {
  it('selectAllPosts returns the posts array', () => {
    // Arrange
    const posts = [{ id: '1', title: 'Test post' }];
    const state = { posts: { status: 'succeeded', posts, error: null } };

    // Act
    const result = selectAllPosts(state);

    // Assert
    expect(result).toEqual(posts);
  });

  it('selectPostsStatus returns the status string', () => {
    // Arrange
    const state = { posts: { status: 'loading', posts: [], error: null } };

    // Act
    const result = selectPostsStatus(state);

    // Assert
    expect(result).toBe('loading');
  });
});
