'use client';
import BrandBox from '@/components/brand-box';
import {Badge} from '@repo/ui/components/ui/badge';
import {cn} from 'cn';

interface NewsContentProps {
  title: string;
  description: string;
  status: string;
  formattedDate: string;
}

export function NewsContent({title, description, formattedDate, status}: NewsContentProps) {
  const isExpired = status === 'منتهي';

  return (
    <BrandBox variant='default' className='p-8 h-full'>
      <div className='mb-6 flex items-center gap-3'>
        <Badge size='lg' className={cn('p-3 text-sm font-bold', isExpired ? 'bg-destructive/10 text-destructive' : 'bg-[#D6F3E4] text-success')}>
          {status}
        </Badge>
        <Badge size='lg' className='bg-[#CFE8F8] p-3 text-sm font-bold text-black'>
          {formattedDate}
        </Badge>
      </div>

      <h1 className='mb-6 text-4xl font-bold leading-relaxed text-[#1C2A39]'>{title}</h1>

      <div className='text-lg leading-loose text-gray-700 whitespace-pre-wrap'>{description}</div>
    </BrandBox>
  );
}
