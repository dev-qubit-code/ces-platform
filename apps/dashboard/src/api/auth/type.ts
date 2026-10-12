import type {USER_ROLE} from '@/enum/user-role.enum';

export type TUserRole = keyof typeof USER_ROLE;
export type TLoginBody = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  token: {
    accessToken: string;
    expires: string;
  };
  role: TUserRole;
};

export type TMeResponse = {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
};
