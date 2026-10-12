export const USER_ROLE = {
  0: 'manager',
  1: 'admin'
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];