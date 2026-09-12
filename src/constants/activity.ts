export const ACTIVITY_TYPE = [
  'likes', 
  'posts',
  'reposts', 
  'comments'
] as const;

export type ActivityType = (typeof ACTIVITY_TYPE)[number];