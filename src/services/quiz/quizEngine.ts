/**
 * Quiz Engine
 * Orchestrates the entire quiz flow: question management, answer tracking,
 * progress calculation, and score preparation for AI analysis.
 */

import { Question, UserAnswer, TestResult } from '@/types';
import { questionService, TestType } from './questionService';
import { computeMentalAgeScore, MentalAgeScoreResult } from '@/utils/calculations';
import { generateId } from '@/utils/helpers';

export interface QuizSession {
  id: string;
  testType: TestType;
  questions: Question[];
  answers: UserAnswer[];
  currentIndex: number;
  startedAt: number;
  isCompleted: boolean;
}

export const quizEngine = {
  /**
   * Initializes a new quiz session.
   */
  startQuiz(params: {
    testType: TestType;
    questionCount?: number;
    useBalanced?: boolean;
  }): QuizSession {
    const { testType, questionCount = 20, useBalanced = true } = params;

    const questions = useBalanced
      ? questionService.getBalancedQuestions({ testType, totalCount: questionCount })
      : questionService.getQuestionsForTest({ testType, count: questionCount });

    return {
      id: generateId(),
      testType,
      questions,
      answers: [],
      currentIndex: 0,
      startedAt: Date.now(),
      isCompleted: false,
    };
  },

  /**
   * Records a user's answer to the current question.
   */
  answerQuestion(session: QuizSession, optionId: string): QuizSession {
    const currentQuestion = session.questions[session.currentIndex];
    
    if (!currentQuestion) {
      console.error('No question found at current index');
      return session;
    }

    const selectedOption = currentQuestion.options.find((opt) => opt.id === optionId);

    if (!selectedOption) {
      console.error('Invalid option ID provided');
      return session;
    }

    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      optionId: selectedOption.id,
      category: currentQuestion.category,
      weight: selectedOption.weight,
    };

    // Remove any previous answer for this question (in case user navigates back)
    const filteredAnswers = session.answers.filter(
      (a) => a.questionId !== currentQuestion.id
    );

    return {
      ...session,
      answers: [...filteredAnswers, answer],
    };
  },

  /**
   * Moves to the next question.
   */
  nextQuestion(session: QuizSession): QuizSession {
    const nextIndex = session.currentIndex + 1;
    const isCompleted = nextIndex >= session.questions.length;

    return {
      ...session,
      currentIndex: nextIndex,
      isCompleted,
    };
  },

  /**
   * Moves to the previous question.
   */
  previousQuestion(session: QuizSession): QuizSession {
    return {
      ...session,
      currentIndex: Math.max(0, session.currentIndex - 1),
    };
  },

  /**
   * Jumps to a specific question index.
   */
  goToQuestion(session: QuizSession, index: number): QuizSession {
    return {
      ...session,
      currentIndex: Math.max(0, Math.min(index, session.questions.length - 1)),
    };
  },

  /**
   * Returns the current question object.
   */
  getCurrentQuestion(session: QuizSession): Question | null {
    return session.questions[session.currentIndex] || null;
  },

  /**
   * Calculates quiz progress as a percentage.
   */
  getProgress(session: QuizSession): number {
    if (session.questions.length === 0) return 0;
    return Math.round((session.answers.length / session.questions.length) * 100);
  },

  /**
   * Checks if the user has answered the current question.
   */
  hasAnsweredCurrent(session: QuizSession): boolean {
    const currentQuestion = this.getCurrentQuestion(session);
    if (!currentQuestion) return false;

    return session.answers.some((a) => a.questionId === currentQuestion.id);
  },

  /**
   * Gets the user's selected option for the current question (if any).
   */
  getCurrentAnswer(session: QuizSession): string | null {
    const currentQuestion = this.getCurrentQuestion(session);
    if (!currentQuestion) return null;

    const answer = session.answers.find((a) => a.questionId === currentQuestion.id);
    return answer?.optionId || null;
  },

  /**
   * Validates if the quiz is ready for completion.
   */
  canComplete(session: QuizSession): boolean {
    return session.answers.length === session.questions.length;
  },

  /**
   * Finalizes the quiz and computes the mental age score.
   */
  finalizeQuiz(session: QuizSession): MentalAgeScoreResult {
    return computeMentalAgeScore({
      answers: session.answers,
      totalQuestions: session.questions.length,
    });
  },

  /**
   * Calculates the time spent on the quiz (in seconds).
   */
  getTimeSpent(session: QuizSession): number {
    return Math.floor((Date.now() - session.startedAt) / 1000);
  },

  /**
   * Generates a session summary for storage/debugging.
   */
  getSessionSummary(session: QuizSession) {
    return {
      id: session.id,
      testType: session.testType,
      totalQuestions: session.questions.length,
      answeredCount: session.answers.length,
      progress: this.getProgress(session),
      timeSpent: this.getTimeSpent(session),
      isCompleted: session.isCompleted,
    };
  }
};
