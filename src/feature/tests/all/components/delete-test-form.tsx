import {Trash2} from 'lucide-react';

type DeleteTestFormProps = {
  name: string;
};

export function DeleteTestForm({name}: DeleteTestFormProps) {
  return (
    <div className='space-y-5'>
      <div className='flex items-center gap-3 rounded-lg border px-4 py-3'>
        <div className='flex size-9 shrink-0 items-center justify-center rounded-md bg-destructive/10'>
          <Trash2 className='size-4 text-destructive' />
        </div>
        <div className='min-w-0'>
          <p className='truncate text-sm font-medium'>{name}</p>
          <p className='text-xs text-muted-foreground'>الاختبار المحدد</p>
        </div>
      </div>
      <div className='space-y-2'>
        <p className='text-sm font-medium'>هل تريد حذف هذا الاختبار؟</p>
        <p className='text-sm leading-6 text-muted-foreground'>سيتم حذف الاختبار وبياناته المرتبطة من النظام. لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.</p>
      </div>
    </div>
  );
}
