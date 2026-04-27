import { describe, it, expect } from 'vitest';
import filterReducer, { setQuery } from '../../../src/features/search/filterSlice';

describe('filterSlice', () => {
  it('setQuery updates state.filter.query', () => {
    // Arrange
    const initial = filterReducer(undefined, { type: '@@INIT' });

    // Act
    const state = filterReducer(initial, setQuery('typescript'));

    // Assert
    expect(state.query).toBe('typescript');
  });
});
