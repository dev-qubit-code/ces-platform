'use client';
import type {TPaginationResponse} from '@/api/type';
import {useDebounce} from '@repo/ui/hooks/use-debounce';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useEffect, type Dispatch, type SetStateAction} from 'react';

interface UsePaginationProps<T> {
  pagination?: TPaginationResponse<T>;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
}

export function usePagination<T>({pagination, setPage, setPageSize}: UsePaginationProps<T>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPageDebounce = useDebounce(pagination?.currentPage ?? 1, 300);
  const currentPageSizeDebounce = useDebounce(pagination?.pageSize ?? 10, 300);
  const router = useRouter();
  useEffect(() => {
    const url = new URLSearchParams(searchParams.toString());
    url.set('page', String(currentPageDebounce));
    url.set('pageSize', String(currentPageSizeDebounce));
    const queryString = url.toString();
    router.push(!!currentPageSizeDebounce || !!currentPageDebounce ? `${pathname}?${queryString}` : pathname);
  }, [currentPageDebounce, currentPageSizeDebounce, pathname]);

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
