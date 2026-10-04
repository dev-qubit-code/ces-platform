import {DataTable} from '@/components/app-table';
import {Input} from '@/components/ui/input';
import {usePagination} from '@/hooks/use-pagination';
import {useDebounce} from '@/hooks/use-debounce';
import {useHeader} from '@/store/header-store';
import {useAppDialog} from '@/store/dialog-store';
import {useAppSheet} from '@/store/sheet-store';
import {useEffect, useState} from 'react';
import {useTests} from '@/api/tests';
import {TEST_STATUS} from '@/enum/test-status.enum';
import {PendingTestBreadcrumb, GetPendingTestColumns} from './helper';
import ViewTestForm from '../all/components/view-test-form';
import {useChangeTestStatus} from '@/api/tests/api';

const PendingTest = () => {
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);

  const {setSheet} = useAppSheet();
  const {dialog, setDialog, onClose: onDialogClose} = useAppDialog();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search);

  setBreadcrumb(PendingTestBreadcrumb);

  const {data: response, isLoading} = useTests(
    {
      page,
      pageSize,
      search: searchDebounce,
      Status: TEST_STATUS.pending
    },
    {
      select: data => data.data,
      placeholderData: preData => preData
    }
  );
  const {mutate: changeStatusMutate, isPending: isChangeStatusPending} = useChangeTestStatus();

  const paginationProps = usePagination({
    pagination: response,
    setPage,
    setPageSize
  });

  const data = response?.items;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [searchDebounce]);

  function onView(id: string) {
    setSheet({
      title: 'عرض الاختبار',
      description: 'عرض بيانات الاختبار بالكامل.',
      content: <ViewTestForm id={id} />,
      secondaryAction: {
        text: 'إغلاق'
      }
    });
  }

  function onApprove(id: string) {
    setDialog({
      title: 'اعتماد الاختبار',
      description: 'هل أنت متأكد من اعتماد هذا الاختبار؟',
      content: '',
      primaryAction: {
        text: 'اعتماد الاختبار',
        onClick: () => {
          changeStatusMutate({id, status: TEST_STATUS.approved}, {onSuccess: onDialogClose});
        }
      },
      secondaryAction: {
        text: 'إلغاء'
      }
    });
  }

  function onReject(id: string) {
    setDialog({
      title: 'رفض الاختبار',
      description: 'هل أنت متأكد من رفض هذا الاختبار؟',
      content: '',
      primaryAction: {
        text: 'رفض الاختبار',
        className: 'bg-destructive hover:bg-destructive/90',
        onClick: () => {
          changeStatusMutate({id, status: TEST_STATUS.notApproved}, {onSuccess: onDialogClose});
        }
      },
      secondaryAction: {
        text: 'إلغاء'
      }
    });
  }

  useEffect(() => {
    if (!dialog) return;
    setDialog({
      ...dialog,
      primaryAction: {
        ...dialog.primaryAction!,
        text: dialog.title === 'اعتماد الاختبار' ? (isChangeStatusPending ? 'جاري الاعتماد' : 'اعتماد الاختبار') : isChangeStatusPending ? 'جاري الرفض' : 'رفض الاختبار',
        disabled: isChangeStatusPending
      },
      secondaryAction: {
        ...dialog.secondaryAction!,
        disabled: isChangeStatusPending
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChangeStatusPending]);

  const columns = GetPendingTestColumns({
    onView,
    onApprove,
    onReject
  });

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>الاختبارات المعلقة</h2>

          <p className='text-muted-foreground'>استعرض الاختبارات التي تنتظر المراجعة والاعتماد في النظام.</p>
        </div>
      </div>

      <div className='w-full'>
        <DataTable columns={columns} data={data || []} paginationProps={paginationProps} isLoading={isLoading} SearchElement={<Input value={search} onChange={event => setSearch(event.target.value)} placeholder='ابحث عن اختبار معلق...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default PendingTest;
