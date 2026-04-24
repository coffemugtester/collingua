interface ChatFooterProps {
  input: string
  loading: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

function ChatFooter({ input, loading, onInputChange, onSubmit }: ChatFooterProps) {
  return (
    <footer className="chat-footer">
      <form className="chat-input-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="chat-send-button"
          disabled={!input.trim() || loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </footer>
  )
}

export default ChatFooter
