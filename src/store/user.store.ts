import type {UserRole} from '@/enum/user-role.enum';
import {create} from 'zustand';

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type TUserStore = {
  user?: TUser;
  setUser: (user: TUser) => void;
};
export const useUser = create<TUserStore>(set => ({
  user: undefined,
  setUser: (user: TUser) => {
    set({user: user});
  }
}));
