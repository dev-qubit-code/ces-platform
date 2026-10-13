import BrandBox from '@/components/brand-box';
import CodeBox from '@/components/code-box';
import { Button } from '@repo/ui/components/ui/button';
import React from 'react'
import EditableCode from '../_components/editable-code';
import Image from 'next/image';
import LogoImage from '@/public/ces-logo.png';

const AboutUsSections = () => {
  return (
    <div className='flex gap-5 mt-10'>
      <BrandBox className='flex-2 p-8'>
        <div className='flex items-center gap-4'>
          <Image src={LogoImage} alt='LogoImage' width={40} />
          <h4 className='text-2xl font-bold'>جمعية هندســـة الحاسوب</h4>
        </div>
        <p className='text-lg my-5'>[نبذة عن الجمعية] — مثال: جمعية طلابية لطلاب قسم هندسة الحاسوب في [اسم الجامعة]، تنظّم الدورات والفعاليات وتجمع المصادر الدراسية في مكان واحد.</p>
        <Button variant={'link'} className='text-[#1468AE] font-bold'>
          تعرّف على الجمعية
        </Button>
      </BrandBox>
      <BrandBox variant='black' className='flex-3 flex gap-10 p-10'>
        <div className='space-y-4'>
          <h4 className='text-2xl font-bold'>هذه المنصـــة بناها طلاب من الجمعية</h4>
          <p className='text-lg text-gray-400 max-w-80'>فريق متطوع صمّم وبرمج كل صفحة هنا. تعرّف عليهم وتواصل معهم لو عندك مشروع.</p>
          <Button variant={'website-primary'}>قابل فريق المطورين</Button>
        </div>
        <div className='flex-1'>
          <CodeBox className='h-50' hasActionWindow>
            <EditableCode
              initialCode={`$ git log --oneline
a3f9c1 add exams filters
7b21e4 student portfolio page
c08d5a news section
19ee70 init ces platform`}
              language='shell'
            />
          </CodeBox>
        </div>
      </BrandBox>
    </div>
  );
}

export default AboutUsSections;