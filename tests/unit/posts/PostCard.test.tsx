import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  subreddit: 'test',
  selftext: '',
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

  it('displays relative time', () => {
    // Arrange
    vi.useFakeTimers();
    const now = Math.floor(Date.now() / 1000);
    vi.setSystemTime(now * 1000);
    const post = makePost({ createdUtc: now - 30 });

    // Act
    render(<PostCard post={post} />);

    // Assert
    expect(screen.getByTestId('post-time')).toHaveTextContent('just now');
    vi.useRealTimers();
  });

  it('renders img element when thumbnail is a valid URL', () => {
    // Arrange
    const post = makePost({ thumbnail: 'https://example.com/image.jpg' });

    // Act
    render(<PostCard post={post} />);

    // Assert
    expect(screen.getByTestId('post-thumbnail')).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders no img when thumbnail is "self"', () => {
    // Arrange
    const post = makePost({ thumbnail: 'self' });

    // Act
    render(<PostCard post={post} />);

    // Assert
    expect(screen.queryByTestId('post-thumbnail')).not.toBeInTheDocument();
  });

  it('renders no img when thumbnail is "default"', () => {
    // Arrange
    const post = makePost({ thumbnail: 'default' });

    // Act
    render(<PostCard post={post} />);

    // Assert
    expect(screen.queryByTestId('post-thumbnail')).not.toBeInTheDocument();
  });

  it('renders no img when thumbnail is empty string', () => {
    // Arrange
    const post = makePost({ thumbnail: '' });

    // Act
    render(<PostCard post={post} />);

    // Assert
    expect(screen.queryByTestId('post-thumbnail')).not.toBeInTheDocument();
  });

  it('upvote button has aria-label "Upvote"', () => {
    // Arrange
    const post = makePost();

    // Act
    render(<PostCard post={post} />);

    // Assert
    expect(screen.getByRole('button', { name: 'Upvote' })).toBeInTheDocument();
  });

  it('downvote button has aria-label "Downvote"', () => {
    // Arrange
    const post = makePost();

    // Act
    render(<PostCard post={post} />);

    // Assert
    expect(screen.getByRole('button', { name: 'Downvote' })).toBeInTheDocument();
  });

  it('calls onSelect with the post object when clicked', async () => {
    // Arrange
    const post = makePost();
    const onSelect = vi.fn();

    // Act
    render(<PostCard post={post} onSelect={onSelect} />);
    await userEvent.click(screen.getByTestId('post-card'));

    // Assert
    expect(onSelect).toHaveBeenCalledWith(post);
  });

  it('calls onSelect when Enter is pressed on the focused card', async () => {
    // Arrange
    const post = makePost();
    const onSelect = vi.fn();
    render(<PostCard post={post} onSelect={onSelect} />);
    screen.getByTestId('post-card').focus();

    // Act
    await userEvent.keyboard('{Enter}');

    // Assert
    expect(onSelect).toHaveBeenCalledWith(post);
  });
});
