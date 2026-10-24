'use client';

import {useEffect, useState} from 'react';
import BrandBox from '@/components/brand-box';
import Image from 'next/image';
import PaperBg from '@/public/home/paper.png';
import {Badge} from '@repo/ui/components/ui/badge';
import {cn} from 'cn';

export interface NewsItemProps {
  title: string;
  description: string;
  date: string;
}

function NewsItem({title, description, date}: NewsItemProps) {
  const [isExpired, setIsExpired] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsExpired(new Date(date).getTime() < Date.now());
  }, [date]);

  const formattedDate = new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`));

  const status = isExpired === null ? null : isExpired ? 'منتهي' : 'قادم';

  return (
    <BrandBox className='w-full rounded-3xl p-3'>
      <div className='flex items-center justify-center rounded-xl bg-[#FFF4CC] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.749),inset_4px_6px_12px_rgba(28,42,57,0.161)]'>
        <Image src={PaperBg} alt='Paper bg' className='object-cover' />
      </div>

      <div className='p-3'>
        <h4 className='mb-1 text-xl font-bold'>{title}</h4>

        <p className='max-h-20 overflow-hidden text-ellipsis text-sm text-muted-foreground'>{description}</p>

        <div className='mt-2 flex items-center gap-2'>
          {status && (
            <Badge size='lg' className={cn('p-3 text-sm font-bold', isExpired ? 'bg-destructive/10 text-destructive' : 'bg-[#D6F3E4] text-success')}>
              {status}
            </Badge>
          )}

          <Badge size='lg' className='bg-[#CFE8F8] p-3 text-sm font-bold text-black'>
            {formattedDate}
          </Badge>
        </div>
      </div>
    </BrandBox>
  );
}

export default NewsItem;
