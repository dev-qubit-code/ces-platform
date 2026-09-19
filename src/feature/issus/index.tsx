import {DataTable} from '@/components/app-table';
import {Input} from '@/components/ui/input';

import {useHeader} from '@/store/header-store';

import {IssuesBreadcrumb, IssuesColumns} from './helper';
import {useReports} from '@/api/issus';
import {usePagination} from '@/hooks/use-pagination';
import {useState} from 'react';
import {useDebounce} from '@/hooks/use-debounce';

const Issues = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  const searchDebounce = useDebounce(search);

  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  const {data: res, isLoading} = useReports({page, pageSize, search: searchDebounce}, {select: res => res.data, placeholderData: preData => preData});
  const data = res?.items || [];
  const paginationProps = usePagination({
    pagination: res,
    setPage,
    setPageSize
  });
  setBreadcrumb(IssuesBreadcrumb);

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-3xl font-bold tracking-tight'>الشكاوى</h2>

        <p className='text-muted-foreground'>إدارة شكاوى المستخدمين ومتابعة حالتها.</p>
      </div>

      <div className='w-full'>
        <DataTable columns={IssuesColumns} data={data} isLoading={isLoading} paginationProps={paginationProps} SearchElement={<Input value={search} onChange={event => setSearch(event.target.value)} placeholder='ابحث عن شكوى...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default Issues;
