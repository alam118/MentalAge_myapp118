/**
 * Quiz Type Definitions
 * Specific interfaces for the Quiz Engine, Questions, and Answers.
 */

export type QuizCategory = 
  | 'Lifestyle'
  | 'Humor'
  | 'Emotions'
  | 'Social behavior'
  | 'Decision making'
  | 'Habits'
  | 'Preferences';

export type TestType = 
  | 'mental-age' 
  | 'personality' 
  | 'iq-style' 
  | 'emotional' 
  | 'creativity';

export interface AnswerOption {
  id: string;
  text: string;
  weight: number;
}

export interface Question {
  id: string;
  category: QuizCategory;
  text: string;
  options: AnswerOption[];
}

export interface UserAnswer {
  questionId: string;
  optionId: string;
  category: QuizCategory;
  weight: number;
}

export interface QuizSession {
  id: string;
  testType: TestType;
  questions: Question[];
  answers: UserAnswer[];
  currentIndex: number;
  startTime: number;
  isComplete: boolean;
}
