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
      '/projects/reddit/api/reddit/r/reactjs/comments/abc123/test.json',
    )
  })

  it('filters out AutoModerator comments', async () => {
    // Arrange
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue([
        {},
        {
          data: {
            children: [
              { kind: 't1', data: { id: 'c1', author: 'someuser', body: 'Real comment', score: 5 } },
              { kind: 't1', data: { id: 'c2', author: 'AutoModerator', body: 'Auto reply', score: 1 } },
            ],
          },
        },
      ]),
    }
    ;(fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse)
    const dispatch = vi.fn()
    const getState = vi.fn()

    // Act
    const result = await fetchComments({ postId: 'abc123', permalink: '/r/reactjs/comments/abc123/test/' })(
      dispatch,
      getState,
      undefined,
    )

    // Assert
    expect((result as { payload: { comments: unknown[] } }).payload.comments).toEqual([
      { id: 'c1', author: 'someuser', body: 'Real comment', score: 5 },
    ])
  })

  it('maps response to expected comment object shape', async () => {
    // Arrange
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue([
        {},
        {
          data: {
            children: [
              {
                kind: 't1',
                data: {
                  id: 'xyz789',
                  author: 'someuser',
                  body: 'This is a comment',
                  score: 42,
                },
              },
            ],
          },
        },
      ]),
    }
    ;(fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse)
    const dispatch = vi.fn()
    const getState = vi.fn()

    // Act
    const result = await fetchComments({ postId: 'abc123', permalink: '/r/reactjs/comments/abc123/test/' })(
      dispatch,
      getState,
      undefined,
    )

    // Assert
    expect((result as { payload: { comments: unknown[] } }).payload.comments).toEqual([
      { id: 'xyz789', author: 'someuser', body: 'This is a comment', score: 42 },
    ])
  })

  it('returns object with postId and comments', async () => {
    // Arrange
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue([
        {},
        {
          data: {
            children: [
              { kind: 't1', data: { id: 'c1', author: 'someuser', body: 'Hello', score: 3 } },
            ],
          },
        },
      ]),
    }
    ;(fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse)
    const dispatch = vi.fn()
    const getState = vi.fn()

    // Act
    const result = await fetchComments({ postId: 'post99', permalink: '/r/reactjs/comments/post99/test/' })(
      dispatch,
      getState,
      undefined,
    )

    // Assert
    expect((result as { payload: unknown }).payload).toEqual({
      postId: 'post99',
      comments: [{ id: 'c1', author: 'someuser', body: 'Hello', score: 3 }],
    })
  })
})
