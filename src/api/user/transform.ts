import type {TUser} from '@/feature/users/type';
import type {TUsersResponse} from './type';
import {USER_ROLE, type UserRole} from '@/enum/user-role.enum';

export function UserDtoTransform(data: TUsersResponse[]): TUser[] {
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
