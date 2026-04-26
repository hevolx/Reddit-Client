import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostsList } from '../../../src/features/posts/PostsList';

describe('PostsList', () => {
  it('shows "No posts" when posts array is empty', () => {
    // Arrange & Act
    render(<PostsList posts={[]} status="succeeded" error={null} />);

    // Assert
    expect(screen.getByText('No posts')).toBeInTheDocument();
  });
});
