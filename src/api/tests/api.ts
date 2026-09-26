import type {AxiosResponse} from 'axios';
import {useMutation, useQuery, type UseMutationOptions, type UseQueryOptions} from '@tanstack/react-query';
import {toast} from 'sonner';

import {api, queryClient, VERSION_ONE} from '../instance';
import {TESTS} from '../api-endpoint';
import type {TPaginationResponse} from '../type';
import type {TCreateTestBody, TCreateTestResponse, TTestByIdResponse, TTestResponse, TTestsParams, TUpdateTestBody} from './type';
import {TestsDtoTransform} from './transform';
import type {TTest} from '@/feature/tests/all/type';

export const TESTS_KEY = (params?: TTestsParams) => ['TESTS', params] as const;

async function getAllTests(params: TTestsParams) {
  const response = await api.get<TPaginationResponse<TTestResponse>>(`${VERSION_ONE}/${TESTS}`, {params});

  return {
    ...response,
    data: {
      ...response.data,
      items: TestsDtoTransform(response.data.items)
    }
  };
}

async function getTestById(id: string) {
  return api.get<TTestByIdResponse>(`${VERSION_ONE}/${TESTS}/${id}`);
}

function createTest(body: TCreateTestBody) {
  return api.post<TCreateTestResponse>(`${VERSION_ONE}/${TESTS}`, body);
}

function updateTest({id, data}: {id: string; data: TUpdateTestBody}) {
  return api.put<TTestResponse>(`${VERSION_ONE}/${TESTS}/${id}`, data);
}

function deleteTest(id: string) {
  return api.delete<TTestResponse>(`${VERSION_ONE}/${TESTS}/${id}`);
}

export function useTests<TData = AxiosResponse<TPaginationResponse<TTest>>>(params: TTestsParams, queryOption?: Omit<UseQueryOptions<AxiosResponse<TPaginationResponse<TTest>>, Error, TData, ReturnType<typeof TESTS_KEY>>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TPaginationResponse<TTest>>, Error, TData, ReturnType<typeof TESTS_KEY>>({
    ...queryOption,
    queryKey: TESTS_KEY(params),
    queryFn: () => getAllTests(params)
  });
}

export function useTestById<TData = AxiosResponse<TTestByIdResponse>>(id: string, queryOption?: Omit<UseQueryOptions<AxiosResponse<TTestByIdResponse>, Error, TData>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TTestByIdResponse>, Error, TData>({
    ...queryOption,
    queryKey: [TESTS_KEY()[0], id],
    queryFn: () => getTestById(id)
  });
}

export function useCreateTest(option?: Omit<UseMutationOptions<AxiosResponse<TCreateTestResponse>, Error, TCreateTestBody>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<TCreateTestResponse>, Error, TCreateTestBody>({
    ...option,
    mutationKey: [...TESTS_KEY(), 'create'],
    mutationFn: data => createTest(data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [TESTS_KEY()[0]],
        exact: false
      });

      toast.success('تم إنشاء الاختبار', {
        description: 'تم إنشاء الاختبار بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}

export function useUpdateTest(
  option?: Omit<
    UseMutationOptions<
      AxiosResponse<TTestResponse>,
      Error,
      {
        id: string;
        data: TUpdateTestBody;
      }
    >,
    'mutationFn' | 'mutationKey'
  >
) {
  return useMutation<AxiosResponse<TTestResponse>, Error, {id: string; data: TUpdateTestBody}>({
    ...option,
    mutationKey: [...TESTS_KEY(), 'update'],
    mutationFn: ({id, data}) => updateTest({id, data}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [TESTS_KEY()[0]],
        exact: false
      });

      toast.success('تم تعديل الاختبار', {
        description: 'تم تعديل بيانات الاختبار بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}

export function useDeleteTest(option?: Omit<UseMutationOptions<AxiosResponse<TTestResponse>, Error, {id: string}>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<TTestResponse>, Error, {id: string}>({
    ...option,
    mutationKey: [...TESTS_KEY(), 'delete'],
    mutationFn: ({id}) => deleteTest(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [TESTS_KEY()[0]],
        exact: false
      });

      toast.success('تم حذف الاختبار', {
        description: 'تم حذف الاختبار بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}
