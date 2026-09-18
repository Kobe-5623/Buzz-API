export const CATEGORIES = [
  'general',
  'news',
  'feedback',
  'idea',
  'opinion',
  'question',
] as const;

export type Categories = typeof CATEGORIES[number];