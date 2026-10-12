import {DataTable} from '@/components/app-table';
import {Input} from '@/components/ui/input';
import {useHeader} from '@/store/header-store';

import {StudentPortfoliosBreadcrumb, StudentPortfoliosColumns} from './helper';
import ViewStudentPortfolioForm from './components/view-student-portfolio';
import {useAppSheet} from '@/store/sheet-store';
import type {TStudentPortfolio} from './type';
import EditStudentPortfolioForm from './components/edit-student-portfolio';
import {useDeleteStudentInfo, useStudentInfos} from '@/api/student-infos';
import {useEffect, useState} from 'react';
import {useDebounce} from '@/hooks/use-debounce';
import {usePagination} from '@/hooks/use-pagination';
import {useAppDialog} from '@/store/dialog-store';
import {DeleteStudentPortfolio} from './components/delete-student-portfolio';

const StudentPortfolios = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const {setSheet, onClose} = useAppSheet();
  const {dialog, setDialog, onClose: onDialogClose} = useAppDialog();
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  const {data: response, isLoading} = useStudentInfos({page, pageSize, search: debouncedSearch}, {select: res => res.data});
  const {mutate: deleteStudentPortfolioMutate, isPending: isDeleteStudentPortfolioPending} = useDeleteStudentInfo();
  const paginationProps = usePagination({
    pagination: response,
    setPage,
    setPageSize
  });
  const data = response?.items || [];
  setBreadcrumb(StudentPortfoliosBreadcrumb);
  function onView(student: TStudentPortfolio) {
    setSheet({
      title: 'تفاصيل عمل الطالب',

      description: 'عرض بيانات العمل والتقنيات والروابط الخاصة بالطالب.',

      content: <ViewStudentPortfolioForm student={student} />,

      secondaryAction: {
        text: 'إغلاق'
      }
    });
  }
  function onEdit(student: TStudentPortfolio) {
    setSheet({
      title: 'تعديل عمل الطالب',

      description: 'قم بتعديل بيانات العمل ثم اضغط حفظ التعديلات.',

      content: <EditStudentPortfolioForm student={student} onClose={onClose} />,

      primaryAction: {
        text: 'حفظ التعديلات',
        formId: 'update-student-portfolio-form'
      },

      secondaryAction: {
        text: 'إلغاء'
      }
    });
  }

  useEffect(() => {
    if (!dialog) return;
    setDialog({...dialog, primaryAction: {...dialog.primaryAction!, text: isDeleteStudentPortfolioPending ? 'جاري حذف العمل' : 'حذف العمل', disabled: isDeleteStudentPortfolioPending}, secondaryAction: {...dialog.secondaryAction!, disabled: isDeleteStudentPortfolioPending}});
  }, [isDeleteStudentPortfolioPending]);

  function onDelete(student: TStudentPortfolio) {
    setDialog({
      title: 'حذف عمل الطالب',
      description: 'هذا الإجراء لا يمكن التراجع عنه.',
      content: <DeleteStudentPortfolio name={student.studentName} />,
      primaryAction: {
        text: 'حذف العمل',
        className: 'bg-destructive hover:bg-destructive/90',
        onClick: () => {
          deleteStudentPortfolioMutate(
            {id: student.id},
            {
              onSuccess: () => {
                onDialogClose();
              }
            }
          );
        }
      },
      secondaryAction: {disabled: isDeleteStudentPortfolioPending, text: 'إلغاء'}
    });
  }

  const columns = StudentPortfoliosColumns({onView, onEdit, onDelete});
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>أعمال الطلاب</h2>

          <p className='text-muted-foreground'>استعراض وإدارة أعمال الطلاب المضافة من الموقع مع إمكانية مراجعتها وتعديل بياناتها.</p>
        </div>
      </div>

      <div className='w-full'>
        <DataTable columns={columns} data={data} paginationProps={paginationProps} isLoading={isLoading} SearchElement={<Input value={search} onChange={e => setSearch(e.target.value)} placeholder='ابحث عن عمل طالب...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default StudentPortfolios;
