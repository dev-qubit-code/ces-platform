export type TUsersParams = {
  search?: string;
  page: number;
  pageSize: number;
};

export type TUsersResponse = {
  id: string;
  name: string;
  email: string;
  role: 0;
  joinDate: string;
  isActive: boolean;
};
