export const ALERT_TYPE = [
  'like',
  'comment',
  'reply',
  'save',
  'repost',
  'followed'
] as const;

export type AlertType = (typeof ALERT_TYPE)[number];