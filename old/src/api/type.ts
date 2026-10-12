export type TPaginationResponse<T> = {
  items: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export const UserRole = {
  MANAGER: 0,
  ADMIN: 1
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const RoleMap = {
  manager: UserRole.MANAGER,
  admin: UserRole.ADMIN
} as const;
