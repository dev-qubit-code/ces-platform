import Select from '@/components/select';
import Input from '@/components/input';
import {examTypeOptions, subjectOptions, doctorOptions} from './../_constants/upload';

export default function ExamForm() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Input label='اسم الاختبار' placeholder='مثال: اختبار الميد تيرم 2023' />
        <Select label='نوع الاختبار' options={examTypeOptions} placeholder='اختر النوع' />
        <Select label='المادة' options={subjectOptions} placeholder='اختر المادة' />
        <Select label='الدكتور' options={doctorOptions} placeholder='اختر الدكتور' />
        <Input label='تاريخ الاختبار' type='date' />
      </div>
    </div>
  );
}
