import type {AxiosResponse} from 'axios';
import {useMutation, useQuery, type UseMutationOptions, type UseQueryOptions} from '@tanstack/react-query';
import {toast} from 'sonner';
import {api, queryClient, VERSION_ONE} from '../instance';
import {NOTES} from '../api-endpoint';
import type {TPaginationResponse} from '../type';
import type {TCreateNoteBody, TCreateNoteResponse, TNoteByIdResponse, TNoteResponse, TNotesParams, TUpdateNoteBody} from './type';
import {NotesDtoTransform} from './transform';
import type {TMemoir} from '@/feature/memoirs/type';

export const NOTES_KEY = (params?: TNotesParams) => ['NOTES', params] as const;

async function getAllNotes(params: TNotesParams) {
  const response = await api.get<TPaginationResponse<TNoteResponse>>(`${VERSION_ONE}/${NOTES}`, {params});
  return {
    ...response,
    data: {
      ...response.data,
      items: NotesDtoTransform(response.data.items)
    }
  };
}

async function getNoteById(id: string) {
  return api.get<TNoteByIdResponse>(`${VERSION_ONE}/${NOTES}/${id}`);
}

function createNote(body: TCreateNoteBody) {
  return api.post<TCreateNoteResponse>(`${VERSION_ONE}/${NOTES}`, body);
}

function updateNote({id, data}: {id: string; data: TUpdateNoteBody}) {
  return api.put<TNoteResponse>(`${VERSION_ONE}/${NOTES}/${id}`, data);
}

function deleteNote(id: string) {
  return api.delete<TNoteResponse>(`${VERSION_ONE}/${NOTES}/${id}`);
}

/* Hooks */

export function useNotes<TData = AxiosResponse<TPaginationResponse<TMemoir>>>(params: TNotesParams, queryOption?: Omit<UseQueryOptions<AxiosResponse<TPaginationResponse<TMemoir>>, Error, TData, ReturnType<typeof NOTES_KEY>>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TPaginationResponse<TMemoir>>, Error, TData, ReturnType<typeof NOTES_KEY>>({
    ...queryOption,
    queryKey: NOTES_KEY(params),
    queryFn: () => getAllNotes(params)
  });
}

export function useNoteById<TData = AxiosResponse<TNoteByIdResponse>>(id: string, queryOption?: Omit<UseQueryOptions<AxiosResponse<TNoteByIdResponse>, Error, TData>, 'queryKey' | 'queryFn'>) {
  return useQuery<AxiosResponse<TNoteByIdResponse>, Error, TData>({
    ...queryOption,
    queryKey: [NOTES_KEY()[0], id],
    queryFn: () => getNoteById(id)
  });
}

export function useCreateNote(option?: Omit<UseMutationOptions<AxiosResponse<TCreateNoteResponse>, Error, TCreateNoteBody>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<TCreateNoteResponse>, Error, TCreateNoteBody>({
    ...option,
    mutationKey: [...NOTES_KEY(), 'create'],
    mutationFn: data => createNote(data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [NOTES_KEY()[0]],
        exact: false
      });

      toast.success('تم إنشاء المذكرة', {
        description: 'تم إنشاء المذكرة بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}

export function useUpdateNote(
  option?: Omit<
    UseMutationOptions<
      AxiosResponse<TNoteResponse>,
      Error,
      {
        id: string;
        data: TUpdateNoteBody;
      }
    >,
    'mutationFn' | 'mutationKey'
  >
) {
  return useMutation<AxiosResponse<TNoteResponse>, Error, {id: string; data: TUpdateNoteBody}>({
    ...option,
    mutationKey: [...NOTES_KEY(), 'update'],
    mutationFn: ({id, data}) => updateNote({id, data}),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [NOTES_KEY()[0]],
        exact: false
      });

      toast.success('تم تعديل المذكرة', {
        description: 'تم تعديل بيانات المذكرة بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}

export function useDeleteNote(option?: Omit<UseMutationOptions<AxiosResponse<TNoteResponse>, Error, {id: string}>, 'mutationFn' | 'mutationKey'>) {
  return useMutation<AxiosResponse<TNoteResponse>, Error, {id: string}>({
    ...option,
    mutationKey: [...NOTES_KEY(), 'delete'],
    mutationFn: ({id}) => deleteNote(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [NOTES_KEY()[0]],
        exact: false
      });

      toast.success('تم حذف المذكرة', {
        description: 'تم حذف المذكرة بنجاح.'
      });

      option?.onSuccess?.(...args);
    }
  });
}
