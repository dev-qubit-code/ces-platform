import type {AxiosResponse} from 'axios';
import {api, queryClient, VERSION_ONE} from '../instance';
import type {TCreateUserBody, TCreateUserResponse, TUsersParams, TUsersResponse} from './type';
import {useMutation, useQuery, type UseMutationOptions, type UseQueryOptions} from '@tanstack/react-query';
import {CreateUserDtoTransform, UsersDtoTransform} from './transform';
import type {TUser} from '@/feature/users/type';
import type {TPaginationResponse} from '../type';
import {USERS} from '../api-endpoint';
import type {UserFormValues} from '@/feature/users/components/add-user-form';
import {toast} from 'sonner';
export const USERS_KEY = (params?: TUsersParams) => ['USERS', params] as const;

async function getAllUsers(params: TUsersParams) {
  const response = await api.get<TPaginationResponse<TUsersResponse>>(`${VERSION_ONE}/${USERS}`, {params});
  return {...response, data: {...response.data, items: UsersDtoTransform(response.data.items)}};
}

export function useUsers<TData = AxiosResponse<TPaginationResponse<TUser>>>(params: TUsersParams, queryOption?: Omit<UseQueryOptions<AxiosResponse<TPaginationResponse<TUser>>, Error, TData, ReturnType<typeof USERS_KEY>>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TPaginationResponse<TUser>>, Error, TData, ReturnType<typeof USERS_KEY>>({
    ...queryOption,
    queryKey: USERS_KEY(params),
    queryFn: () => getAllUsers(params)
  });
}

function createUser(body: TCreateUserBody) {
  return api.post<TCreateUserResponse>(`${VERSION_ONE}/${USERS}`, body);
}

export function useCreateUser(option?: Omit<UseMutationOptions<AxiosResponse<TCreateUserResponse>, Error, UserFormValues>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<TCreateUserResponse>, Error, UserFormValues>({
    ...option,
    mutationKey: [...USERS_KEY(), 'create'],
    mutationFn: data => createUser(CreateUserDtoTransform(data)),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [USERS_KEY()[0]],
        exact: false
      });
      toast.success('تم إنشاء المستخدم', {
        description: 'تم إنشاء المستخدم بنجاح.'
      });
      option?.onSuccess?.(...args);
    }
  });
}

function deleteUser(id: string) {
  return api.delete(`${VERSION_ONE}/${USERS}/${id}`);
}

export function useDeleteUser(option?: Omit<UseMutationOptions<AxiosResponse, Error, {id: string}>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse, Error, {id: string}>({
    ...option,
    mutationKey: [...USERS_KEY(), 'delete'],
    mutationFn: ({id}) => deleteUser(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [USERS_KEY()[0]],
        exact: false
      });
      toast.success('تم حذف المستخدم', {
        description: 'تم حذف المستخدم بنجاح.'
      });
      option?.onSuccess?.(...args);
    }
  });
}
