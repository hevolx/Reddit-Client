import { describe, it, expect } from 'vitest';
import { selectFilteredPosts } from '../../../src/features/search/selectFilteredPosts';

const posts = [
  { id: '1', title: 'React tips', author: 'u/alice', score: 10, numComments: 2, createdUtc: 0, thumbnail: '', permalink: '' },
  { id: '2', title: 'TypeScript guide', author: 'u/bob', score: 5, numComments: 1, createdUtc: 0, thumbnail: '', permalink: '' },
];

describe('selectFilteredPosts', () => {
  it('filters by title case-insensitively', () => {
    // Arrange
    const state = {
      posts: { status: 'succeeded' as const, posts, error: null },
      filter: { query: 'REACT', category: null },
    };

    // Act
    const result = selectFilteredPosts(state);

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('React tips');
  });

  it('returns all posts when query is empty', () => {
    // Arrange
    const state = {
      posts: { status: 'succeeded' as const, posts, error: null },
      filter: { query: '', category: null },
    };

    // Act
    const result = selectFilteredPosts(state);

    // Assert
    expect(result).toEqual(posts);
  });
});
