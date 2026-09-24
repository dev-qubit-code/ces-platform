export type TUserRole = 0 | 1;
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
