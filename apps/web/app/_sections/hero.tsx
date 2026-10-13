import BrandBox from '@/components/brand-box';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { IconSearch } from '@tabler/icons-react';
import Paper from '@/public/home/paper.png';
import Paper1 from '@/public/home/paper-1.png';
import PdfImage from '@/public/home/pdf-image.png';
import CodeBoxAndFunctionality from '../_components/code-box-and-functionalty';

import Image from 'next/image';

const HeroSection = () => {
  return (
    <>
      <div className='flex gap-5 mb-5'>
        <BrandBox variant='dark-blue' className='relative overflow-hidden p-12 flex-3'>
          <h1 className='text-8xl leading-[1.1] font-bold'>
            ذاكِـــر من
            <br />
            اختبارات اللي
            <br />
            قبلك
          </h1>
          <p className='text-text-secondary text-lg my-3'>اختبارات سابقة وملازم يرفعها طلاب هندسة الحاسوب، ويراجعها فريق الجمعية قبل ما توصلك.</p>
          {/* Search Input */}
          <BrandBox className='flex relative gap-3 items-center pe-2 ps-9 h-15 z-2'>
            <IconSearch className='text-gray-500 absolute right-4' />
            <Input placeholder='اسم المادة، مثلاً: نظم التشغيل' className='text-black text-lg! border-none focus-visible:ring-0 focus:none w-full' />
            <Button variant={'website-ice-cream'} className={'w-20 h-11 absolute top-1/2 -translate-y-1/2 left-4'}>
              ابحث
            </Button>
          </BrandBox>
          <BrandBox variant='light-blue' className='absolute rotate-30 top-10 left-15 rounded-xl w-16 h-15' />
          <BrandBox variant='ice-cream' className='absolute -bottom-15 -left-15  rounded-full w-50 h-50' />
        </BrandBox>
        <CodeBoxAndFunctionality />
      </div>
      <div className='flex gap-5'>
        <BrandBox variant='ice-cream' className='p-5 flex-5'>
          <h2 className='text-4xl font-bold mb-2'>الاختبـــارات</h2>
          <p className='text-lg'>
            صور اختبارات سابقة حسب <br />
            المستوى والمادة
          </p>
          <div className='relative h-40'>
            <Image src={Paper} alt='Paper' className='absolute top-0 left-5' />
            <Image src={Paper1} alt='Paper1' className='absolute top-0 left-0' />
          </div>
        </BrandBox>
        <BrandBox variant='vanilla' className='relative p-5 flex-3'>
          <h2 className='text-4xl font-bold mb-2'>المـــلازم</h2>
          <p className='text-lg'>ملخصات وشرائح جاهزة للتحميل</p>
          <Image src={PdfImage} width={150} alt='PdfImage' className='absolute bottom-0 left-1/2 -translate-x-1/2 mt-3' />
        </BrandBox>
        <BrandBox variant='purple' className='p-5 flex flex-col flex-5'>
          <h2 className='text-4xl font-bold mb-2'>دليـــل أعمال الطلاب</h2>
          <p className='text-lg'>تبحث عن مصمم أو مطور لمشروعك؟ شوف أعمال زملائك وتواصل معهم مباشرة.</p>
          <div className='mt-auto flex gap-2 flex-wrap'>
            <BrandBox className='flex justify-center items-center font-bold h-8 flex-1'>Python</BrandBox>
            <BrandBox className='flex justify-center items-center font-bold h-8 flex-1'>Linux</BrandBox>
            <BrandBox className='flex justify-center items-center font-bold h-8 flex-1'>Flutter</BrandBox>
            <BrandBox className='flex justify-center items-center font-bold h-8 flex-1'>React</BrandBox>
            <BrandBox className='flex justify-center items-center font-bold h-8 flex-1'>Figma</BrandBox>
          </div>
        </BrandBox>
      </div>
    </>
  );
}

export default HeroSection