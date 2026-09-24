import type {AxiosResponse} from 'axios';
import {useMutation, useQuery, type UseMutationOptions, type UseQueryOptions} from '@tanstack/react-query';
import {toast} from 'sonner';
import {api, VERSION_ONE} from '../instance';
import {AUTH} from '../api-endpoint';
import type {TLoginBody, TLoginResponse, TMeResponse} from './type';
import {transformMeFromDto, type TTransformMeFromDto} from './transform';
export const AUTH_KEY = () => ['AUTH'] as const;

function login(body: TLoginBody) {
  return api.post<TLoginResponse>(`${VERSION_ONE}/${AUTH}/login`, body);
}

async function getMe() {
  const response = await api.get<TMeResponse>(`${VERSION_ONE}/${AUTH}/me`);
  return {
    ...response,
    data: transformMeFromDto(response.data)
  };
}

// Hooks...

export function useLogin(option?: Omit<UseMutationOptions<AxiosResponse<TLoginResponse>, Error, TLoginBody>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<TLoginResponse>, Error, TLoginBody>({
    ...option,
    mutationKey: [...AUTH_KEY(), 'login'],
    mutationFn: data => login(data),
    onSuccess: (...args) => {
      toast.success('تم تسجيل الدخول', {
        description: 'تم تسجيل الدخول بنجاح.'
      });
      option?.onSuccess?.(...args);
    }
  });
}

export function useMe<TData = AxiosResponse<TTransformMeFromDto>>(queryOption?: Omit<UseQueryOptions<AxiosResponse<TTransformMeFromDto>, Error, TData>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TTransformMeFromDto>, Error, TData>({
    ...queryOption,
    queryKey: [...AUTH_KEY(), 'me'],
    queryFn: getMe
  });
}
