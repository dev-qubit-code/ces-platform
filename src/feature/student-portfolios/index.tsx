import {DataTable} from '@/components/app-table';
import {Input} from '@/components/ui/input';
import {useHeader} from '@/store/header-store';

import {StudentPortfoliosBreadcrumb, StudentPortfoliosColumns, mockStudentPortfoliosData} from './helper';
import ViewStudentPortfolioForm from './components/view-student-portfolio';
import {useAppSheet} from '@/store/sheet-store';
import type {TStudentPortfolio} from './type';
import EditStudentPortfolioForm from './components/edit-student-portfolio';

const StudentPortfolios = () => {
  const {setSheet, onClose} = useAppSheet();
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
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
  const columns = StudentPortfoliosColumns({onView, onEdit});
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>أعمال الطلاب</h2>

          <p className='text-muted-foreground'>استعراض وإدارة أعمال الطلاب المضافة من الموقع مع إمكانية مراجعتها وتعديل بياناتها.</p>
        </div>
      </div>

      <div className='w-full'>
        <DataTable columns={columns} data={mockStudentPortfoliosData} SearchElement={<Input placeholder='ابحث عن عمل طالب...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default StudentPortfolios;
