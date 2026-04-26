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
});
