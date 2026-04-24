export interface ParsedMessage {
  thinking: string[];
  response: string;
}

/**
 * Parses <think>...</think> tags from gpt-oss model responses
 * @param content The raw message content with potential thinking tags
 * @returns Object with thinking array and cleaned response
 */
export function parseThinking(content: string): ParsedMessage {
  const thinkingRegex = /<think>([\s\S]*?)<\/think>/g;
  const thinking: string[] = [];
  let match;

  // Extract all thinking blocks
  while ((match = thinkingRegex.exec(content)) !== null) {
    thinking.push(match[1].trim());
  }

  // Remove thinking tags from response
  const response = content.replace(thinkingRegex, '').trim();

  return {
    thinking,
    response,
  };
}
