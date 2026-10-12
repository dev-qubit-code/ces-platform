import {DataTable} from '@/components/app-table';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useAppSheet} from '@/store/sheet-store';
import {useAppDialog} from '@/store/dialog-store';
import {useHeader} from '@/store/header-store';
import AddLecturersForm from './components/add-lecturers-form';
import EditLecturersForm from './components/edit-lecturers-form';
import {DeleteLecturersForm} from './components/delete-lecturers';
import {GetLecturersColumns, LecturersBreadcrumb} from './helper';
import {useTeachers, useDeleteTeacher} from '@/api/teacher/api';
import {usePagination} from '@/hooks/use-pagination';
import {useDebounce} from '@/hooks/use-debounce';

const Lecturers = () => {
  const {setSheet, onClose} = useAppSheet();
  const {dialog, setDialog, onClose: onDialogClose} = useAppDialog();
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search);
  const {data: response, isLoading} = useTeachers(
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
  const {mutate: deleteTeacherMutate, isPending: isDeleteTeacherPending} = useDeleteTeacher();
  const setPagination = usePagination({
    pagination: response,
    setPage,
    setPageSize
  });
  const data = response?.items;
  setBreadcrumb(LecturersBreadcrumb);
  // To change page to 1 when searching
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [searchDebounce]);
  function onCreate() {
    setSheet({
      title: 'إضافة دكتور',
      description: 'أدخل بيانات الدكتور ثم اضغط حفظ.',
      content: <AddLecturersForm onClose={onClose} />,
      primaryAction: {
        text: 'إضافة',
        formId: 'create-lecturers-form'
      },
      secondaryAction: {
        text: 'إلغاء'
      }
    });
  }
  function onUpdate(id: string) {
    setSheet({
      title: 'تعديل الدكتور',
      description: 'أدخل بيانات الدكتور ثم اضغط حفظ.',
      content: <EditLecturersForm id={id} onClose={onClose} />,
      primaryAction: {
        text: 'تعديل',
        formId: 'edit-lecturers-form'
      },
      secondaryAction: {
        text: 'إلغاء'
      }
    });
  }
  // Delete Teacher Action
  useEffect(() => {
    if (!dialog) return;

    setDialog({
      ...dialog,
      primaryAction: {
        ...dialog.primaryAction!,
        text: isDeleteTeacherPending ? 'جاري حذف الدكتور' : 'حذف الدكتور',
        disabled: isDeleteTeacherPending
      },
      secondaryAction: {
        ...dialog.secondaryAction!,
        disabled: isDeleteTeacherPending
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteTeacherPending]);

  function onDelete({id, name}: {id: string; name: string}) {
    setDialog({
      title: 'حذف الدكتور',
      description: 'هذا الإجراء لا يمكن التراجع عنه.',
      content: <DeleteLecturersForm name={name} />,
      primaryAction: {
        text: 'حذف الدكتور',
        className: 'bg-destructive hover:bg-destructive/90',
        onClick: () => {
          deleteTeacherMutate(
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
        disabled: isDeleteTeacherPending,
        text: 'إلغاء'
      }
    });
  }

  const LecturersColumns = GetLecturersColumns({
    onUpdate,
    onDelete
  });

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>الدكاترة</h2>

          <p className='text-muted-foreground'>استعراض الدكاترة وإحصائيات المواد والاختبارات والملازم المرتبطة بكل دكتور.</p>
        </div>

        <Button onClick={onCreate}>
          <Plus className='mr-2 h-4 w-4' />
          إضافة دكتور
        </Button>
      </div>

      <div className='w-full'>
        <DataTable columns={LecturersColumns} data={data || []} paginationProps={setPagination} isLoading={isLoading} SearchElement={<Input value={search} onChange={event => setSearch(event.target.value)} placeholder='ابحث عن دكتور...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default Lecturers;
