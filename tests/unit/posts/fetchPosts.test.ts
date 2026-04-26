import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPosts } from '../../../src/features/posts/postsSlice';

describe('fetchPosts', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('calls Reddit API endpoint with given subreddit', async () => {
    // Arrange
    const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ data: { children: [] } }) };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);
    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    await fetchPosts('reactjs')(dispatch, getState, undefined);

    // Assert
    expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/r/reactjs.json');
  });

  it('throws when fetch returns HTTP >= 400', async () => {
    // Arrange
    const mockResponse = { ok: false, status: 400 };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);
    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    await fetchPosts('reactjs')(dispatch, getState, undefined);

    // Assert
    const rejectedCall = dispatch.mock.calls.find(
      (call) => call[0]?.type === 'posts/fetchPosts/rejected'
    );
    expect(rejectedCall).toBeDefined();
    expect(rejectedCall![0].error.message).toBe('HTTP error 400');
  });

  it('throws when fetch throws a network error', async () => {
    // Arrange
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Failed to fetch'));
    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    await fetchPosts('reactjs')(dispatch, getState, undefined);

    // Assert
    const rejectedCall = dispatch.mock.calls.find(
      (call) => call[0]?.type === 'posts/fetchPosts/rejected'
    );
    expect(rejectedCall).toBeDefined();
    expect(rejectedCall![0].error.message).toBe('Failed to fetch');
  });

  it('maps response to expected post object shape', async () => {
    // Arrange
    const rawPost = {
      data: {
        id: 'abc123',
        title: 'Test title',
        author: 'testuser',
        score: 42,
        num_comments: 5,
        created_utc: 1000000,
        thumbnail: 'https://example.com/thumb.jpg',
        permalink: '/r/reactjs/comments/abc123/test_title/',
      },
    };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ data: { children: [rawPost] } }),
    };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);
    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    await fetchPosts('reactjs')(dispatch, getState, undefined);

    // Assert
    const fulfilledCall = dispatch.mock.calls.find(
      (call) => call[0]?.type === 'posts/fetchPosts/fulfilled'
    );
    expect(fulfilledCall).toBeDefined();
    expect(fulfilledCall![0].payload).toEqual([
      {
        id: 'abc123',
        title: 'Test title',
        author: 'testuser',
        score: 42,
        numComments: 5,
        createdUtc: 1000000,
        thumbnail: 'https://example.com/thumb.jpg',
        permalink: '/r/reactjs/comments/abc123/test_title/',
      },
    ]);
  });
});
