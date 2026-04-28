import { describe, it, expect } from 'vitest'
import commentsReducer from '../../../src/features/comments/commentsSlice'

describe('commentsSlice', () => {
  it('initial state commentsByPostId is empty object', () => {
    const state = commentsReducer(undefined, { type: '@@INIT' })

    expect(state.commentsByPostId).toEqual({})
  })

  it('initial state status is idle', () => {
    const state = commentsReducer(undefined, { type: '@@INIT' })

    expect(state.status).toBe('idle')
  })

  it('initial state error is null', () => {
    const state = commentsReducer(undefined, { type: '@@INIT' })

    expect(state.error).toBeNull()
  })

  it('fetchComments.pending sets status to loading', () => {
    const state = commentsReducer(undefined, { type: 'comments/fetchComments/pending' })

    expect(state.status).toBe('loading')
  })
})
