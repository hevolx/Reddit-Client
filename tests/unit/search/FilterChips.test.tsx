import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterChips } from '../../../src/features/search/FilterChips';

const categories = [
  { id: 'reactjs', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
];

describe('FilterChips', () => {
  it('clicking inactive chip calls onSelect with category id', () => {
    // Arrange
    const onSelect = vi.fn();
    render(<FilterChips categories={categories} activeId="typescript" onSelect={onSelect} />);

    // Act
    fireEvent.click(screen.getByText('React'));

    // Assert
    expect(onSelect).toHaveBeenCalledWith('reactjs');
  });

  it('active chip has aria-pressed "true"', () => {
    // Arrange & Act
    render(<FilterChips categories={categories} activeId="typescript" onSelect={() => { }} />);

    // Assert
    expect(screen.getByText('TypeScript')).toHaveAttribute('aria-pressed', 'true');
  });

  it('inactive chip has aria-pressed "false"', () => {
    // Arrange & Act
    render(<FilterChips categories={categories} activeId="typescript" onSelect={() => { }} />);

    // Assert
    expect(screen.getByText('React')).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders one chip per category in props', () => {
    // Arrange & Act
    render(<FilterChips categories={categories} activeId={null} onSelect={() => { }} />);

    // Assert
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });
});
