import { forwardRef } from 'react'

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  thinking?: string[]
  response?: string
}

interface ChatMessagesProps {
  messages: Message[]
  loading: boolean
  showThinking?: boolean
}

const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ messages, loading, showThinking = true }, ref) => {
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }

    return (
      <main className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <p>Hello! I'm here to help. What would you like to talk about today?</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`message-container ${msg.role}`}>
            <div className="message-meta">
              <span className="message-sender">
                {msg.role === 'user' ? 'YOU' : 'ASSISTANT'}
              </span>
              <span className="message-time">{formatTime(msg.timestamp)}</span>
            </div>
            <div className={`message-bubble ${msg.role}`}>
              {msg.thinking && msg.thinking.length > 0 && showThinking && (
                <details className="thinking-section">
                  <summary className="thinking-summary">Thinking...</summary>
                  <div className="thinking-content">
                    {msg.thinking.map((thought, i) => (
                      <p key={i}>{thought}</p>
                    ))}
                  </div>
                </details>
              )}
              <p>{msg.response || msg.content || (loading && idx === messages.length - 1 ? '...' : '')}</p>
            </div>
          </div>
        ))}

        <div ref={ref} />
      </main>
    )
  }
)

ChatMessages.displayName = 'ChatMessages'

export default ChatMessages
