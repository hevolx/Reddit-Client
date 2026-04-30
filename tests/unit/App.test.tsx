import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../src/app/store'
import App from '../../src/App'

const renderApp = () => render(
  <Provider store={store}>
    <App />
  </Provider>
)

describe('App', () => {
  it('search input appears after header in DOM order', () => {
    // Act
    renderApp()

    // Assert
    const header = screen.getByRole('banner')
    const search = screen.getByRole('searchbox')

    expect(
      header.compareDocumentPosition(search) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })

  it('filter chips appear after search input in DOM order', () => {
    // Act
    renderApp()

    // Assert
    const search = screen.getByRole('searchbox')
    const chips = screen.getByTestId('filter-chips')

    expect(
      search.compareDocumentPosition(chips) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })
})
