/**
 * Emotional Maturity Quiz Questions
 * Focused on EQ, empathy, and self-regulation.
 */

import { Question } from '@/types';

export const emotionalQuestions: Question[] = [
  {
    id: 'eq_1',
    category: 'Emotions',
    text: 'When someone criticizes your work, how do you feel?',
    options: [
      { id: 'eq_1_a', text: 'Defensive or personally hurt', weight: 1 },
      { id: 'eq_1_b', text: 'Annoyed but I listen anyway', weight: 3 },
      { id: 'eq_1_c', text: 'Calmly analyze if the feedback is valid', weight: 5 }
    ]
  },
  {
    id: 'eq_2',
    category: 'Social behavior',
    text: 'How do you react when a friend cancels plans last minute?',
    options: [
      { id: 'eq_2_a', text: 'I get upset and show it', weight: 1 },
      { id: 'eq_2_b', text: 'I feel let down but say it is fine', weight: 3 },
      { id: 'eq_2_c', text: 'I use the extra time for myself happily', weight: 5 }
    ]
  },
  {
    id: 'eq_3',
    category: 'Decision making',
    text: 'Do you trust your "gut feeling" or "logic" more?',
    options: [
      { id: 'eq_3_a', text: 'Always my gut', weight: 1 },
      { id: 'eq_3_b', text: 'A mix of both', weight: 3 },
      { id: 'eq_3_c', text: 'Strictly logic and facts', weight: 5 }
    ]
  }
];
