import { describe, it, expect } from 'vitest';
import postsReducer from '../../../src/features/posts/postsSlice';

describe('postsSlice', () => {
  it('initial state has status idle', () => {
    // Act
    const state = postsReducer(undefined, { type: '@@INIT' });

    // Assert
    expect(state.status).toBe('idle');
  });

  it('initial state has empty posts array', () => {
    // Act
    const state = postsReducer(undefined, { type: '@@INIT' });

    // Assert
    expect(state.posts).toEqual([]);
  });

  it('initial state has error null', () => {
    // Act
    const state = postsReducer(undefined, { type: '@@INIT' });

    // Assert
    expect(state.error).toBeNull();
  });

  it('fetchPosts pending sets status to loading', () => {
    // Act
    const state = postsReducer(undefined, { type: 'posts/fetchPosts/pending' });

    // Assert
    expect(state.status).toBe('loading');
  });

  it('fetchPosts pending resets error to null', () => {
    // Arrange
    const stateWithError = { status: 'failed' as const, posts: [], error: 'Network error' };

    // Act
    const state = postsReducer(stateWithError, { type: 'posts/fetchPosts/pending' });

    // Assert
    expect(state.error).toBeNull();
  });

  it('fetchPosts fulfilled sets status to succeeded and replaces posts', () => {
    // Arrange
    const posts = [{ id: '1', title: 'Test post' }];

    // Act
    const state = postsReducer(undefined, {
      type: 'posts/fetchPosts/fulfilled',
      payload: posts,
    });

    // Assert
    expect(state.status).toBe('succeeded');
    expect(state.posts).toEqual(posts);
  });

  it('fetchPosts rejected sets status to failed and stores error message', () => {
    // Act
    const state = postsReducer(undefined, {
      type: 'posts/fetchPosts/rejected',
      error: { message: 'Network error' },
    });

    // Assert
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Network error');
  });
});
