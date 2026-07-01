/**
 * AI Analysis Orchestrator
 * High-level service that coordinates between quiz scores and the AI engine.
 */

import { openRouterService, AIServiceError } from './openRouterService';
import { generateAnalysisPrompt, DEFAULT_AI_RESULT } from './systemPrompts';
import { MentalAgeScoreResult } from '@/utils/calculations';
import { AIAnalysis } from '@/types';
import { AppLanguage } from '@/config/appConfig';
import { sleep } from '@/utils/helpers';

export const aiAnalyzer = {
  /**
   * Orchestrates the complete AI analysis process.
   * 1. Prepares the prompt
   * 2. Calls the AI Service
   * 3. Handles fallbacks and delays for UX
   */
  async analyzeMentalAge(params: {
    userName: string;
    chronologicalAge: number;
    scoreData: MentalAgeScoreResult;
    language: AppLanguage;
    gender?: string;
  }): Promise<AIAnalysis> {
    const { userName, chronologicalAge, scoreData, language, gender } = params;

    // Build the specific prompt for this user
    const prompt = generateAnalysisPrompt({
      userName,
      chronologicalAge,
      scoreData,
      language,
      gender,
    });

    try {
      // Step 1: Add a small artificial delay to simulate "AI Thinking" 
      // This improves perceived value and allows the UI to show particle animations.
      const startTime = Date.now();
      
      // Step 2: Request analysis from OpenRouter
      const analysis = await openRouterService.generateAnalysis(prompt);

      // Step 3: Ensure the "Thinking" state lasts at least 2 seconds for smooth UI
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 2000) {
        await sleep(2000 - elapsedTime);
      }

      return analysis;

    } catch (error) {
      console.error('AI Analysis Failed:', error);

      // SAFETY FALLBACK:
      // If the AI service is down, rate-limited, or returns invalid data, 
      // we provide a high-quality default result based on the score. 
      // The user experience never breaks.
      
      await sleep(1500); // Still show thinking time for the fallback
      
      // In a real production app, you might have multiple fallbacks 
      // based on whether the score is "High" or "Low".
      return {
        ...DEFAULT_AI_RESULT,
        brainType: this.getBrainTypeFromScore(scoreData.mentalAgeScore)
      };
    }
  },

  /**
   * Helper to provide a consistent Brain Type title for fallback scenarios.
   */
  getBrainTypeFromScore(score: number): string {
    if (score < 18) return "The Boundless Dreamer";
    if (score < 25) return "The Spirited Adventurer";
    if (score < 35) return "The Mindful Modernist";
    if (score < 45) return "The Wise Architect";
    return "The Timeless Sage";
  }
};
