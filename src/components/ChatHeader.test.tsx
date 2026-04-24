import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatHeader from './ChatHeader'

describe('ChatHeader', () => {
  it('renders title and subtitle', () => {
    render(
      <ChatHeader
        selectedModel="llama3.2"
        loading={false}
        onModelChange={vi.fn()}
      />
    )

    expect(screen.getByText('Conversation')).toBeInTheDocument()
    expect(screen.getByText('A thoughtful exchange')).toBeInTheDocument()
  })

  it('renders model selector with options', () => {
    render(
      <ChatHeader
        selectedModel="llama3.2"
        loading={false}
        onModelChange={vi.fn()}
      />
    )

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('llama3.2')
  })

  it('calls onModelChange when model selected', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <ChatHeader
        selectedModel="llama3.2"
        loading={false}
        onModelChange={handleChange}
      />
    )

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'mistral')

    expect(handleChange).toHaveBeenCalledWith('mistral')
  })

  it('disables selector when loading', () => {
    render(
      <ChatHeader
        selectedModel="llama3.2"
        loading={true}
        onModelChange={vi.fn()}
      />
    )

    expect(screen.getByRole('combobox')).toBeDisabled()
  })
})
