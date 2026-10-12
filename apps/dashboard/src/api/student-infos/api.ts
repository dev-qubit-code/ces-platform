import type {AxiosResponse} from 'axios';

import {useMutation, useQuery, type UseMutationOptions, type UseQueryOptions} from '@tanstack/react-query';

import {api, queryClient, VERSION_ONE} from '../instance';
import {STUDENT_INFOS} from '../api-endpoint';

import type {TPaginationResponse} from '../type';

import type {TCreateStudentInfoBody, TStudentInfoResponse, TStudentInfosParams, TUpdateStudentInfoParams} from './type';

import {CreateStudentInfoDtoTransform, StudentInfoDtoTransform, StudentInfosDtoTransform, UpdateStudentInfoDtoTransform} from './transform';

import {toast} from 'sonner';
import type {TStudentPortfolio} from '@/feature/student-portfolios/type';

export const STUDENT_INFOS_KEY = (params?: TStudentInfosParams) => ['STUDENT_INFOS', params] as const;

async function getAllStudentInfos(params: TStudentInfosParams) {
  const response = await api.get<TPaginationResponse<TStudentInfoResponse>>(`${VERSION_ONE}/${STUDENT_INFOS}`, {params});

  return {
    ...response,
    data: {
      ...response.data,
      items: StudentInfosDtoTransform(response.data.items)
    }
  };
}

async function getStudentInfoById(id: string) {
  const response = await api.get<TStudentInfoResponse>(`${VERSION_ONE}/${STUDENT_INFOS}/${id}`);

  return {
    ...response,
    data: StudentInfoDtoTransform(response.data)
  };
}

function createStudentInfo(body: TCreateStudentInfoBody) {
  return api.post<TStudentInfoResponse>(`${VERSION_ONE}/${STUDENT_INFOS}`, body);
}

function updateStudentInfo({id, data}: TUpdateStudentInfoParams) {
  return api.put(`${VERSION_ONE}/${STUDENT_INFOS}/${id}`, UpdateStudentInfoDtoTransform(data));
}

function deleteStudentInfo(id: string) {
  return api.delete(`${VERSION_ONE}/${STUDENT_INFOS}/${id}`);
}

/* Hooks */

export function useStudentInfos<TData = AxiosResponse<TPaginationResponse<TStudentPortfolio>>>(params: TStudentInfosParams, queryOption?: Omit<UseQueryOptions<AxiosResponse<TPaginationResponse<TStudentPortfolio>>, Error, TData, ReturnType<typeof STUDENT_INFOS_KEY>>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TPaginationResponse<TStudentPortfolio>>, Error, TData, ReturnType<typeof STUDENT_INFOS_KEY>>({
    ...queryOption,
    queryKey: STUDENT_INFOS_KEY(params),
    queryFn: () => getAllStudentInfos(params)
  });
}

export function useStudentInfoById<TData = AxiosResponse<TStudentPortfolio>>(id: string, queryOption?: Omit<UseQueryOptions<AxiosResponse<TStudentPortfolio>, Error, TData>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TStudentPortfolio>, Error, TData>({
    ...queryOption,
    queryKey: [STUDENT_INFOS_KEY()[0], id],
    queryFn: () => getStudentInfoById(id)
  });
}

export function useCreateStudentInfo(option?: Omit<UseMutationOptions<AxiosResponse<TStudentInfoResponse>, Error, TCreateStudentInfoBody>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<TStudentInfoResponse>, Error, TCreateStudentInfoBody>({
    ...option,
    mutationKey: [...STUDENT_INFOS_KEY(), 'create'],
    mutationFn: data => createStudentInfo(CreateStudentInfoDtoTransform(data)),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [STUDENT_INFOS_KEY()[0]],
        exact: false
      });

      toast.success('تم إنشاء معلومات الطالب', {
        description: 'تم إنشاء معلومات الطالب بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}

export function useUpdateStudentInfo(option?: Omit<UseMutationOptions<AxiosResponse<void>, Error, TUpdateStudentInfoParams>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<void>, Error, TUpdateStudentInfoParams>({
    ...option,
    mutationKey: [...STUDENT_INFOS_KEY(), 'update'],
    mutationFn: ({id, data}) => updateStudentInfo({id, data}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [STUDENT_INFOS_KEY()[0]],
        exact: false
      });

      toast.success('تم تعديل معلومات الطالب', {
        description: 'تم تعديل معلومات الطالب بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}

export function useDeleteStudentInfo(option?: Omit<UseMutationOptions<AxiosResponse<void>, Error, {id: string}>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<void>, Error, {id: string}>({
    ...option,
    mutationKey: [...STUDENT_INFOS_KEY(), 'delete'],
    mutationFn: ({id}) => deleteStudentInfo(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [STUDENT_INFOS_KEY()[0]],
        exact: false
      });

      toast.success('تم حذف معلومات الطالب', {
        description: 'تم حذف معلومات الطالب بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}
