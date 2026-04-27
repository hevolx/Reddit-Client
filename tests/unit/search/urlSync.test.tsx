import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createElement } from 'react';
import filterReducer, { setQuery, setCategory } from '../../../src/features/search/filterSlice';
import { useUrlSync } from '../../../src/features/search/useUrlSync';

function makeStore() {
  return configureStore({ reducer: { filter: filterReducer } });
}

describe('useUrlSync', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('updates URL when category changes', () => {
    // Arrange
    const store = makeStore();
    const storeWrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(Provider, { store, children });
    renderHook(() => useUrlSync(), { wrapper: storeWrapper });

    // Act
    act(() => {
      store.dispatch(setCategory('reactjs'));
    });

    // Assert
    expect(window.location.search).toContain('subreddit=reactjs');
  });

  it('reads ?subreddit= param into state on mount', () => {
    // Arrange
    window.history.replaceState({}, '', '/?subreddit=reactjs');
    const store = makeStore();
    const storeWrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(Provider, { store, children });

    // Act
    renderHook(() => useUrlSync(), { wrapper: storeWrapper });

    // Assert
    expect(store.getState().filter.category).toBe('reactjs');
  });

  it('updates URL when query changes', () => {
    // Arrange
    const store = makeStore();
    const storeWrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(Provider, { store, children });
    renderHook(() => useUrlSync(), { wrapper: storeWrapper });

    // Act
    act(() => {
      store.dispatch(setQuery('typescript'));
    });

    // Assert
    expect(window.location.search).toBe('?q=typescript');
  });

  it('reads ?q= param into state on mount', () => {
    // Arrange
    window.history.replaceState({}, '', '/?q=redux');
    const store = makeStore();
    const storeWrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(Provider, { store, children });

    // Act
    renderHook(() => useUrlSync(), { wrapper: storeWrapper });

    // Assert
    expect(store.getState().filter.query).toBe('redux');
  });
});
