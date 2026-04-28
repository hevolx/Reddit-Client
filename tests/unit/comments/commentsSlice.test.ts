import { describe, it, expect } from 'vitest'
import commentsReducer from '../../../src/features/comments/commentsSlice'

describe('commentsSlice', () => {
  it('initial state commentsByPostId is empty object', () => {
    const state = commentsReducer(undefined, { type: '@@INIT' })

    expect(state.commentsByPostId).toEqual({})
  })
})
