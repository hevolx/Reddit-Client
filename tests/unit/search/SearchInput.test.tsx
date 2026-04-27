import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../../../src/features/search/SearchInput';

describe('SearchInput', () => {
  it('renders input with placeholder "Search posts..."', () => {
    // Arrange & Act
    render(<SearchInput onChange={() => {}} />);

    // Assert
    expect(screen.getByPlaceholderText('Search posts...')).toBeInTheDocument();
  });

  it('calls onChange with input value', () => {
    // Arrange
    const onChange = vi.fn();
    render(<SearchInput onChange={onChange} />);

    // Act
    fireEvent.change(screen.getByPlaceholderText('Search posts...'), {
      target: { value: 'hello' },
    });

    // Assert
    expect(onChange).toHaveBeenCalledWith('hello');
  });
});
