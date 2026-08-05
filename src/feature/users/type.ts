export type TUserType = 'admin' | 'manager';

export type TStatus = 'active' | 'inactive';

export type TUser = {
  id: string;

  name: string;

  email: string;

  role: TUserType;

  status: TStatus;

  createdAt: string;
};
