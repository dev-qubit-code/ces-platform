import {DataTable} from '@/components/app-table';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {useAppSheet} from '@/store/sheet-store';
import AddLecturersForm from './components/add-lecturers-form';
import {LecturersBreadcrumb, LecturersColumns as lecturersColumns, mockLecturersData} from './helper';
import {useHeader} from '@/store/header-store';

const Lecturers = () => {
  const {setSheet, onClose} = useAppSheet();
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  setBreadcrumb(LecturersBreadcrumb);
  function onClick() {
    setSheet({
      title: 'إضافة دكتور',
      description: 'أدخل بيانات الدكتور ثم اضغط حفظ.',
      content: <AddLecturersForm onClose={onClose} />,
      primaryAction: {
        text: 'اضاقة',
        formId: 'create-lecturers-form'
      },
      secondaryAction: {text: 'الغاء'}
    });
  }
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>الدكاترة</h2>
          <p className='text-muted-foreground'>استعراض الدكاترة وإحصائيات المواد والاختبارات والملازم المرتبطة بكل دكتور.</p>{' '}
        </div>
        <Button onClick={onClick}>
          <Plus className='mr-2 h-4 w-4' />
          إضافة دكتور
        </Button>
      </div>

      <div className='w-full'>
        <DataTable columns={lecturersColumns} data={mockLecturersData} SearchElement={<Input placeholder='ابحث عن دكتور...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default Lecturers;
