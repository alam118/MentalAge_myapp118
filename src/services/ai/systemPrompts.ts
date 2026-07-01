/**
 * AI System Prompts & Enforcement Rules
 * This file contains the instructions that guide the AI's personality, 
 * safety guardrails, and formatting requirements.
 */

import { AppLanguage } from '@/config/appConfig';
import { MentalAgeScoreResult } from '@/utils/calculations';

/**
 * CORE SYSTEM INSTRUCTIONS
 * These rules are injected into every AI request to ensure safety, 
 * tone, and non-medical compliance.
 */
export const SYSTEM_CORE_PROMPT = `
You are an expert AI Personality Analyst and Brain Archetype Profiler for a fun, premium "Mental Age Test" application.

ADHERE TO THESE RULES STRICTLY:
1. TONE: Professional, encouraging, insightful, and slightly playful.
2. SAFETY: Never provide medical or psychological diagnoses (e.g., "You have ADHD", "You are depressed"). 
3. COMPLIANCE: If asked about scientific accuracy, state that this is for entertainment purposes.
4. POSITIVITY: Even when discussing "weaknesses," frame them as "areas for growth" or "unique quirks."
5. PERSONALIZATION: Address the user by their name if provided.
6. FORMATTING: You MUST respond ONLY with a valid JSON object. No preamble, no conversational filler.
`;

/**
 * ANALYSIS PROMPT GENERATOR
 * Generates the specific user prompt based on their quiz performance and profile.
 */
export const generateAnalysisPrompt = (params: {
  userName: string;
  chronologicalAge: number;
  scoreData: MentalAgeScoreResult;
  language: AppLanguage;
  gender?: string;
}) => {
  const { userName, chronologicalAge, scoreData, language, gender } = params;

  return `
Analyze this user profile and provide a fun Mental Age Analysis:

USER DATA:
- Name: ${userName || 'User'}
- Real Age: ${chronologicalAge}
- Calculated Mental Age: ${scoreData.mentalAgeScore}
- Gender Context: ${gender || 'Not specified'}
- Analysis Language: ${language}

METRICS (0 to 1 scale):
${scoreData.categoryBreakdown
  .map((c) => `- ${c.category}: ${c.score01.toFixed(2)}`)
  .join('\n')}

REQUIRED JSON OUTPUT STRUCTURE:
{
  "personalitySummary": "A 2-3 sentence summary of their unique vibe.",
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "weaknesses": ["Growth Area 1", "Growth Area 2"],
  "thinkingStyle": "Description of how they process information.",
  "emotionalStyle": "Description of their emotional maturity/depth.",
  "advice": "1 friendly, motivational tip for their brain type.",
  "brainType": "A fun title (e.g., 'The Curious Explorer', 'The Wise Sage', 'The Playful Dreamer')"
}

IMPORTANT:
- Ensure the result is entirely in the ${language} language.
- Ensure the 'brainType' and 'personalitySummary' align with the Mental Age of ${scoreData.mentalAgeScore}.
`;
};

/**
 * ERROR FALLBACKS
 * Default results in case the AI service is unreachable or returns invalid data.
 */
export const DEFAULT_AI_RESULT = {
  personalitySummary: "You have a vibrant and balanced perspective on life, blending the curiosity of youth with the steady insight of experience.",
  strengths: ["Adaptability", "Open-mindedness", "Authentic expression"],
  weaknesses: ["Occasional overthinking", "Balancing play with focus"],
  thinkingStyle: "Balanced and intuitive, looking for patterns and meaning in everyday experiences.",
  emotionalStyle: "Stable and empathetic, showing a high capacity for understanding oneself and others.",
  advice: "Keep nurturing your curiosity; it's the secret to staying mentally agile and happy!",
  brainType: "The Balanced Harmonizer"
};
