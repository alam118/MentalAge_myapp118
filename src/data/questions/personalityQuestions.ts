/**
 * Personality Quiz Questions
 * Focused on discovering inner character archetypes.
 */

import { Question } from '@/types';

export const personalityQuestions: Question[] = [
  {
    id: 'pq_1',
    category: 'Emotions',
    text: 'A friend is crying. What is your first instinct?',
    options: [
      { id: 'pq_1_a', text: 'Hug them immediately', weight: 1 },
      { id: 'pq_1_b', text: 'Ask what happened first', weight: 2 },
      { id: 'pq_1_c', text: 'Offer practical solutions', weight: 3 }
    ]
  },
  {
    id: 'pq_2',
    category: 'Decision making',
    text: 'How do you choose what to eat at a new restaurant?',
    options: [
      { id: 'pq_2_a', text: 'Pick the most adventurous thing', weight: 1 },
      { id: 'pq_2_b', text: 'Ask the waiter for a recommendation', weight: 2 },
      { id: 'pq_2_c', text: 'Stick to what you know you like', weight: 3 }
    ]
  },
  {
    id: 'pq_3',
    category: 'Social behavior',
    text: 'In a group project, what role do you take?',
    options: [
      { id: 'pq_3_a', text: 'The creative idea generator', weight: 1 },
      { id: 'pq_3_b', text: 'The organized leader', weight: 2 },
      { id: 'pq_3_c', text: 'The reliable helper', weight: 3 }
    ]
  }
];
