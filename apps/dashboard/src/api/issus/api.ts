import type {AxiosResponse} from 'axios';

import {useMutation, useQuery, type UseMutationOptions, type UseQueryOptions} from '@tanstack/react-query';

import {toast} from 'sonner';

import {api, queryClient, VERSION_ONE} from '../instance';

import {REPORTS} from '../api-endpoint';

import type {TPaginationResponse} from '../type';

import type {TCreateReportBody, TReportResponse, TReportsParams} from './type';

import {CreateReportDtoTransform, ReportDtoTransform, ReportsDtoTransform} from './transform';
import type { TIssue } from '@/feature/issus/type';

export const REPORTS_KEY = (params?: TReportsParams) => ['REPORTS', params] as const;

/* API */

async function getAllReports(params: TReportsParams) {
  const response = await api.get<TPaginationResponse<TReportResponse>>(`${VERSION_ONE}/${REPORTS}`, {params});

  return {
    ...response,
    data: {
      ...response.data,
      items: ReportsDtoTransform(response.data.items)
    }
  };
}

async function getReportById(id: string) {
  const response = await api.get<TReportResponse>(`${VERSION_ONE}/${REPORTS}/${id}`);

  return {
    ...response,
    data: ReportDtoTransform(response.data)
  };
}

function createReport(body: TCreateReportBody) {
  return api.post<TReportResponse>(`${VERSION_ONE}/${REPORTS}`, CreateReportDtoTransform(body));
}

/* Hooks */

export function useReports<TData = AxiosResponse<TPaginationResponse<TIssue>>>(params: TReportsParams, queryOption?: Omit<UseQueryOptions<AxiosResponse<TPaginationResponse<TIssue>>, Error, TData, ReturnType<typeof REPORTS_KEY>>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TPaginationResponse<TIssue>>, Error, TData, ReturnType<typeof REPORTS_KEY>>({
    ...queryOption,
    queryKey: REPORTS_KEY(params),
    queryFn: () => getAllReports(params)
  });
}

export function useReportById<TData = AxiosResponse<TIssue>>(id: string, queryOption?: Omit<UseQueryOptions<AxiosResponse<TIssue>, Error, TData>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TIssue>, Error, TData>({
    ...queryOption,
    queryKey: [REPORTS_KEY()[0], id],
    queryFn: () => getReportById(id)
  });
}

export function useCreateReport(option?: Omit<UseMutationOptions<AxiosResponse<TReportResponse>, Error, TCreateReportBody>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<TReportResponse>, Error, TCreateReportBody>({
    ...option,
    mutationKey: [...REPORTS_KEY(), 'create'],
    mutationFn: data => createReport(data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [REPORTS_KEY()[0]],
        exact: false
      });

      toast.success('تم إنشاء التقرير', {
        description: 'تم إنشاء التقرير بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}
