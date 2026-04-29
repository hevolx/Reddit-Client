import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostDetail } from '../../../src/features/posts/PostDetail'

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
})

describe('PostDetail', () => {
  it('renders post.title as heading', () => {
    // Arrange
    const post = makePost({ title: 'My interesting post' })

    // Act
    render(<PostDetail post={post} />)

    // Assert
    expect(screen.getByRole('heading', { name: 'My interesting post' })).toBeInTheDocument()
  })

  it('renders post.selftext when present', () => {
    // Arrange
    const post = makePost({ selftext: 'This is the body of the post.' })

    // Act
    render(<PostDetail post={post} />)

    // Assert
    expect(screen.getByTestId('post-selftext')).toHaveTextContent('This is the body of the post.')
  })

  it('renders no body element when selftext is empty', () => {
    // Arrange
    const post = makePost({ selftext: '' })

    // Act
    render(<PostDetail post={post} />)

    // Assert
    expect(screen.queryByTestId('post-selftext')).not.toBeInTheDocument()
  })

  it('shows "Loading comments..." when status is loading', () => {
    // Arrange
    const post = makePost()

    // Act
    render(<PostDetail post={post} status="loading" />)

    // Assert
    expect(screen.getByTestId('comments-loading')).toHaveTextContent('Loading comments...')
  })

  it('shows "No comments yet" when comments array is empty', () => {
    // Arrange
    const post = makePost()

    // Act
    render(<PostDetail post={post} status="succeeded" comments={[]} />)

    // Assert
    expect(screen.getByTestId('comments-empty')).toHaveTextContent('No comments yet')
  })

  it('renders one Comment per comment in the list', () => {
    // Arrange
    const post = makePost()
    const comments = [
      { id: '1', author: 'alice', body: 'First comment', score: 10 },
      { id: '2', author: 'bob', body: 'Second comment', score: 5 },
    ]

    // Act
    render(<PostDetail post={post} status="succeeded" comments={comments} />)

    // Assert
    expect(screen.getAllByTestId('comment')).toHaveLength(2)
  })
})
