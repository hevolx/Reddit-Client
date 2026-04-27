import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FilterChips } from '../../../src/features/search/FilterChips';

const categories = [
  { id: 'reactjs', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
];

describe('FilterChips', () => {
  it('renders one chip per category in props', () => {
    // Arrange & Act
    render(<FilterChips categories={categories} activeId={null} onSelect={() => {}} />);

    // Assert
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });
});
