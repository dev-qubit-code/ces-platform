import type {AxiosResponse} from 'axios';
import {useMutation, useQuery, type UseMutationOptions, type UseQueryOptions} from '@tanstack/react-query';
import {toast} from 'sonner';
import {api, queryClient, VERSION_ONE} from '../instance';
import {ARTICLES} from '../api-endpoint';
import type {TPaginationResponse} from '../type';
import type {CreateNewsInput, NewsArticle, UpdateNewsInput} from '@/feature/news/type';
import {articleApiToClient, articlesPageApiToClient, createNewsInputToApi, updateNewsInputToApi} from './transform';
import type {ArticleApiResponse, ArticlesApiPageResponse, TArticlesParams} from './type';

export const ARTICLES_KEY = (params?: TArticlesParams) => ['ARTICLES', params] as const;

async function getAllArticles(params: TArticlesParams): Promise<AxiosResponse<TPaginationResponse<NewsArticle>>> {
  const response = await api.get<ArticlesApiPageResponse>(`${VERSION_ONE}/${ARTICLES}`, {params});
  return {...response, data: articlesPageApiToClient(response.data)};
}

async function getArticleById(id: string): Promise<AxiosResponse<NewsArticle>> {
  const response = await api.get<ArticleApiResponse>(`${VERSION_ONE}/${ARTICLES}/${id}`);
  return {...response, data: articleApiToClient(response.data)};
}

async function createArticle(input: CreateNewsInput): Promise<AxiosResponse<NewsArticle>> {
  const response = await api.post<ArticleApiResponse>(`${VERSION_ONE}/${ARTICLES}`, createNewsInputToApi(input));
  return {...response, data: articleApiToClient(response.data)};
}

async function updateArticle({id, data}: {id: string; data: UpdateNewsInput}): Promise<AxiosResponse<NewsArticle>> {
  const response = await api.put<ArticleApiResponse>(`${VERSION_ONE}/${ARTICLES}/${id}`, updateNewsInputToApi(data));
  return {...response, data: articleApiToClient(response.data)};
}

function deleteArticle(id: string) {
  return api.delete(`${VERSION_ONE}/${ARTICLES}/${id}`);
}

export function useArticles<TData = AxiosResponse<TPaginationResponse<NewsArticle>>>(params: TArticlesParams, options?: Omit<UseQueryOptions<AxiosResponse<TPaginationResponse<NewsArticle>>, Error, TData, ReturnType<typeof ARTICLES_KEY>>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TPaginationResponse<NewsArticle>>, Error, TData, ReturnType<typeof ARTICLES_KEY>>({
    ...options,
    queryKey: ARTICLES_KEY(params),
    queryFn: () => getAllArticles(params)
  });
}

export function useArticleById<TData = AxiosResponse<NewsArticle>>(id: string, options?: Omit<UseQueryOptions<AxiosResponse<NewsArticle>, Error, TData>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<NewsArticle>, Error, TData>({
    ...options,
    queryKey: [ARTICLES_KEY()[0], id],
    queryFn: () => getArticleById(id)
  });
}

export function useCreateArticle(options?: Omit<UseMutationOptions<AxiosResponse<NewsArticle>, Error, CreateNewsInput>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<NewsArticle>, Error, CreateNewsInput>({
    ...options,
    mutationKey: [...ARTICLES_KEY(), 'create'],
    mutationFn: createArticle,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({queryKey: [ARTICLES_KEY()[0]], exact: false});
      toast.success('تم إنشاء الخبر', {description: 'تم إنشاء الخبر بنجاح.'});
      options?.onSuccess?.(...args);
    }
  });
}

export function useUpdateArticle(options?: Omit<UseMutationOptions<AxiosResponse<NewsArticle>, Error, {id: string; data: UpdateNewsInput}>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<NewsArticle>, Error, {id: string; data: UpdateNewsInput}>({
    ...options,
    mutationKey: [...ARTICLES_KEY(), 'update'],
    mutationFn: updateArticle,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({queryKey: [ARTICLES_KEY()[0]], exact: false});
      toast.success('تم تعديل الخبر', {description: 'تم تعديل بيانات الخبر بنجاح.'});
      options?.onSuccess?.(...args);
    }
  });
}

export function useDeleteArticle(options?: Omit<UseMutationOptions<AxiosResponse, Error, {id: string}>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse, Error, {id: string}>({
    ...options,
    mutationKey: [...ARTICLES_KEY(), 'delete'],
    mutationFn: ({id}) => deleteArticle(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({queryKey: [ARTICLES_KEY()[0]], exact: false});
      toast.success('تم حذف الخبر', {description: 'تم حذف الخبر بنجاح.'});
      options?.onSuccess?.(...args);
    }
  });
}
