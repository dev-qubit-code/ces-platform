'use client';

import React, { JSX, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BrandBox from '@/components/brand-box';
import { Button, buttonVariants } from '@repo/ui/components/ui/button';
import { IconCamera, IconBook, IconBriefcase, IconUpload } from '@tabler/icons-react';
import { cn } from 'cn';
import { VariantProps } from 'class-variance-authority';
import { UploadType } from './_types/upload';
import { listOfRandomTags } from './_constants/upload';

import ExamForm from './_sections/exam-form';
import MemoirForm from './_sections/memoir-form';
import PortfolioForm from './_sections/portfolio-form';
import UploadTypeCard from './_components/upload-type-card';

function UploadContent() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');

  const initialType: UploadType = filterParam === 'test' || filterParam === 'exam' ? 'exam' : filterParam === 'memoir' ? 'memoir' : filterParam === 'portfolio' ? 'portfolio' : 'exam';
  const [activeType, setActiveType] = useState<UploadType>(initialType);

  const listOfButtonVariants: VariantProps<typeof buttonVariants>['variant'][] = ['website-white', 'website-ice-cream', 'website-white', 'website-white', 'website-vanilla'];

  const renderSection = () => {
    const sections: Record<UploadType, JSX.Element> = {
      exam: <ExamForm />,
      memoir: <MemoirForm />,
      portfolio: <PortfolioForm />
    };
    return sections[activeType];
  };

  return (
    <div className='custom-container py-10 space-y-10'>
      <BrandBox variant='light-green' className='w-full min-h-75 flex justify-between items-center p-12 overflow-hidden'>
        <div className='space-y-5 flex-2'>
          <span className='block font-medium'>الرئيسية / الرفع والمشاركة</span>
          <h1 className='text-5xl md:text-7xl mb-4 font-bold'>شـــارك زملاءك</h1>
          <p className='text-lg md:text-xl max-w-2xl leading-relaxed'>بدون تسجيل دخول. كل ما ترفعه يراجعه فريق الجمعية قبل ما يظهر للطلاب لضمان الجودة والفائدة.</p>
        </div>
        <div className='h-full hidden md:grid grid-cols-3 gap-2 items-center place-content-center relative me-8'>
          {listOfRandomTags.map((tag, index) => (
            <Button key={tag} variant={listOfButtonVariants[index]} className={cn('rounded-xl h-15 cursor-default pointer-events-none', index == 3 && 'col-span-2')}>
              {tag}
            </Button>
          ))}
        </div>
      </BrandBox>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <UploadTypeCard title='اختبار' subtitle='صور ورقة اختبار سابق' icon={<IconCamera size={28} stroke={2} />} isActive={activeType === 'exam'} onClick={() => setActiveType('exam')} />
        <UploadTypeCard title='ملزمة' subtitle='ملخصات ومذكرات دراسية' icon={<IconBook size={28} stroke={2} />} isActive={activeType === 'memoir'} onClick={() => setActiveType('memoir')} />
        <UploadTypeCard title='ملف أعمال' subtitle='أضف بياناتك لدليل الطلاب' icon={<IconBriefcase size={28} stroke={2} />} isActive={activeType === 'portfolio'} onClick={() => setActiveType('portfolio')} />
      </div>

      <BrandBox variant='default' className='p-8 md:p-10'>
        <div className='mb-8 border-b border-[#1C2A39]/10 pb-6'>
          <h2 className='text-3xl font-bold text-[#1C2A39]'>
            {activeType === 'exam' && 'تفاصيل الاختبار'}
            {activeType === 'memoir' && 'تفاصيل الملزمة'}
            {activeType === 'portfolio' && 'ملف الأعمال (Portfolio)'}
          </h2>
        </div>

        {renderSection()}

        <div className='mt-10 pt-8 flex justify-end'>
          <Button variant='website-primary' className='rounded-xl px-10 py-6 text-lg gap-2'>
            <IconUpload size={22} />
            رفع المحتوى
          </Button>
        </div>
      </BrandBox>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div className='p-10 text-center'>جاري التحميل...</div>}>
      <UploadContent />
    </Suspense>
  );
}