/**
 * IQ Style Quiz Questions
 * Focused on logic, pattern recognition, and problem-solving styles.
 */

import { Question } from '@/types';

export const iqStyleQuestions: Question[] = [
  {
    id: 'iq_1',
    category: 'Decision making',
    text: 'A complex problem arises. What is your first step?',
    options: [
      { id: 'iq_1_a', text: 'Dive in and try things out', weight: 1 },
      { id: 'iq_1_b', text: 'Break it into smaller, logical parts', weight: 3 },
      { id: 'iq_1_c', text: 'Look for a similar problem solved before', weight: 5 }
    ]
  },
  {
    id: 'iq_2',
    category: 'Habits',
    text: 'Which of these best describes your workspace?',
    options: [
      { id: 'iq_2_a', text: 'Creative chaos', weight: 1 },
      { id: 'iq_2_b', text: 'Organized with some personal touches', weight: 3 },
      { id: 'iq_2_c', text: 'Strictly minimal and structured', weight: 5 }
    ]
  },
  {
    id: 'iq_3',
    category: 'Preferences',
    text: 'Which type of puzzle do you enjoy most?',
    options: [
      { id: 'iq_3_a', text: 'Jigsaw puzzles or Visual games', weight: 1 },
      { id: 'iq_3_b', text: 'Crosswords or Word games', weight: 3 },
      { id: 'iq_3_c', text: 'Sudoku or Math riddles', weight: 5 }
    ]
  }
];
