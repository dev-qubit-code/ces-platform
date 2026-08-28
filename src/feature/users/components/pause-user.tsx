import {PowerOff} from 'lucide-react';

import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';

import type {TStatus} from '../type';
import { userStatusMapper } from '../helper';

type PauseUserFormProps = {
  name: string;
  status: TStatus;
};

export function PauseUserForm({name, status}: PauseUserFormProps) {
  const statusInfo = userStatusMapper[status];

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between rounded-lg border px-4 py-3'>
        <div className='flex min-w-0 items-center gap-3'>
          <div className='flex size-9 shrink-0 items-center justify-center rounded-md bg-muted'>
            <PowerOff className='size-4 text-muted-foreground' />
          </div>

          <div className='min-w-0'>
            <p className='truncate text-sm font-medium'>{name}</p>
            <p className='text-xs text-muted-foreground'>حالة الحساب</p>
          </div>
        </div>

        <Badge variant={statusInfo.badgeVariant}>{statusInfo.label}</Badge>
      </div>

      <Separator />

      <div className='space-y-2'>
        <p className='text-sm font-medium'>{statusInfo.messageTitle}</p>

        <p className='text-sm leading-6 text-muted-foreground'>{statusInfo.message}</p>
      </div>
    </div>
  );
}
