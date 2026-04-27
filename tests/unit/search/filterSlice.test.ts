import { describe, it, expect } from 'vitest';
import filterReducer, { setQuery, setCategory } from '../../../src/features/search/filterSlice';

describe('filterSlice', () => {
  it('setCategory updates state.filter.category', () => {
    // Arrange
    const initial = filterReducer(undefined, { type: '@@INIT' });

    // Act
    const state = filterReducer(initial, setCategory('reactjs'));

    // Assert
    expect(state.category).toBe('reactjs');
  });

  it('setQuery updates state.filter.query', () => {
    // Arrange
    const initial = filterReducer(undefined, { type: '@@INIT' });

    // Act
    const state = filterReducer(initial, setQuery('typescript'));

    // Assert
    expect(state.query).toBe('typescript');
  });
});
