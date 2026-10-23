'use client';
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
  const status = new Date(date) < new Date() ? 'منتهي' : 'قادم';
  return (
    <BrandBox className='w-full p-3 rounded-3xl'>
      <div className='flex justify-center items-center rounded-xl bg-[#FFF4CC] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.749),inset_4px_6px_12px_rgba(28,42,57,0.161)]'>
        <Image src={PaperBg} alt='Paper bg' className='object-cover' />
      </div>
      <div className='p-3'>
        <h4 className='text-xl font-bold mb-1'>{title}</h4>
        <p className='text-sm text-muted-foreground max-h-20 overflow-hidden text-ellipsis'>{description}</p>
        <div className='flex items-center gap-2 mt-2'>
          <Badge size={'lg'} className={cn('p-3 font-bold text-sm', status === 'منتهي' ? 'bg-destructive/10 text-destructive' : 'bg-[#D6F3E4] text-success')}>
            {status}
          </Badge>
          <Badge size={'lg'} className='p-3 font-bold text-sm bg-[#CFE8F8] text-black'>
            {new Date(date).toLocaleDateString('ar-EG', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            })}
          </Badge>
        </div>
      </div>
    </BrandBox>
  );
}
export default NewsItem;
