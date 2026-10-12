import {DataTable} from '@/components/app-table';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useAppSheet} from '@/store/sheet-store';
import {useAppDialog} from '@/store/dialog-store';
import {useHeader} from '@/store/header-store';
import AddMemoirForm from './components/add-memoir-form';
import EditMemoirForm from './components/edit-memoir-form';
import ViewMemoirForm from './components/view-memoir-form';
import {DeleteMemoirForm} from './components/delete-memoir';
import {GetMemoirsColumns, MemoirsBreadcrumb} from './helper';
import {useDeleteNote, useNotes} from '@/api/notes/api';
import {usePagination} from '@/hooks/use-pagination';
import {useDebounce} from '@/hooks/use-debounce';
const Memoirs = () => {
  const {setSheet, onClose} = useAppSheet();
  const {dialog, setDialog, onClose: onDialogClose} = useAppDialog();
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search);
  const {data: response, isLoading} = useNotes(
    {
      page,
      pageSize,
      search: searchDebounce
    },
    {
      select: data => data.data,
      placeholderData: preData => preData
    }
  );
  const {mutate: deleteNoteMutate, isPending: isDeleteNotePending} = useDeleteNote();
  const setPagination = usePagination({
    pagination: response,
    setPage,
    setPageSize
  });
  const data = response?.items;
  setBreadcrumb(MemoirsBreadcrumb);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [searchDebounce]);
  function onCreate() {
    setSheet({
      title: 'إضافة ملزمة',
      description: 'أدخل بيانات الملزمة ثم اضغط حفظ.',
      content: <AddMemoirForm onClose={onClose} />,
      primaryAction: {
        text: 'إضافة',
        formId: 'create-memoir-form'
      },
      secondaryAction: {
        text: 'إلغاء'
      }
    });
  }
  function onView(id: string) {
    setSheet({
      title: 'عرض الملزمة',
      description: 'عرض بيانات الملزمة.',
      content: <ViewMemoirForm id={id} />,
      secondaryAction: {
        text: 'إغلاق'
      }
    });
  }
  function onUpdate(id: string) {
    setSheet({
      title: 'تعديل الملزمة',
      description: 'أدخل بيانات الملزمة ثم اضغط حفظ.',
      content: <EditMemoirForm id={id} onClose={onClose} />,
      primaryAction: {
        text: 'تعديل',
        formId: 'edit-memoir-form'
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
        text: isDeleteNotePending ? 'جاري حذف الملزمة' : 'حذف الملزمة',
        disabled: isDeleteNotePending
      },
      secondaryAction: {
        ...dialog.secondaryAction!,
        disabled: isDeleteNotePending
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteNotePending]);
  function onDelete({id, name}: {id: string; name: string}) {
    setDialog({
      title: 'حذف الملزمة',
      description: 'هذا الإجراء لا يمكن التراجع عنه.',
      content: <DeleteMemoirForm name={name} />,
      primaryAction: {
        text: 'حذف الملزمة',
        className: 'bg-destructive hover:bg-destructive/90',
        onClick: () => {
          deleteNoteMutate(
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
        disabled: isDeleteNotePending,
        text: 'إلغاء'
      }
    });
  }
  const MemoirsColumns = GetMemoirsColumns({
    onView,
    onUpdate,
    onDelete
  });
  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>الملازم</h2>
          <p className='text-muted-foreground'>إدارة الملازم الدراسية وإضافة ملازم جديدة مع ربطها بالمادة والدكتور والسنة الدراسية.</p>
        </div>
        <Button onClick={onCreate}>
          <Plus className='mr-2 h-4 w-4' />
          إضافة ملزمة
        </Button>
      </div>
      <div className='w-full'>
        <DataTable columns={MemoirsColumns} data={data || []} paginationProps={setPagination} isLoading={isLoading} SearchElement={<Input value={search} onChange={event => setSearch(event.target.value)} placeholder='ابحث عن ملزمة...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};
export default Memoirs;
