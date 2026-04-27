import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchInput } from '../../../src/features/search/SearchInput';

describe('SearchInput', () => {
  it('renders input with placeholder "Search posts..."', () => {
    // Arrange & Act
    render(<SearchInput onChange={() => {}} />);

    // Assert
    expect(screen.getByPlaceholderText('Search posts...')).toBeInTheDocument();
  });
});
