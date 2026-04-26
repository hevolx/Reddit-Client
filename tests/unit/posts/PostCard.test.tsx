import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostCard } from '../../../src/features/posts/PostCard';

const makePost = (overrides = {}) => ({
  id: 'abc123',
  title: 'Test post title',
  author: 'testuser',
  score: 42,
  numComments: 7,
  createdUtc: 1700000000,
  thumbnail: '',
  permalink: '/r/test/comments/abc123',
  ...overrides,
});

describe('PostCard', () => {
  it('displays post title as a heading', () => {
    // Arrange
    const post = makePost({ title: 'My awesome post' });

    // Act
    render(<PostCard post={post} />);

    // Assert
    expect(screen.getByRole('heading', { name: 'My awesome post' })).toBeInTheDocument();
  });
});
