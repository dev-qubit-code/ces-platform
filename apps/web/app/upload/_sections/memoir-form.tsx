import Select from '@/components/select';
import Input from '@/components/input';
import {subjectOptions, doctorOptions} from './../_constants/upload';

export default function MemoirForm() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='md:col-span-2'>
          <Input label='اسم الملزمة' placeholder='مثال: ملخص الشابتر الأول والثاني' />
        </div>
        <Select label='المادة' options={subjectOptions} placeholder='اختر المادة' />
        <Select label='الدكتور' options={doctorOptions} placeholder='اختر الدكتور' />
        <Input label='تاريخ الملزمة' type='date' />
      </div>
    </div>
  );
}
