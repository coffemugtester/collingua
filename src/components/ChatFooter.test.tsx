import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatFooter from './ChatFooter'

describe('ChatFooter', () => {
  it('renders input and button', () => {
    render(
      <ChatFooter
        input=""
        loading={false}
        onInputChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    )

    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('calls onInputChange when typing', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <ChatFooter
        input=""
        loading={false}
        onInputChange={handleChange}
        onSubmit={vi.fn()}
      />
    )

    const input = screen.getByPlaceholderText('Type your message...')
    await user.type(input, 'H')

    expect(handleChange).toHaveBeenCalled()
  })

  it('calls onSubmit when form submitted', async () => {
    const handleSubmit = vi.fn((e) => e.preventDefault())
    const user = userEvent.setup()

    render(
      <ChatFooter
        input="Test message"
        loading={false}
        onInputChange={vi.fn()}
        onSubmit={handleSubmit}
      />
    )

    const button = screen.getByRole('button', { name: /send/i })
    await user.click(button)

    expect(handleSubmit).toHaveBeenCalled()
  })

  it('disables input when loading', () => {
    render(
      <ChatFooter
        input=""
        loading={true}
        onInputChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    )

    expect(screen.getByPlaceholderText('Type your message...')).toBeDisabled()
  })

  it('disables button when loading', () => {
    render(
      <ChatFooter
        input="Test"
        loading={true}
        onInputChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('disables button when input empty', () => {
    render(
      <ChatFooter
        input=""
        loading={false}
        onInputChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('disables button when input only whitespace', () => {
    render(
      <ChatFooter
        input="   "
        loading={false}
        onInputChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows "Sending..." when loading', () => {
    render(
      <ChatFooter
        input="Test"
        loading={true}
        onInputChange={vi.fn()}
        onSubmit={vi.fn()}
      />
    )

    expect(screen.getByText('Sending...')).toBeInTheDocument()
  })
})
