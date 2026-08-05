import {DataTable} from '@/components/app-table';
import {Input} from '@/components/ui/input';

import {useHeader} from '@/store/header-store';

import {IssuesBreadcrumb, IssuesColumns, mockIssuesData} from './helper';

const Issues = () => {
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);

  setBreadcrumb(IssuesBreadcrumb);

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-3xl font-bold tracking-tight'>الشكاوى</h2>

        <p className='text-muted-foreground'>إدارة شكاوى المستخدمين ومتابعة حالتها.</p>
      </div>

      <div className='w-full'>
        <DataTable columns={IssuesColumns} data={mockIssuesData} SearchElement={<Input placeholder='ابحث عن شكوى...' className='w-full max-w-sm' />} />
      </div>
    </div>
  );
};

export default Issues;
