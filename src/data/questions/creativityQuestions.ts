/**
 * Creativity Quiz Questions
 * Focused on imagination, artistic leaning, and unconventional thinking.
 */

import { Question } from '@/types';

export const creativityQuestions: Question[] = [
  {
    id: 'cq_1',
    category: 'Preferences',
    text: 'When you see a cloud, what do you see?',
    options: [
      { id: 'cq_1_a', text: 'Animals, faces, or stories', weight: 5 },
      { id: 'cq_1_b', text: 'Shapes and patterns', weight: 3 },
      { id: 'cq_1_c', text: 'Just a cloud', weight: 1 }
    ]
  },
  {
    id: 'cq_2',
    category: 'Lifestyle',
    text: 'Do you ever lose track of time while making something?',
    options: [
      { id: 'cq_2_a', text: 'Frequently, I enter a "flow" state', weight: 5 },
      { id: 'cq_2_b', text: 'Sometimes, if it is interesting', weight: 3 },
      { id: 'cq_2_c', text: 'Rarely, I am very time-conscious', weight: 1 }
    ]
  },
  {
    id: 'cq_3',
    category: 'Humor',
    text: 'What do you find most entertaining?',
    options: [
      { id: 'cq_3_a', text: 'Abstract art or surreal films', weight: 5 },
      { id: 'cq_3_b', text: 'Biographies or Documentaries', weight: 3 },
      { id: 'cq_3_c', text: 'Action movies or News', weight: 1 }
    ]
  }
];
