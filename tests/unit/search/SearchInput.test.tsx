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

  it('debounces onChange by 300ms', () => {
    // Arrange
    vi.useFakeTimers();
    const onChange = vi.fn();
    render(<SearchInput onChange={onChange} />);
    const input = screen.getByPlaceholderText('Search posts...');

    // Act
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.change(input, { target: { value: 'abc' } });

    // Assert — not called yet before 300ms
    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('abc');

    vi.useRealTimers();
  });

  it('calls onChange with input value', () => {
    // Arrange
    vi.useFakeTimers();
    const onChange = vi.fn();
    render(<SearchInput onChange={onChange} />);

    // Act
    fireEvent.change(screen.getByPlaceholderText('Search posts...'), {
      target: { value: 'hello' },
    });
    vi.advanceTimersByTime(300);

    // Assert
    expect(onChange).toHaveBeenCalledWith('hello');

    vi.useRealTimers();
  });
});
