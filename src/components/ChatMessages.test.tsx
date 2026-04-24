import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ChatMessages from './ChatMessages'
import type { Message } from './ChatMessages'

describe('ChatMessages', () => {
  it('shows welcome message when no messages', () => {
    render(<ChatMessages messages={[]} loading={false} />)

    expect(
      screen.getByText(/Hello! I'm here to help/i)
    ).toBeInTheDocument()
  })

  it('renders user message', () => {
    const messages: Message[] = [
      {
        role: 'user',
        content: 'Test message',
        timestamp: new Date('2024-01-01T10:00:00')
      }
    ]

    render(<ChatMessages messages={messages} loading={false} />)

    expect(screen.getByText('Test message')).toBeInTheDocument()
    expect(screen.getByText('YOU')).toBeInTheDocument()
  })

  it('renders assistant message', () => {
    const messages: Message[] = [
      {
        role: 'assistant',
        content: 'Assistant response',
        timestamp: new Date('2024-01-01T10:00:00')
      }
    ]

    render(<ChatMessages messages={messages} loading={false} />)

    expect(screen.getByText('Assistant response')).toBeInTheDocument()
    expect(screen.getByText('ASSISTANT')).toBeInTheDocument()
  })

  it('shows loading indicator for empty assistant message', () => {
    const messages: Message[] = [
      {
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }
    ]

    render(<ChatMessages messages={messages} loading={true} />)

    expect(screen.getByText('...')).toBeInTheDocument()
  })

  it('formats timestamp correctly', () => {
    const messages: Message[] = [
      {
        role: 'user',
        content: 'Test',
        timestamp: new Date('2024-01-01T14:30:00')
      }
    ]

    render(<ChatMessages messages={messages} loading={false} />)

    expect(screen.getByText(/2:30 PM/i)).toBeInTheDocument()
  })

  it('renders multiple messages', () => {
    const messages: Message[] = [
      {
        role: 'user',
        content: 'User message',
        timestamp: new Date()
      },
      {
        role: 'assistant',
        content: 'Assistant reply',
        timestamp: new Date()
      }
    ]

    render(<ChatMessages messages={messages} loading={false} />)

    expect(screen.getByText('User message')).toBeInTheDocument()
    expect(screen.getByText('Assistant reply')).toBeInTheDocument()
  })
})
