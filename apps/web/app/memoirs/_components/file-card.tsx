'use client';

import BrandBox from '@/components/brand-box';
import {IconDownload, IconEye} from '@tabler/icons-react';
import {cn} from 'cn';
import Image from 'next/image';
import PdfIcon from '@/public/pdf-icon.png';
import {Button} from '@repo/ui/components/ui/button';
import {Badge} from '@repo/ui/components/ui/badge';
import {useRouter} from 'next/navigation';

export type TMemories = {
  id: string;
  name: string;
  lectureName?: string;
  courseName?: string;
  link?: string;
};
interface FileCardProps {
  memory: TMemories;
  className?: string;
}

const FileCard = ({memory, className}: FileCardProps) => {
  const {id, name, lectureName, courseName, link} = memory;
  const router = useRouter();
  function onDownload() {
    // implement download logic here, for now we just navigate to the link if provided
    router.push(link || '');
  }
  function onView() {
    router.push(`memoirs/${id}`);
  }
  return (
    <BrandBox variant='default' className={cn('flex w-full items-center gap-4 rounded-xl p-3', className)}>
      {/* PDF icon */}
      <Image src={PdfIcon} alt='PDF' width={55} height={55} className='object-contain ' />

      {/* File information */}
      <div className='flex min-w-0 flex-1 flex-col items-start gap-2'>
        <h3 title={name} className='w-full truncate text-right text-xl leading-7 font-extrabold text-[#1C2A39]'>
          {name}
        </h3>

        <div className='flex max-w-full flex-wrap items-center gap-2'>
          <Badge size={'lg'} className='bg-[#DCEEFB] font-bold text-text-primary'>
            {lectureName}
          </Badge>

          <Badge size={'lg'} variant={'destructive-light'} className='font-bold text-[#7A2A0A]'>
            {courseName}
          </Badge>
        </div>
      </div>

      {/* Actions */}
      <div className='flex shrink-0 flex-col gap-3'>
        <Button variant={'website-primary'} onClick={onDownload} aria-label='تحميل الملف' className='flex rounded-xl size-10 items-center justify-center'>
          <IconDownload size={22} stroke={2.2} />
        </Button>

        <Button variant={'website-white'} onClick={onView} aria-label='عرض الملف' className='flex rounded-xl size-10 items-center justify-center'>
          <IconEye size={22} stroke={2} />
        </Button>
      </div>
    </BrandBox>
  );
};

export default FileCard;
