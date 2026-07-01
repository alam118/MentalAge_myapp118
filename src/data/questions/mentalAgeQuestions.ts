/**
 * Mental Age Quiz Questions
 * Real questions with weights for score calculation.
 */

import { Question } from '@/types';

export const mentalAgeQuestions: Question[] = [
  {
    id: 'ma_1',
    category: 'Lifestyle',
    text: 'How do you usually spend your Saturday nights?',
    options: [
      { id: 'ma_1_a', text: 'Partying or out with many friends', weight: 1 },
      { id: 'ma_1_b', text: 'Dinner and a movie', weight: 3 },
      { id: 'ma_1_c', text: 'Reading a book or early sleep', weight: 5 }
    ]
  },
  {
    id: 'ma_2',
    category: 'Humor',
    text: 'What kind of jokes do you find funniest?',
    options: [
      { id: 'ma_2_a', text: 'Pranks and slapstick comedy', weight: 1 },
      { id: 'ma_2_b', text: 'Witty banter and sarcasm', weight: 3 },
      { id: 'ma_2_c', text: 'Dark humor or philosophical irony', weight: 5 }
    ]
  },
  {
    id: 'ma_3',
    category: 'Preferences',
    text: 'What is your ideal vacation?',
    options: [
      { id: 'ma_3_a', text: 'Music festival or theme park', weight: 1 },
      { id: 'ma_3_b', text: 'Sightseeing in a famous city', weight: 3 },
      { id: 'ma_3_c', text: 'Quiet cabin in the mountains', weight: 5 }
    ]
  },
  {
    id: 'ma_4',
    category: 'Social behavior',
    text: 'How do you handle a disagreement?',
    options: [
      { id: 'ma_4_a', text: 'Get emotional or walk away', weight: 1 },
      { id: 'ma_4_b', text: 'Argue your point logically', weight: 3 },
      { id: 'ma_4_c', text: 'Try to see their side and mediate', weight: 5 }
    ]
  },
  {
    id: 'ma_5',
    category: 'Habits',
    text: 'When do you usually wake up on a holiday?',
    options: [
      { id: 'ma_5_a', text: 'Past noon', weight: 1 },
      { id: 'ma_5_b', text: 'Around 9:00 AM', weight: 3 },
      { id: 'ma_5_c', text: 'At sunrise, as usual', weight: 5 }
    ]
  }
  // ... more questions would be added here to reach 40
];
