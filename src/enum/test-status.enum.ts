export const TEST_STATUS = {
  none: 0,
  notApproved: 1,
  pending: 2,
  approved: 3
} as const;

export type TTestStatus = (typeof TEST_STATUS)[keyof typeof TEST_STATUS];

// Test Status Mapper from number to string
export const TEST_STATUS_MAPPER: Record<TTestStatus, keyof typeof TEST_STATUS> = {
  0: 'none',
  1: 'notApproved',
  2: 'pending',
  3: 'approved'
};
