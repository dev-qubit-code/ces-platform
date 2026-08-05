import {DataTable} from '@/components/app-table';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import AddMemoirForm from './components/add-memoir-form';
import {LecturersBreadcrumb} from '../lecturers/helper';
import {useHeader} from '@/store/header-store';
import {useAppSheet} from '@/store/sheet-store';
import {MemoirsColumns, mockMemoirsData} from './helper';
import { Input } from '@/components/ui/input';

const Memoirs = () => {
  const {setSheet, onClose} = useAppSheet();
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  setBreadcrumb(LecturersBreadcrumb);
  function onClick() {
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
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>الملازم</h2>
          <p className='text-muted-foreground'>إدارة الملازم الدراسية وإضافة ملازم جديدة مع ربطها بالمادة والدكتور والسنة الدراسية.</p>
        </div>

        <Button onClick={onClick}>
          <Plus className='mr-2 h-4 w-4' />
          إضافة ملزمة
        </Button>
      </div>

      <div className='w-full'>
        <DataTable columns={MemoirsColumns} data={mockMemoirsData} SearchElement={<Input placeholder='ابحث عن ملزمة...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default Memoirs;
