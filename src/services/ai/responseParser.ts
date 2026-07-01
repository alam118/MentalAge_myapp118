/**
 * AI Response Parser
 * Robust utility to clean and validate JSON strings returned by LLMs.
 */

import { AIAnalysis } from '@/types';

export const responseParser = {
  /**
   * Cleans potential Markdown and conversational noise from the AI response.
   */
  parseAnalysis(rawResponse: string): AIAnalysis | null {
    try {
      // 1. Strip Markdown Code Blocks
      let clean = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();

      // 2. Find the first '{' and last '}' to isolate JSON
      const firstBrace = clean.indexOf('{');
      const lastBrace = clean.lastIndexOf('}');

      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error('No JSON object found in response');
      }

      clean = clean.substring(firstBrace, lastBrace + 1);

      // 3. Parse JSON
      const parsed = JSON.parse(clean);

      // 4. Validate Schema (Basic checks)
      if (!parsed.brainType || !parsed.personalitySummary || !Array.isArray(parsed.strengths)) {
        throw new Error('JSON response missing required analysis fields');
      }

      return parsed as AIAnalysis;
    } catch (error) {
      console.error('Failed to parse AI response:', error, 'Raw data:', rawResponse);
      return null;
    }
  }
};
