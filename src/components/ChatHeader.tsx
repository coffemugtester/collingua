import { AVAILABLE_MODELS } from '../ollamaConfig'
import { type ThinkIntensity } from '../hooks/usePreferences'

interface ChatHeaderProps {
  selectedModel: string
  loading: boolean
  onModelChange: (model: string) => void
  thinkIntensity?: ThinkIntensity
  showThinking?: boolean
  onThinkIntensityChange?: (intensity: ThinkIntensity) => void
  onShowThinkingChange?: (show: boolean) => void
}

function ChatHeader({
  selectedModel,
  loading,
  onModelChange,
  thinkIntensity,
  showThinking,
  onThinkIntensityChange,
  onShowThinkingChange
}: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <div className="chat-header-content">
        <div className="chat-header-top">
          <div>
            <h1 className="chat-title">Conversation</h1>
            <p className="chat-subtitle">A thoughtful exchange</p>
          </div>
          <div className="chat-controls">
            <select
              className="model-selector"
              value={selectedModel}
              onChange={(e) => onModelChange(e.target.value)}
              disabled={loading}
            >
              {AVAILABLE_MODELS.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>

            {thinkIntensity !== undefined && onThinkIntensityChange && (
              <select
                className="think-intensity-selector"
                value={thinkIntensity}
                onChange={(e) => onThinkIntensityChange(e.target.value as ThinkIntensity)}
                disabled={loading}
                title="Think intensity"
              >
                <option value="off">No thinking</option>
                <option value="low">Low thinking</option>
                <option value="medium">Medium thinking</option>
                <option value="high">High thinking</option>
              </select>
            )}

            {showThinking !== undefined && onShowThinkingChange && (
              <label className="show-thinking-toggle" title="Show/hide thinking process">
                <input
                  type="checkbox"
                  checked={showThinking}
                  onChange={(e) => onShowThinkingChange(e.target.checked)}
                  disabled={loading}
                />
                <span>Show thinking</span>
              </label>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default ChatHeader
