import Anthropic from '@anthropic-ai/sdk';

let client = null;

function getClient() {
  if (!client) {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('VITE_ANTHROPIC_API_KEY is not set. Add it to your .env file.');
    }
    client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
  }
  return client;
}

/**
 * Send a message to Claude and stream the response.
 * @param {Array} messages - Anthropic message format array
 * @param {string} systemPrompt - System prompt string
 * @param {function} onDelta - Called with each text delta
 * @returns {Promise<string>} - Full response text
 */
export async function streamChat(messages, systemPrompt, onDelta) {
  const c = getClient();
  let fullText = '';

  const stream = await c.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 2048,
    system: systemPrompt,
    messages,
  });

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      fullText += event.delta.text;
      onDelta(event.delta.text);
    }
  }

  return fullText;
}

/**
 * Parse a recommendation JSON block from the assistant response text.
 * Returns null if no recommendation block found.
 */
export function parseRecommendation(text) {
  const match = text.match(/```json\s*([\s\S]*?)```/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[1]);
    if (parsed.type === 'recommendation') return parsed;
    return null;
  } catch {
    return null;
  }
}
