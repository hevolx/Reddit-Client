import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostsList } from '../../../src/features/posts/PostsList';

describe('PostsList', () => {
  it('shows "No posts" when posts array is empty', () => {
    // Arrange & Act
    render(<PostsList posts={[]} status="succeeded" error={null} />);

    // Assert
    expect(screen.getByText('No posts')).toBeInTheDocument();
  });

  it('renders exactly 5 skeleton loaders when status is loading', () => {
    // Act
    render(<PostsList posts={[]} status="loading" error={null} />);

    // Assert
    expect(screen.getAllByTestId('post-skeleton')).toHaveLength(5);
  });

  it('renders post titles when posts are provided', () => {
    // Arrange
    const posts = [
      { id: '1', title: 'First post', author: 'alice', score: 10, numComments: 2, createdUtc: 0, thumbnail: '', permalink: '/r/test/1', subreddit: 'test' },
      { id: '2', title: 'Second post', author: 'bob', score: 5, numComments: 0, createdUtc: 0, thumbnail: '', permalink: '/r/test/2', subreddit: 'test' },
    ];

    // Act
    render(<PostsList posts={posts} status="succeeded" error={null} />);

    // Assert
    expect(screen.getByText('First post')).toBeInTheDocument();
    expect(screen.getByText('Second post')).toBeInTheDocument();
  });

  it('renders an error message when status is failed', () => {
    // Act
    render(<PostsList posts={[]} status="failed" error="Something went wrong" />);

    // Assert
    expect(screen.getByTestId('posts-error')).toBeInTheDocument();
  });

  it('renders a "Try again" button when status is failed and onRetry is provided', () => {
    // Act
    render(<PostsList posts={[]} status="failed" error="Something went wrong" onRetry={() => {}} />);

    // Assert
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  it('calls onRetry when "Try again" button is clicked', () => {
    // Arrange
    const onRetry = vi.fn();
    render(<PostsList posts={[]} status="failed" error="Something went wrong" onRetry={onRetry} />);

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    // Assert
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
