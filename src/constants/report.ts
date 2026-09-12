export const REPORT_REASON = [
  'spam', 
  'harassment', 
  'inappropriate_content',
  'false_information',
  'something_else'
] as const;

export type ReportReason = (typeof REPORT_REASON)[number];

export const REPORT_STATUS = [
  'pending', 
  'reviewed', 
  'dismissed', 
  'resolved'
] as const;

export type ReportStatus = (typeof REPORT_STATUS)[number];