import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '../../src/components/Modal'

describe('Modal', () => {
  it('has role "dialog"', () => {
    // Arrange & Act
    render(<Modal onClose={vi.fn()}>Content</Modal>)

    // Assert
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('has aria-modal "true"', () => {
    // Arrange & Act
    render(<Modal onClose={vi.fn()}>Content</Modal>)

    // Assert
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('close button calls onClose', async () => {
    // Arrange
    const onClose = vi.fn()
    render(<Modal onClose={onClose}>Content</Modal>)

    // Act
    await userEvent.click(screen.getByTestId('modal-close'))

    // Assert
    expect(onClose).toHaveBeenCalledOnce()
  })
})
