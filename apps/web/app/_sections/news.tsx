import BrandBox from '@/components/brand-box';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';

const NewsSection = () => {
  return (
    <div className='mt-20'>
      {/* Header */}
      <div className='flex justify-between mb-5'>
        <h2 className='text-5xl font-bold'>فعاليـــات الجمعية</h2>
        <Link href={'/news'}>
          <Button variant={'link'} className={'text-[#1468AE] font-bold'}>
            كل الأخبار
          </Button>
        </Link>
      </div>
      <div className='flex gap-5'>
        <BrandBox className='flex-1 flex flex-col gap-5 px-5 pt-4 pb-8'>
          <BrandBox variant='vanilla' className='w-full h-full'></BrandBox>
          <div>
            <Badge size={'lg'} className='bg-[#FFD9C9] text-[#8A2E0C] font-bold text-md rounded-lg'>
              مؤتمر
            </Badge>
            <h4 className='text-4xl font-bold'>[عنوان الخبر]</h4>
          </div>
          <p>[وصف مختصر للخبر في سطرين، والتفاصيل كاملة داخل صفحة الخبر.]</p>
        </BrandBox>
        {/* BrandBox Col */}
        <div className='flex flex-col gap-5'>
          <BrandBox className='flex-1 flex items-center gap-5 p-4'>
            <BrandBox variant='vanilla' className='w-40 h-50'></BrandBox>
            <div>
              <Badge size={'lg'} className='bg-[#FFD9C9] text-[#8A2E0C] font-bold text-md rounded-lg'>
                مؤتمر
              </Badge>
              <h4 className='text-2xl font-bold'>[عنوان الخبر]</h4>
              <p>[وصف مختصر للخبر في سطرين، والتفاصيل كاملة داخل صفحة الخبر.]</p>
            </div>
          </BrandBox>
          <BrandBox className='flex-1 flex items-center gap-5 p-4'>
            <BrandBox variant='vanilla' className='w-40 h-50'></BrandBox>
            <div>
              <Badge size={'lg'} className='bg-[#FFD9C9] text-[#8A2E0C] font-bold text-md rounded-lg'>
                مؤتمر
              </Badge>
              <h4 className='text-2xl font-bold'>[عنوان الخبر]</h4>
              <p>[وصف مختصر للخبر في سطرين، والتفاصيل كاملة داخل صفحة الخبر.]</p>
            </div>
          </BrandBox>
        </div>
      </div>
    </div>
  );
}

export default NewsSection