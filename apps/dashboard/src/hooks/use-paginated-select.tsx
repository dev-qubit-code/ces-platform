import {useEffect, useState} from 'react';
import type {AxiosResponse} from 'axios';
import type {TPaginationResponse} from '@/api/type';
import {PAGE_SIZE} from '@/lib/constant';

type TWithId = {id: string};

type TUsePaginatedQueryHook<TParams, TItem> = (
  params: TParams & {page: number; pageSize: number},
  queryOption: {select: (data: AxiosResponse<TPaginationResponse<TItem>>) => TPaginationResponse<TItem>}
) => {
  data: TPaginationResponse<TItem> | undefined;
  isLoading: boolean;
  isFetching: boolean;
};

export function usePaginatedSelect<TItem extends TWithId, TParams extends Record<string, unknown> = Record<string, never>>(useQueryHook: TUsePaginatedQueryHook<TParams, TItem>, getLabel: (item: TItem) => string, params: TParams = {} as TParams) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<TItem[]>([]);

  const {data: res, isLoading, isFetching} = useQueryHook({...params, page, pageSize: PAGE_SIZE}, {select: data => data.data});

  useEffect(() => {
    if (!res) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(prev => {
      if (res.currentPage === 1) return res.items;
      const existingIds = new Set(prev.map(item => item.id));
      const newOnes = res.items.filter(item => !existingIds.has(item.id));
      return [...prev, ...newOnes];
    });
  }, [res]);

  const loadMore = () => {
    if (isFetching || !res?.hasNextPage) return;
    setPage(prev => prev + 1);
  };

  return {
    options: items.map(item => ({label: getLabel(item), value: item.id})),
    loadMore,
    isFirstLoading: isLoading && page === 1,
    isLoadingMore: isFetching && page > 1
  };
}
