import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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
})
