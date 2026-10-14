import BrandBox from '@/components/brand-box';
import {Button} from '@repo/ui/components/ui/button';
import {IconUpload} from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';
import PaperImage from '@/public/tests/paper.png';
import PaperBgImage from '@/public/home/paper.png';

const BannerSection = () => {
  return (
    <BrandBox variant='ice-cream' className='w-full h-80 flex justify-between items-center p-10'>
      <div className='space-y-5 flex-2'>
        <span className='block'>الرئيسية / الاختبارات</span>
        <h1 className='text-7xl mb-6 font-bold'>الاختبـــارات السابقة</h1>
        <p className='text-xl text-gray-800'>صور اختبارات القسم من السنوات الماضية، رفعها الطلاب وراجعها فريق الجمعية.</p>
        <Button variant={'website-primary'} className={'rounded-xl'}>
          <IconUpload />
          ارفع اختباراً
        </Button>
      </div>
      <div className='h-full relative flex-1 me-8'>
        <Image src={PaperBgImage} width={200} alt='paper-bg' className='absolute top-0 left-0  object-cover' />
        <Image src={PaperImage} width={200} alt='paper' className='absolute top-0 left-4 object-cover' />
      </div>
    </BrandBox>
  );
};

export default BannerSection;
