import BrandBox from '@/components/brand-box';
import Image from 'next/image';
import PaperBg from '@/public/home/paper.png';
import {Badge} from '@repo/ui/components/ui/badge';

export type TestType = 'monthly' | 'midterm' | 'final';

export const TEST_TYPE: Record<TestType, string> = {
  monthly: 'شهري',
  midterm: 'نصفي',
  final: 'نهائي'
} as const;

export interface TTest {
  course: string;
  lecturer: string;
  type: TestType;
  date: string;
  image?: string;
}

function TestItem({lecturer, course, type, date}: TTest) {
  return (
    <BrandBox className='w-full min-h-70 p-3 rounded-3xl'>
      <div className='flex justify-center items-center rounded-xl bg-[#FFF4CC] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.749),inset_4px_6px_12px_rgba(28,42,57,0.161)]'>
        <Image src={PaperBg} alt='Paper bg' className='object-cover' />
      </div>
      <div className='p-3'>
        <h4 className='text-xl font-bold'>{course}</h4>
        <div className='flex items-center gap-2 mt-2 flex-wrap'>
          <Badge size={'lg'} className='p-2 bg-[#DCEEFB] text-text-primary text-sm'>
            {lecturer}
          </Badge>
          <Badge size='lg' variant='success-light' className='p-2 text-sm'>
            {TEST_TYPE[type]}
          </Badge>
          <Badge size='lg' variant='success-light' className='p-2 text-sm'>
            {date}
          </Badge>
        </div>
      </div>
    </BrandBox>
  );
}

export default TestItem;
