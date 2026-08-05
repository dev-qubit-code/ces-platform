import {DataTable} from '@/components/app-table';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {CourseColumns, CoursesBreadcrumb, mockCourseData} from './helper';
import {useAppSheet} from '@/store/sheet-store';
import AddCourseForm from './components/add-course-form';
import {useHeader} from '@/store/header-store';

const Courses = () => {
  const {setSheet, onClose} = useAppSheet();
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  setBreadcrumb(CoursesBreadcrumb);
  function onClick() {
    setSheet({
      title: 'إضافة مادة',
      description: 'أدخل بيانات المادة الجديدة ثم اضغط حفظ.',
      content: <AddCourseForm onClose={onClose} />,
      primaryAction: {
        text: 'اضاقة',
        formId: 'create-course-form'
      },
      secondaryAction: {text: 'الغاء'}
    });
  }
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>المواد الدراسية</h2>
          <p className='text-muted-foreground'>إدارة المواد الدراسية المستخدمة لتصنيف الاختبارات والملازم في النظام.</p>
        </div>
        <Button onClick={onClick}>
          <Plus className='mr-2 h-4 w-4' />
          إضافة مادة
        </Button>
      </div>

      <div className='w-full'>
        <DataTable columns={CourseColumns} data={mockCourseData} SearchElement={<Input placeholder='ابحث عن مادة...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default Courses;
