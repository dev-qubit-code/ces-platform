import BrandBox from '@/components/brand-box';
import {Button} from '@repo/ui/components/ui/button';
import Image from 'next/image';
import PaperImage from '@/public/tests/paper.png';
import PaperBgImage from '@/public/home/paper.png';
import Input, {InputClassName} from '@/components/input';
import {cn} from 'cn';

const BannerSection = () => {
  return (
    <BrandBox variant='vanilla' className='w-full h-80 flex justify-between items-center p-10'>
      <div className='space-y-5 flex-2'>
        <span className='block'>الرئيسية / الملازم</span>
        <h1 className='text-7xl mb-6 font-bold'>المـــلازم والملخصات</h1>
        <p className='text-xl text-gray-800'>ملازم المواد وملخصاتها وشرائح المحاضرات، جاهزة للعرض والتحميل.</p>
        <div className={cn('max-w-150 flex items-center relative p-2', InputClassName)}>
          <Input unstyled />
          <Button className='w-20'>ابحث</Button>
        </div>
      </div>
      <div className='h-full relative flex-1 me-8'>
        <Image src={PaperBgImage} width={200} alt='paper-bg' className='absolute top-0 left-0  object-cover' />
        <Image src={PaperImage} width={200} alt='paper' className='absolute top-0 left-4 object-cover' />
      </div>
    </BrandBox>
  );
};

export default BannerSection;
