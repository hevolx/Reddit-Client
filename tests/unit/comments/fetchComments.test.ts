import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchComments } from '../../../src/features/comments/commentsSlice'

describe('fetchComments', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('calls Reddit comments endpoint with given postId', async () => {
    // Arrange
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue([{}, { data: { children: [] } }]),
    }
    ;(fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse)
    const dispatch = vi.fn()
    const getState = vi.fn()

    // Act
    await fetchComments({ postId: 'abc123', permalink: '/r/reactjs/comments/abc123/test/' })(
      dispatch,
      getState,
      undefined,
    )

    // Assert
    expect(fetch).toHaveBeenCalledWith(
      'https://www.reddit.com/r/reactjs/comments/abc123/test.json',
    )
  })
})
