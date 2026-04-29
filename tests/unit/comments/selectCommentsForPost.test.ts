import { describe, it, expect } from 'vitest'
import { selectCommentsForPost } from '../../../src/features/comments/commentsSlice'

describe('selectCommentsForPost', () => {
  it('returns comment array for given postId', () => {
    // Arrange
    const comments = [
      { id: 'c1', author: 'user1', body: 'Hello', score: 5 },
      { id: 'c2', author: 'user2', body: 'World', score: 2 },
    ]
    const state = {
      comments: {
        commentsByPostId: { post42: comments },
        status: 'succeeded' as const,
        error: null,
      },
    }

    // Act
    const result = selectCommentsForPost(state, 'post42')

    // Assert
    expect(result).toEqual(comments)
  })
})
