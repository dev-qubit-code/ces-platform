import type {AxiosResponse} from 'axios';
import {api, VERSION_ONE} from '../instance';
import type {TUsersParams, TUsersResponse} from './type';
import {useQuery, type UseQueryOptions} from '@tanstack/react-query';
import {UserDtoTransform} from './transform';
import type {TUser} from '@/feature/users/type';
import type {TPaginationResponse} from '../type';
import {USERS} from '../api-endpoint';
export const USERS_KEY = (params: TUsersParams) => ['USERS', params] as const;

async function getAllUsers(params: TUsersParams) {
  const response = await api.get<TPaginationResponse<TUsersResponse>>(`${VERSION_ONE}/${USERS}`, {params});
  return {...response, data: {...response.data, items: UserDtoTransform(response.data.items)}};
}

export function useUsers<TData = AxiosResponse<TPaginationResponse<TUser>>>(params: TUsersParams, queryOption?: Omit<UseQueryOptions<AxiosResponse<TPaginationResponse<TUser>>, Error, TData, ReturnType<typeof USERS_KEY>>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TPaginationResponse<TUser>>, Error, TData, ReturnType<typeof USERS_KEY>>({
    queryKey: USERS_KEY(params),
    queryFn: () => getAllUsers(params),
    ...queryOption
  });
}
