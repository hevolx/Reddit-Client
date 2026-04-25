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
});
