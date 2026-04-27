import { describe, it, expect } from 'vitest';
import filterReducer, { setQuery, setCategory, clearFilter } from '../../../src/features/search/filterSlice';

describe('filterSlice', () => {
  it('clearFilter resets query to empty and category to null', () => {
    // Arrange
    const withData = filterReducer(
      filterReducer(filterReducer(undefined, { type: '@@INIT' }), setQuery('typescript')),
      setCategory('reactjs')
    );

    // Act
    const state = filterReducer(withData, clearFilter());

    // Assert
    expect(state.query).toBe('');
    expect(state.category).toBeNull();
  });

  it('setCategory updates state.category', () => {
    // Arrange
    const initial = filterReducer(undefined, { type: '@@INIT' });

    // Act
    const state = filterReducer(initial, setCategory('reactjs'));

    // Assert
    expect(state.category).toBe('reactjs');
  });

  it('setQuery updates state.query', () => {
    // Arrange
    const initial = filterReducer(undefined, { type: '@@INIT' });

    // Act
    const state = filterReducer(initial, setQuery('typescript'));

    // Assert
    expect(state.query).toBe('typescript');
  });
});
