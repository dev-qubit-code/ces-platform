import type {TUser} from '@/feature/users/type';
import type {TCreateUserBody, TUpdateUserBody, TUserByIdResponse, TUsersResponse} from './type';
import {USER_ROLE, type UserRole} from '@/enum/user-role.enum';
import type {UserFormValues} from '@/feature/users/components/add-user-form';
import {RoleMap} from '../type';
import type {UpdateUserFormValues} from '@/feature/users/components/edit-user-form';

export function UsersDtoTransform(data: TUsersResponse[]): TUser[] {
  return data.map(item => {
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      role: USER_ROLE[item.role] as UserRole,
      status: item.isActive ? 'active' : 'inactive',
      createdAt: item.joinDate
    };
  });
}

export function CreateUserDtoTransform(data: UserFormValues): TCreateUserBody {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
    role: RoleMap[data.role]
  };
}

export function UserIDDtoTransform(data: TUserByIdResponse): TUser {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: USER_ROLE[data.role],
    status: data.isActive ? 'active' : 'inactive',
    createdAt: data.joinDate
  };
}
export function UpdateUserDtoTransform(data: UpdateUserFormValues): TUpdateUserBody {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
    role: RoleMap[data.role],
    isActive: data.status == 'active'
  };
}
