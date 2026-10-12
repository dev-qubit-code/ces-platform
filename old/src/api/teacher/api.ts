import type {AxiosResponse} from 'axios';
import {useMutation, useQuery, type UseMutationOptions, type UseQueryOptions} from '@tanstack/react-query';
import {toast} from 'sonner';

import {api, queryClient, VERSION_ONE} from '../instance';
import {TEACHERS} from '../api-endpoint';

import type {TPaginationResponse} from '../type';

import type {TCreateTeacherBody, TCreateTeacherResponse, TTeacherByIdResponse, TTeacherResponse, TTeachersParams, TUpdateTeacherBody} from './type';
import {TeachersDtoTransform} from './transform';
import type { TLecturers } from '@/feature/lecturers/type';

export const TEACHERS_KEY = (params?: TTeachersParams) => ['TEACHERS', params] as const;

async function getAllTeachers(params: TTeachersParams) {
  const response = await api.get<TPaginationResponse<TTeacherResponse>>(`${VERSION_ONE}/${TEACHERS}`, {params});

  return {
    ...response,
    data: {
      ...response.data,
      items: TeachersDtoTransform(response.data.items)
    }
  };
}

async function getTeacherById(id: string) {
  return api.get<TTeacherByIdResponse>(`${VERSION_ONE}/${TEACHERS}/${id}`);
}

function createTeacher(body: TCreateTeacherBody) {
  return api.post<TCreateTeacherResponse>(`${VERSION_ONE}/${TEACHERS}`, body);
}

function updateTeacher({id, data}: {id: string; data: TUpdateTeacherBody}) {
  return api.put(`${VERSION_ONE}/${TEACHERS}/${id}`, data);
}

function deleteTeacher(id: string) {
  return api.delete(`${VERSION_ONE}/${TEACHERS}/${id}`);
}

/* Hooks */
export function useTeachers<TData = AxiosResponse<TPaginationResponse<TLecturers>>>(params: TTeachersParams, queryOption?: Omit<UseQueryOptions<AxiosResponse<TPaginationResponse<TLecturers>>, Error, TData, ReturnType<typeof TEACHERS_KEY>>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TPaginationResponse<TLecturers>>, Error, TData, ReturnType<typeof TEACHERS_KEY>>({
    ...queryOption,
    queryKey: TEACHERS_KEY(params),
    queryFn: () => getAllTeachers(params)
  });
}
export function useTeacherById<TData = AxiosResponse<TTeacherByIdResponse>>(id: string, queryOption?: Omit<UseQueryOptions<AxiosResponse<TTeacherByIdResponse>, Error, TData>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TTeacherByIdResponse>, Error, TData>({
    ...queryOption,
    queryKey: [TEACHERS_KEY()[0], id],
    queryFn: () => getTeacherById(id)
  });
}

export function useCreateTeacher(option?: Omit<UseMutationOptions<AxiosResponse<TCreateTeacherResponse>, Error, TCreateTeacherBody>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<TCreateTeacherResponse>, Error, TCreateTeacherBody>({
    ...option,
    mutationKey: [...TEACHERS_KEY(), 'create'],

    mutationFn: data => createTeacher(data),

    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [TEACHERS_KEY()[0]],
        exact: false
      });

      toast.success('تم إنشاء الدكتور', {
        description: 'تم إنشاء الدكتور بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}

export function useUpdateTeacher(
  option?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      {
        id: string;
        data: TUpdateTeacherBody;
      }
    >,
    'mutationFn' | 'mutationKey'
  >
) {
  return useMutation<
    AxiosResponse,
    Error,
    {
      id: string;
      data: TUpdateTeacherBody;
    }
  >({
    ...option,
    mutationKey: [...TEACHERS_KEY(), 'update'],

    mutationFn: ({id, data}) => updateTeacher({id, data}),

    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [TEACHERS_KEY()[0]],
        exact: false
      });

      toast.success('تم تعديل الدكتور', {
        description: 'تم تعديل بيانات الدكتور بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}

export function useDeleteTeacher(option?: Omit<UseMutationOptions<AxiosResponse, Error, {id: string}>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse, Error, {id: string}>({
    ...option,
    mutationKey: [...TEACHERS_KEY(), 'delete'],

    mutationFn: ({id}) => deleteTeacher(id),

    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [TEACHERS_KEY()[0]],
        exact: false
      });

      toast.success('تم حذف الدكتور', {
        description: 'تم حذف الدكتور بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}
