import {DataTable} from '@/components/app-table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Plus} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useAppDialog} from '@/store/dialog-store';
import {useAppSheet} from '@/store/sheet-store';
import {useHeader} from '@/store/header-store';
import {AllTestBreadcrumb, GetTestColumns} from './helper';
import AddTestForm from './components/add-test-form';
import EditTestForm from './components/edit-test-form';
import ViewTestForm from './components/view-test-form';
import {DeleteTestForm} from './components/delete-test-form';
import {useDeleteTest, useTests} from '@/api/tests/api';
import {usePagination} from '@/hooks/use-pagination';
import {useDebounce} from '@/hooks/use-debounce';
import {TEST_STATUS} from '@/enum/test-status.enum';

const AllTest = () => {
  const {setSheet, onClose} = useAppSheet();
  const {dialog, setDialog, onClose: onDialogClose} = useAppDialog();
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search);

  const {data: response, isLoading} = useTests(
    {
      page,
      pageSize,
      search: searchDebounce,
      Status: TEST_STATUS.none
    },
    {
      select: data => data.data,
      placeholderData: preData => preData
    }
  );

  const {mutate: deleteTestMutate, isPending: isDeleteTestPending} = useDeleteTest();

  const paginationProps = usePagination({
    pagination: response,
    setPage,
    setPageSize
  });

  const data = response?.items;

  setBreadcrumb(AllTestBreadcrumb);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [searchDebounce]);

  function onCreate() {
    setSheet({
      title: 'إضافة اختبار',
      description: 'أدخل بيانات الاختبار ثم اضغط حفظ.',
      content: <AddTestForm onClose={onClose} />,
      primaryAction: {
        text: 'إضافة',
        formId: 'create-test-form'
      },
      secondaryAction: {
        text: 'إلغاء'
      }
    });
  }

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

  function onUpdate(id: string) {
    setSheet({
      title: 'تعديل الاختبار',
      description: 'عدل بيانات الاختبار ثم اضغط حفظ.',
      content: <EditTestForm id={id} onClose={onClose} />,
      primaryAction: {
        text: 'تعديل',
        formId: 'edit-test-form'
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
        text: isDeleteTestPending ? 'جاري حذف الاختبار' : 'حذف الاختبار',
        disabled: isDeleteTestPending
      },
      secondaryAction: {
        ...dialog.secondaryAction!,
        disabled: isDeleteTestPending
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteTestPending]);

  function onDelete({id, name}: {id: string; name: string}) {
    setDialog({
      title: 'حذف الاختبار',
      description: 'هذا الإجراء لا يمكن التراجع عنه.',
      content: <DeleteTestForm name={name} />,
      primaryAction: {
        text: 'حذف الاختبار',
        className: 'bg-destructive hover:bg-destructive/90',
        onClick: () => {
          deleteTestMutate(
            {id},
            {
              onSuccess: () => {
                onDialogClose();
              }
            }
          );
        }
      },
      secondaryAction: {
        disabled: isDeleteTestPending,
        text: 'إلغاء'
      }
    });
  }

  const columns = GetTestColumns({
    onView,
    onUpdate,
    onDelete
  });

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>إدارة الاختبارات</h2>
          <p className='text-muted-foreground'>استعرض جميع الاختبارات المرفوعة في النظام. يمكنك البحث، الفلترة، ومراجعة حالة كل اختبار بسهولة.</p>
        </div>

        <Button onClick={onCreate}>
          <Plus className='mr-2 h-4 w-4' />
          إضافة اختبار
        </Button>
      </div>

      <div className='w-full'>
        <DataTable columns={columns} data={data || []} paginationProps={paginationProps} isLoading={isLoading} SearchElement={<Input value={search} onChange={event => setSearch(event.target.value)} placeholder='ابحث عن اختبار...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default AllTest;
