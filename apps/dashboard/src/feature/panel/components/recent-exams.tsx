import {Badge} from '@/components/ui/badge';
import {recentExamsData, resentStatus} from '../helper';

export function RecentExams() {
  return (
    <div className='space-y-8'>
      {recentExamsData.map(exam => (
        <div key={exam.id} className='flex items-center gap-4'>
          <div className='flex flex-1 flex-wrap items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-sm leading-none font-medium'>{exam.examTitle}</p>
              <p className='text-sm text-muted-foreground'>
                الحالة :{' '}
                <Badge variant={resentStatus[exam.status]}>
                  {exam.status == 'pending' && 'معلق'}
                  {exam.status == 'approved' && 'موافق علية'}
                  {exam.status == 'rejected' && 'مرفوق'}
                </Badge>
              </p>
            </div>
            <div className='text-sm font-medium text-muted-foreground'>{exam.timeAgo}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
