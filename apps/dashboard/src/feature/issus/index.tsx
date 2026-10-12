import {DataTable} from '@/components/app-table';
import {Input} from '@/components/ui/input';
import {useHeader} from '@/store/header-store';
import {useAppSheet} from '@/store/sheet-store';
import {IssuesBreadcrumb, GetIssuesColumns} from './helper';
import {useReports} from '@/api/issus';
import {usePagination} from '@/hooks/use-pagination';
import {useDebounce} from '@/hooks/use-debounce';
import {useEffect, useState} from 'react';
import ViewIssueForm from './components/view-issue-form';
const Issues = () => {
  const {setSheet} = useAppSheet();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search);
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  const {data: response, isLoading} = useReports(
    {page, pageSize, search: searchDebounce},
    {
      select: res => res.data,
      placeholderData: preData => preData
    }
  );
  const data = response?.items || [];
  const paginationProps = usePagination({
    pagination: response,
    setPage,
    setPageSize
  });
  setBreadcrumb(IssuesBreadcrumb);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [searchDebounce]);

  function onView(id: string) {
    setSheet({
      title: 'عرض الشكوى',
      description: 'تفاصيل الشكوى المحددة.',
      content: <ViewIssueForm id={id} />,
      secondaryAction: {
        text: 'إغلاق'
      }
    });
  }
  const IssuesColumns = GetIssuesColumns({
    onView
  });
  return (
    <div className='flex w-full flex-col gap-4'>
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
