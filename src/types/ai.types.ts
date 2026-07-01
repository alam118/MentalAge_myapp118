/**
 * AI Service Type Definitions
 * Specific types for OpenRouter requests and responses.
 */

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIRequestPayload {
  model: string;
  messages: AIMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
}

export interface AIResponseChoice {
  message: {
    content: string;
    role: string;
  };
  finish_reason: string;
}

export interface AIResponse {
  id: string;
  choices: AIResponseChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
