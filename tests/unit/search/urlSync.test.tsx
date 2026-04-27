import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createElement } from 'react';
import filterReducer from '../../../src/features/search/filterSlice';
import { useUrlSync } from '../../../src/features/search/useUrlSync';

function makeStore() {
  return configureStore({ reducer: { filter: filterReducer } });
}

function wrapper({ children }: { children: React.ReactNode }) {
  return createElement(Provider, { store: makeStore() }, children);
}

describe('useUrlSync', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('reads ?q= param into state on mount', () => {
    // Arrange
    window.history.replaceState({}, '', '/?q=redux');
    const store = makeStore();
    const storeWrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(Provider, { store }, children);

    // Act
    renderHook(() => useUrlSync(), { wrapper: storeWrapper });

    // Assert
    expect(store.getState().filter.query).toBe('redux');
  });
});
