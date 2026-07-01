/**
 * Quiz Context
 * The primary state machine for active quiz sessions.
 * Manages question flow, user input, timer logic, and the transition to AI analysis.
 */

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { QuizSession, quizEngine } from '@/services/quiz/quizEngine';
import { TestType } from '@/services/quiz/questionService';
import { MentalAgeScoreResult } from '@/utils/calculations';
import { AIAnalysis, TestResult } from '@/types';
import { aiAnalyzer } from '@/services/ai/aiAnalyzer';
import { resultsService } from '@/services/storage/resultsService';
import { useUser } from './UserContext';
import { useLanguage } from './LanguageContext';

interface QuizContextType {
  session: QuizSession | null;
  isAnalyzing: boolean;
  analysisError: string | null;
  startNewQuiz: (testType: TestType, count?: number) => void;
  selectOption: (optionId: string) => void;
  goNext: () => void;
  goBack: () => void;
  finalizeAndAnalyze: () => Promise<TestResult | null>;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, addResult } = useUser();
  const { language } = useLanguage();
  
  const [session, setSession] = useState<QuizSession | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  /**
   * Initializes a fresh quiz session
   */
  const startNewQuiz = useCallback((testType: TestType, count: number = 20) => {
    setAnalysisError(null);
    const newSession = quizEngine.startQuiz({ testType, questionCount: count });
    setSession(newSession);
  }, []);

  /**
   * Handles selecting an answer for the current question
   */
  const selectOption = useCallback((optionId: string) => {
    if (!session) return;
    const updatedSession = quizEngine.answerQuestion(session, optionId);
    setSession(updatedSession);
  }, [session]);

  /**
   * Advances to next question or marks session as completed
   */
  const goNext = useCallback(() => {
    if (!session) return;
    const updatedSession = quizEngine.nextQuestion(session);
    setSession(updatedSession);
  }, [session]);

  /**
   * Navigates to previous question
   */
  const goBack = useCallback(() => {
    if (!session) return;
    const updatedSession = quizEngine.previousQuestion(session);
    setSession(updatedSession);
  }, [session]);

  /**
   * Finalizes quiz weights and triggers the AI Personality Analysis
   */
  const finalizeAndAnalyze = async (): Promise<TestResult | null> => {
    if (!session || !user) return null;

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      // 1. Calculate raw mental age score from weights
      const scoreData: MentalAgeScoreResult = quizEngine.finalizeQuiz(session);

      // 2. Call AI Service for personalized analysis
      const analysis: AIAnalysis = await aiAnalyzer.analyzeMentalAge({
        userName: user.name,
        chronologicalAge: user.age,
        scoreData: scoreData,
        language: language,
        gender: user.gender,
      });

      // 3. Save the combined result to LocalStorage
      const savedResult = resultsService.saveResult({
        userId: user.id,
        testType: session.testType,
        mentalAgeScore: scoreData.mentalAgeScore,
        chronologicalAge: user.age,
        answers: session.answers,
        aiAnalysis: analysis,
      });

      // 4. Update Global User State
      addResult(savedResult);

      return savedResult;
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Analysis failed';
      setAnalysisError(msg);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Clears current quiz state
   */
  const resetQuiz = useCallback(() => {
    setSession(null);
    setIsAnalyzing(false);
    setAnalysisError(null);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        session,
        isAnalyzing,
        analysisError,
        startNewQuiz,
        selectOption,
        goNext,
        goBack,
        finalizeAndAnalyze,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
