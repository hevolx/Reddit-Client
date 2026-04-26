import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPosts } from '../../../src/features/posts/postsSlice';

describe('fetchPosts', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('calls Reddit API endpoint with given subreddit', async () => {
    // Arrange
    const mockResponse = { json: vi.fn().mockResolvedValue({ data: { children: [] } }) };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);
    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    await fetchPosts('reactjs')(dispatch, getState, undefined);

    // Assert
    expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/r/reactjs.json');
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
    expect(fulfilledCall[0].payload).toEqual([
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
