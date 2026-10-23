import BrandBox from '@/components/brand-box';
import Image from 'next/image';
import PaperBg from '@/public/home/paper.png';
import {Badge} from '@repo/ui/components/ui/badge';
import {Button} from '@repo/ui/components/ui/button';
import {IconMessage} from '@tabler/icons-react';
import Link from 'next/link';

export interface StudentItemProps {
  id: string;
  name: string;
  bio: string;
  technology: string[];
  whatsappNumber: string;
}

function StudentItem({name, id, technology, bio, whatsappNumber}: StudentItemProps) {
  return (
    <BrandBox className='w-full p-3 rounded-3xl'>
      <div className='flex justify-center items-center rounded-xl bg-[#FFF4CC] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.749),inset_4px_6px_12px_rgba(28,42,57,0.161)]'>
        <Image src={PaperBg} alt='Paper bg' className='object-cover' />
      </div>
      <div className='p-3'>
        <div className='flex items-start gap-3'>
          <BrandBox variant='purple' className='font-bold text-3xl size-12 flex items-center justify-center rounded-xl'>
            {name.charAt(0).toUpperCase()}
          </BrandBox>
          <div className='-space-y-1'>
            <h4 className='text-2xl font-bold'>{name}</h4>
            <p className='text-lg text-gray-700'>{bio}</p>
          </div>
        </div>
        <div className='flex items-center gap-2 my-2'>
          {technology.map((tech, index) => (
            <Badge key={index} size={'lg'} className='p-3 bg-[#F1EDFE] text-[#33287A] text-md font-bold rounded-lg'>
              {tech}
            </Badge>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <Link href={`students/${id}`} passHref className={'flex-1'}>
            <Button variant={'website-purple'} className={'w-full rounded-xl'}>
              عرض الأعمال
            </Button>
          </Link>
          <Link href={`https://wa.me/${whatsappNumber}`} target='_blank' rel='noopener noreferrer'>
            <Button variant={'website-white'}>
              <IconMessage className='size-6 rounded-xl' stroke={2} />
            </Button>
          </Link>
        </div>
      </div>
    </BrandBox>
  );
}
export default StudentItem;
