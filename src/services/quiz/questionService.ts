/**
 * Question Service
 * Manages quiz question retrieval, filtering, and shuffling.
 * Questions are loaded based on test type and user's language preference.
 */

import { Question, QuizCategory } from '@/types';
import { shuffleArray } from '@/utils/helpers';
import { appConfig } from '@/config/appConfig';

// Import question data (these files will be created later)
import { mentalAgeQuestions } from '@/data/questions/mentalAgeQuestions';
import { personalityQuestions } from '@/data/questions/personalityQuestions';
import { iqStyleQuestions } from '@/data/questions/iqStyleQuestions';
import { emotionalQuestions } from '@/data/questions/emotionalQuestions';
import { creativityQuestions } from '@/data/questions/creativityQuestions';

export type TestType = 'mental-age' | 'personality' | 'iq-style' | 'emotional' | 'creativity';

/**
 * Question Database Registry
 */
const QUESTION_DATABASE: Record<TestType, Question[]> = {
  'mental-age': mentalAgeQuestions,
  'personality': personalityQuestions,
  'iq-style': iqStyleQuestions,
  'emotional': emotionalQuestions,
  'creativity': creativityQuestions,
};

export const questionService = {
  /**
   * Gets questions for a specific test type.
   * Returns a shuffled subset to ensure variety across different sessions.
   */
  getQuestionsForTest(params: {
    testType: TestType;
    count?: number;
    shuffle?: boolean;
    filterByCategory?: QuizCategory;
  }): Question[] {
    const {
      testType,
      count = appConfig.quiz.defaultQuestionCount,
      shuffle = true,
      filterByCategory,
    } = params;

    let questions = QUESTION_DATABASE[testType] || [];

    // Filter by category if specified
    if (filterByCategory) {
      questions = questions.filter((q) => q.category === filterByCategory);
    }

    // Shuffle for variety
    if (shuffle) {
      questions = shuffleArray(questions);
    }

    // Return requested count
    return questions.slice(0, count);
  },

  /**
   * Gets a single random question (useful for "Quick Quiz" features).
   */
  getRandomQuestion(testType: TestType): Question | null {
    const questions = QUESTION_DATABASE[testType];
    if (!questions || questions.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  },

  /**
   * Returns the total number of questions available for a test type.
   */
  getQuestionCount(testType: TestType): number {
    return QUESTION_DATABASE[testType]?.length || 0;
  },

  /**
   * Returns all categories covered in a specific test.
   */
  getCategoriesForTest(testType: TestType): QuizCategory[] {
    const questions = QUESTION_DATABASE[testType] || [];
    const uniqueCategories = new Set<QuizCategory>();

    questions.forEach((q) => uniqueCategories.add(q.category));

    return Array.from(uniqueCategories);
  },

  /**
   * Validates that a question has proper structure.
   * Used during development to catch malformed question data.
   */
  validateQuestion(question: Question): boolean {
    return (
      !!question.id &&
      !!question.text &&
      !!question.category &&
      Array.isArray(question.options) &&
      question.options.length >= 2 &&
      question.options.every((opt) => !!opt.id && !!opt.text && typeof opt.weight === 'number')
    );
  },

  /**
   * Returns a balanced set of questions ensuring all categories are represented.
   */
  getBalancedQuestions(params: {
    testType: TestType;
    totalCount?: number;
  }): Question[] {
    const { testType, totalCount = appConfig.quiz.defaultQuestionCount } = params;

    const allQuestions = QUESTION_DATABASE[testType] || [];
    const categories = this.getCategoriesForTest(testType);

    if (categories.length === 0) return [];

    const questionsPerCategory = Math.ceil(totalCount / categories.length);
    const balanced: Question[] = [];

    // Get equal representation from each category
    categories.forEach((category) => {
      const categoryQuestions = allQuestions.filter((q) => q.category === category);
      const shuffled = shuffleArray(categoryQuestions);
      balanced.push(...shuffled.slice(0, questionsPerCategory));
    });

    // Shuffle the final set and trim to exact count
    return shuffleArray(balanced).slice(0, totalCount);
  }
};
