import type {TPaginationResponse} from '@/api/type';
import type {Dispatch, SetStateAction} from 'react';

interface UsePaginationProps<T> {
  pagination?: TPaginationResponse<T>;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
}

export function usePagination<T>({pagination, setPage, setPageSize}: UsePaginationProps<T>) {
  if (!pagination) return undefined;
  return {
    page: pagination.currentPage,
    pageSize: pagination.pageSize,
    total: pagination.totalCount,
    totalPages: pagination.totalPages,
    hasPreviousPage: pagination.hasPreviousPage,
    hasNextPage: pagination.hasNextPage,
    onPageChange: setPage,
    onPageSizeChange: setPageSize
  };
}
