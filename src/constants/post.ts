export const CATEGORIES = [
  'general',
  'news',
  'feedback'
  'idea',
  'opinion',
] as const;

export type Categories = typeof CATEGORIES[number];