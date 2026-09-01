import type {AxiosResponse} from 'axios';

import {useMutation, useQuery, type UseMutationOptions, type UseQueryOptions} from '@tanstack/react-query';

import {toast} from 'sonner';

import {api, queryClient, VERSION_ONE} from '../instance';

import {COURSES} from '../api-endpoint';

import type {TPaginationResponse} from '../type';

import type {TCourseResponse, TCoursesParams, TCreateCourseBody, TCreateCourseResponse, TUpdateCourseBody} from './type';

import {CoursesDtoTransform} from './transform';

import type {TCourse} from '@/feature/courses/type';

import {mockCourseData} from '@/feature/courses/helper';

export const isMock = true;

export const COURSES_KEY = (params?: TCoursesParams) => ['COURSES', params] as const;

async function getAllCourses(params: TCoursesParams) {
  if (isMock) {
    return {
      data: {
        items: mockCourseData,
        totalCount: mockCourseData.length,
        currentPage: 1,
        pageSize: mockCourseData.length,
        totalPages: 1,
        hasPreviousPage: false,
        hasNextPage: false
      }
    } as AxiosResponse<TPaginationResponse<TCourse>>;
  }

  const response = await api.get<TPaginationResponse<TCourseResponse>>(`${VERSION_ONE}/${COURSES}`, {params});

  return {
    ...response,
    data: {
      ...response.data,
      items: CoursesDtoTransform(response.data.items)
    }
  };
}

async function getCourseById(id: string) {
  return api.get<TCourseResponse>(`${VERSION_ONE}/${COURSES}/${id}`);
}

function createCourse(body: TCreateCourseBody) {
  return api.post<TCreateCourseResponse>(`${VERSION_ONE}/${COURSES}`, body);
}

function updateCourse({id, data}: {id: string; data: TUpdateCourseBody}) {
  return api.put(`${VERSION_ONE}/${COURSES}/${id}`, data);
}

function deleteCourse(id: string) {
  return api.delete(`${VERSION_ONE}/${COURSES}/${id}`);
}

export function useCourses<TData = AxiosResponse<TPaginationResponse<TCourse>>>(params: TCoursesParams, queryOption?: Omit<UseQueryOptions<AxiosResponse<TPaginationResponse<TCourse>>, Error, TData, ReturnType<typeof COURSES_KEY>>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TPaginationResponse<TCourse>>, Error, TData, ReturnType<typeof COURSES_KEY>>({
    ...queryOption,
    queryKey: COURSES_KEY(params),
    queryFn: () => getAllCourses(params)
  });
}

export function useCourseById<TData = AxiosResponse<TCourseResponse>>(id: string, queryOption?: Omit<UseQueryOptions<AxiosResponse<TCourseResponse>, Error, TData>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TCourseResponse>, Error, TData>({
    ...queryOption,
    queryKey: [COURSES_KEY()[0], id],
    queryFn: () => getCourseById(id)
  });
}

export function useCreateCourse(option?: Omit<UseMutationOptions<AxiosResponse<TCreateCourseResponse>, Error, TCreateCourseBody>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<TCreateCourseResponse>, Error, TCreateCourseBody>({
    ...option,
    mutationKey: [...COURSES_KEY(), 'create'],
    mutationFn: data => createCourse(data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [COURSES_KEY()[0]],
        exact: false
      });

      toast.success('تم إنشاء المادة', {
        description: 'تم إنشاء المادة بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}

export function useUpdateCourse(
  option?: Omit<
    UseMutationOptions<
      AxiosResponse,
      Error,
      {
        id: string;
        data: TUpdateCourseBody;
      }
    >,
    'mutationFn' | 'mutationKey'
  >
) {
  return useMutation<AxiosResponse, Error, {id: string; data: TUpdateCourseBody}>({
    ...option,
    mutationKey: [...COURSES_KEY(), 'update'],
    mutationFn: ({id, data}) => updateCourse({id, data}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [COURSES_KEY()[0]],
        exact: false
      });

      toast.success('تم تعديل المادة', {
        description: 'تم تعديل بيانات المادة بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}

export function useDeleteCourse(option?: Omit<UseMutationOptions<AxiosResponse, Error, {id: string}>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse, Error, {id: string}>({
    ...option,
    mutationKey: [...COURSES_KEY(), 'delete'],
    mutationFn: ({id}) => deleteCourse(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [COURSES_KEY()[0]],
        exact: false
      });

      toast.success('تم حذف المادة', {
        description: 'تم حذف المادة بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}
