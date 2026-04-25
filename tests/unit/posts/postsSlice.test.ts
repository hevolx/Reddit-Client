import { describe, it, expect } from 'vitest';
import postsReducer from '../../../src/features/posts/postsSlice';

describe('postsSlice', () => {
  it('initial state has status idle', () => {
    // Act
    const state = postsReducer(undefined, { type: '@@INIT' });

    // Assert
    expect(state.status).toBe('idle');
  });
});
