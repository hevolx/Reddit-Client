import { describe, it, expect } from 'vitest';
import { selectFilteredPosts } from '../../../src/features/search/selectFilteredPosts';

const posts = [
  { id: '1', title: 'React tips', subreddit: 'reactjs', author: 'u/alice', score: 10, numComments: 2, createdUtc: 0, thumbnail: '', permalink: '', selftext: '' },
  { id: '2', title: 'TypeScript guide', subreddit: 'typescript', author: 'u/bob', score: 5, numComments: 1, createdUtc: 0, thumbnail: '', permalink: '', selftext: '' },
];

describe('selectFilteredPosts', () => {
  it('filters by title case-insensitively', () => {
    // Arrange
    const state = {
      posts: { status: 'succeeded' as const, posts, error: null },
      filter: { query: 'REACT', category: undefined },
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
      filter: { query: '', category: undefined },
    };

    // Act
    const result = selectFilteredPosts(state);

    // Assert
    expect(result).toEqual(posts);
  });

  it('considers query and category together', () => {
    // Arrange
    const mixedPosts = [
      { id: '1', title: 'React tips', subreddit: 'reactjs', author: 'u/alice', score: 10, numComments: 2, createdUtc: 0, thumbnail: '', permalink: '', selftext: '' },
      { id: '2', title: 'React in TypeScript', subreddit: 'typescript', author: 'u/bob', score: 5, numComments: 1, createdUtc: 0, thumbnail: '', permalink: '', selftext: '' },
      { id: '3', title: 'TypeScript guide', subreddit: 'typescript', author: 'u/carol', score: 8, numComments: 3, createdUtc: 0, thumbnail: '', permalink: '', selftext: '' },
    ];
    const state = {
      posts: { status: 'succeeded' as const, posts: mixedPosts, error: null },
      filter: { query: 'react', category: 'reactjs' },
    };

    // Act
    const result = selectFilteredPosts(state);

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});
