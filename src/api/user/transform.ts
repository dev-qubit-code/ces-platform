import type {TUser} from '@/feature/users/type';
import type {TCreateUserBody, TUsersResponse} from './type';
import {USER_ROLE, type UserRole} from '@/enum/user-role.enum';
import type {UserFormValues} from '@/feature/users/components/add-user-form';
import {RoleMap} from '../type';

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
