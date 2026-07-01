/**
 * AI Prompt Builder
 * Constructs the contextual data package sent to the AI.
 * Ensures the AI understands the user's background and quiz performance.
 */

import { MentalAgeScoreResult } from '@/utils/calculations';
import { AppLanguage } from '@/config/appConfig';

export const promptBuilder = {
  /**
   * Builds the primary analysis prompt.
   * Compiles user metadata and score breakdown into a descriptive string.
   */
  buildAnalysisPrompt(params: {
    userName: string;
    chronologicalAge: number;
    scoreData: MentalAgeScoreResult;
    language: AppLanguage;
    gender?: string;
  }): string {
    const { userName, chronologicalAge, scoreData, language, gender } = params;

    // Convert category scores into a readable format for the LLM
    const metricSummary = scoreData.categoryBreakdown
      .map((c) => {
        const level = c.score01 > 0.7 ? 'High' : c.score01 < 0.3 ? 'Low' : 'Moderate';
        return `- ${c.category}: ${level} (${Math.round(c.score01 * 100)}%)`;
      })
      .join('\n');

    return `
      Analyze the following user profile for a "Mental Age & Personality Test".
      
      USER CONTEXT:
      - Name: ${userName}
      - Actual Age: ${chronologicalAge}
      - Calculated Mental Age: ${scoreData.mentalAgeScore}
      - Gender: ${gender || 'Not specified'}
      - Output Language: ${language}

      PERFORMANCE METRICS:
      ${metricSummary}

      STRICT OUTPUT INSTRUCTIONS:
      1. Provide a personalitySummary (2-3 sentences).
      2. List 3 strengths and 2 growth areas (weaknesses).
      3. Describe their thinkingStyle and emotionalStyle.
      4. Assign a fun brainType (e.g., "The Digital Nomad", "The Old Soul").
      5. Add a motivational piece of advice.
      6. Use ONLY the ${language} language.
      7. Return result in JSON format only.
    `;
  }
};
