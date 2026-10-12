export const ISSUE_PRIORITY = {
  0: 'low',
  1: 'medium',
  2: 'high'
} as const;

export type IssuePriority = (typeof ISSUE_PRIORITY)[keyof typeof ISSUE_PRIORITY];
