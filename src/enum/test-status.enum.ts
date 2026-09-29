export const TEST_STATUS = {
  pending: 0,
  approved: 1,
  rejected: 2
} as const;

export type TTestStatus = (typeof TEST_STATUS)[keyof typeof TEST_STATUS];
