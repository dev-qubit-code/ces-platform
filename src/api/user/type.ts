import type {UserRole} from '../type';

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

export type TCreateUserBody = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type TCreateUserResponse = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinDate: string;
  isActive: boolean;
};