import {DataTable} from '@/components/app-table';
import {Input} from '@/components/ui/input';
import {mockTestData, TestColumns} from './helper';

const PendingTest = () => {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-3xl font-bold tracking-tight'>الاختبارات المعلقة</h2>
        <p className='text-muted-foreground'>استعرض الاختبارات التي تنتظر المراجعة والاعتماد في النظام.</p>
      </div>

      <div className='w-full'>
        <DataTable columns={TestColumns} data={mockTestData} SearchElement={<Input placeholder='ابحث عن اختبار معلق...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default PendingTest;
