import type {AxiosResponse} from 'axios';
import {api, queryClient, VERSION_ONE} from '../instance';
import type {TCreateUserBody, TCreateUserResponse, TUserByIdResponse, TUsersParams, TUsersResponse} from './type';
import {useMutation, useQuery, type UseMutationOptions, type UseQueryOptions} from '@tanstack/react-query';
import {CreateUserDtoTransform, UpdateUserDtoTransform, UserIDDtoTransform, UsersDtoTransform} from './transform';
import type {TUser} from '@/feature/users/type';
import type {TPaginationResponse} from '../type';
import {USERS} from '../api-endpoint';
import type {UserFormValues} from '@/feature/users/components/add-user-form';
import {toast} from 'sonner';
import type {UpdateUserFormValues} from '@/feature/users/components/edit-user-form';
export const USERS_KEY = (params?: TUsersParams) => ['USERS', params] as const;

async function getAllUsers(params: TUsersParams) {
  const response = await api.get<TPaginationResponse<TUsersResponse>>(`${VERSION_ONE}/${USERS}`, {params});
  return {...response, data: {...response.data, items: UsersDtoTransform(response.data.items)}};
}

async function getUserById(id: string) {
  const response = await api.get<TUserByIdResponse>(`${VERSION_ONE}/${USERS}/${id}`);
  return {
    ...response,
    data: UserIDDtoTransform(response.data)
  };
}

function createUser(body: TCreateUserBody) {
  return api.post<TCreateUserResponse>(`${VERSION_ONE}/${USERS}`, body);
}

function deleteUser(id: string) {
  return api.delete(`${VERSION_ONE}/${USERS}/${id}`);
}
function updateUser({id, data}: {id: string; data: UpdateUserFormValues}) {
  return api.put(`${VERSION_ONE}/${USERS}/${id}`, UpdateUserDtoTransform(data));
}

export function useUsers<TData = AxiosResponse<TPaginationResponse<TUser>>>(params: TUsersParams, queryOption?: Omit<UseQueryOptions<AxiosResponse<TPaginationResponse<TUser>>, Error, TData, ReturnType<typeof USERS_KEY>>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TPaginationResponse<TUser>>, Error, TData, ReturnType<typeof USERS_KEY>>({
    ...queryOption,
    queryKey: USERS_KEY(params),
    queryFn: () => getAllUsers(params)
  });
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

export function useUserById<TData = AxiosResponse<TUser>>(id: string, queryOption?: Omit<UseQueryOptions<AxiosResponse<TUser>, Error, TData>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TUser>, Error, TData>({
    ...queryOption,
    queryKey: [USERS_KEY()[0], id],
    queryFn: () => getUserById(id)
  });
}

export function useUpdateUser(option?: Omit<UseMutationOptions<AxiosResponse<TCreateUserResponse>, Error, {id: string; data: UpdateUserFormValues}>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<TCreateUserResponse>, Error, {id: string; data: UpdateUserFormValues}>({
    ...option,
    mutationKey: [...USERS_KEY(), 'update'],
    mutationFn: ({id, data}) => updateUser({id, data}),

    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [USERS_KEY()[0]],
        exact: false
      });

      toast.success('تم تعديل المستخدم', {
        description: 'تم تعديل بيانات المستخدم بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}
