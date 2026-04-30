import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '../../src/components/Modal'

describe('Modal', () => {
  it('has role "dialog"', () => {
    // Arrange & Act
    render(<Modal onClose={vi.fn()} label="Test modal">Content</Modal>)

    // Assert
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('has aria-modal "true"', () => {
    // Arrange & Act
    render(<Modal onClose={vi.fn()} label="Test modal">Content</Modal>)

    // Assert
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('close button calls onClose', async () => {
    // Arrange
    const onClose = vi.fn()
    render(<Modal onClose={onClose} label="Test modal">Content</Modal>)

    // Act
    await userEvent.click(screen.getByTestId('modal-close'))

    // Assert
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('ESC key calls onClose', async () => {
    // Arrange
    const onClose = vi.fn()
    render(<Modal onClose={onClose} label="Test modal">Content</Modal>)

    // Act
    await userEvent.keyboard('{Escape}')

    // Assert
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('backdrop click calls onClose', async () => {
    // Arrange
    const onClose = vi.fn()
    render(<Modal onClose={onClose} label="Test modal">Content</Modal>)

    // Act
    await userEvent.click(screen.getByTestId('modal-backdrop'))

    // Assert
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('click inside content does not call onClose', async () => {
    // Arrange
    const onClose = vi.fn()
    render(<Modal onClose={onClose} label="Test modal">Content</Modal>)

    // Act
    await userEvent.click(screen.getByRole('dialog'))

    // Assert
    expect(onClose).not.toHaveBeenCalled()
  })

  it('sets focus on first focusable element on open', () => {
    // Arrange & Act
    render(<Modal onClose={vi.fn()} label="Test modal">Content</Modal>)

    // Assert
    expect(screen.getByTestId('modal-close')).toHaveFocus()
  })
})
