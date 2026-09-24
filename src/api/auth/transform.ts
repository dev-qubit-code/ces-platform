import {USER_ROLE, type UserRole} from '@/enum/user-role.enum';
import type {TMeResponse} from './type';

export type TTransformMeFromDto = Omit<TMeResponse, 'role'> & {role: UserRole};
export function transformMeFromDto(data: TMeResponse): TTransformMeFromDto {
  return {
    ...data,
    role: USER_ROLE[data.role]
  };
}
