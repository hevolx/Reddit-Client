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

  it('displays author prefixed with "Posted by"', () => {
    // Arrange
    const post = makePost({ author: 'alice' });

    // Act
    render(<PostCard post={post} />);

    // Assert
    expect(screen.getByTestId('post-author')).toHaveTextContent('Posted by alice');
  });

  it('displays formatted score', () => {
    // Arrange
    const post = makePost({ score: 1000 });

    // Act
    render(<PostCard post={post} />);

    // Assert
    expect(screen.getByTestId('post-score')).toHaveTextContent('1.0k');
  });

  it('displays comment count', () => {
    // Arrange
    const post = makePost({ numComments: 42 });

    // Act
    render(<PostCard post={post} />);

    // Assert
    expect(screen.getByTestId('post-comment-count')).toHaveTextContent('42');
  });
});
