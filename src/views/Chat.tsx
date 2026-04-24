import { useState, useEffect, useRef } from 'react'
import { Ollama } from 'ollama/browser'
import { DEFAULT_MODEL } from '../ollamaConfig'
import ChatHeader from '../components/ChatHeader'
import ChatMessages, { type Message } from '../components/ChatMessages'
import ChatFooter from '../components/ChatFooter'
import { usePreferences } from '../hooks/usePreferences'
import './Chat.css'

function Chat() {
  const [input, setInput] = useState('')
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { preferences, setThinkIntensity, setShowThinking } = usePreferences()

  // Use native ollama client for thinking support
  const ollamaRef = useRef(new Ollama({ host: 'http://127.0.0.1:11434' }))

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    setLoading(true)

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])

    // Add placeholder for assistant message
    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, assistantMessage])

    // Clear input
    setInput('')

    // Send to Ollama with thinking support
    try {
      const thinkingArray: string[] = []
      let contentText = ''
      let currentThinking = ''

      const stream = await ollamaRef.current.chat({
        model: selectedModel,
        messages: [
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: userMessage.content }
        ],
        stream: true,
        // Pass think parameter at top level for GPT-OSS
        ...(preferences.thinkIntensity !== 'off' && { think: preferences.thinkIntensity })
      })

      for await (const chunk of stream) {
        // Accumulate thinking if present
        if (chunk.message.thinking) {
          currentThinking += chunk.message.thinking
        }

        // Accumulate content if present
        if (chunk.message.content) {
          // If we were in thinking mode and now have content, save the thinking
          if (currentThinking && thinkingArray.length === 0) {
            thinkingArray.push(currentThinking)
          }
          contentText += chunk.message.content
        }

        // Update the message in real-time
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: contentText,
            thinking: thinkingArray.length > 0 ? thinkingArray : undefined,
            response: thinkingArray.length > 0 ? contentText : undefined
          }
          return updated
        })
      }

      setLoading(false)
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1].content = 'Sorry, there was an error communicating with Ollama. Please make sure Ollama is running on http://127.0.0.1:11434'
        return updated
      })
      setLoading(false)
    }
  }

  return (
    <div className="chat-container">
      <ChatHeader
        selectedModel={selectedModel}
        loading={loading}
        onModelChange={setSelectedModel}
        thinkIntensity={preferences.thinkIntensity}
        showThinking={preferences.showThinking}
        onThinkIntensityChange={setThinkIntensity}
        onShowThinkingChange={setShowThinking}
      />

      <ChatMessages
        messages={messages}
        loading={loading}
        showThinking={preferences.showThinking}
        ref={messagesEndRef}
      />

      <ChatFooter
        input={input}
        loading={loading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Chat
