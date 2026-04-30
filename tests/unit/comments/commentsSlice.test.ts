import { describe, it, expect } from 'vitest'
import commentsReducer from '../../../src/features/comments/commentsSlice'

describe('commentsSlice', () => {
  it('initial state commentsByPostId is empty object', () => {
    const state = commentsReducer(undefined, { type: '@@INIT' })

    expect(state.commentsByPostId).toEqual({})
  })

  it('initial state statusByPostId is empty object', () => {
    const state = commentsReducer(undefined, { type: '@@INIT' })

    expect(state.statusByPostId).toEqual({})
  })

  it('initial state errorByPostId is empty object', () => {
    const state = commentsReducer(undefined, { type: '@@INIT' })

    expect(state.errorByPostId).toEqual({})
  })

  it('fetchComments.pending sets statusByPostId to loading for that post', () => {
    const action = {
      type: 'comments/fetchComments/pending',
      meta: { arg: { postId: 'post123', permalink: '/r/test/comments/post123' } },
    }
    const state = commentsReducer(undefined, action)

    expect(state.statusByPostId['post123']).toBe('loading')
    expect(state.errorByPostId['post123']).toBeNull()
  })

  it('fetchComments.fulfilled stores comments under payload.postId', () => {
    const comments = [{ id: 'c1', body: 'Hello' }]
    const action = {
      type: 'comments/fetchComments/fulfilled',
      payload: { postId: 'post123', comments },
    }

    const state = commentsReducer(undefined, action)

    expect(state.commentsByPostId['post123']).toEqual(comments)
  })

  it('fetchComments.rejected stores error message for that post', () => {
    const action = {
      type: 'comments/fetchComments/rejected',
      meta: { arg: { postId: 'post123', permalink: '/r/test/comments/post123' } },
      error: { message: 'Network error' },
    }

    const state = commentsReducer(undefined, action)

    expect(state.statusByPostId['post123']).toBe('failed')
    expect(state.errorByPostId['post123']).toBe('Network error')
  })
})
