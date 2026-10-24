import React from 'react';
import BannerSection from './_sections/banner';
import BrandBox, { boxVariants } from '@/components/brand-box';
import Input from '@/components/input';
import Textarea from '@/components/textarea';
import {Button} from '@repo/ui/components/ui/button';
import ReportForm from './_sections/report-form';
interface IStep {
    text: string;
    variant: keyof typeof boxVariants;
}
const listOfStep: IStep[] = [
    { text: 'يوصل البلاغ للوحة تحكم الأدمن والمندوبين.', variant: 'light-blue' },
    { text: 'يراجعونه ويصلحون المحتوى، أو يتواصلون معك لو احتاجوا تفاصيل.', variant: 'ice-cream' },
    { text: 'تتغير حالة البلاغ، وتتابعها برقمه.', variant: 'light-green' }
];
const page = () => {
  return (
    <div className='custom-container'>
      <BannerSection />
      <div className='flex items-start gap-5 mt-10'>
        <ReportForm />
        <BrandBox variant='black' className='p-5 max-w-90 rounded-2xl'>
          <h2 className='text-3xl'>وش يصير بعد الإرسال؟</h2>
          <ul className='space-y-5 mt-5'>
            {listOfStep.map((step, index) => {
              return (
                <div key={index} className='flex items-start gap-3'>
                  <BrandBox variant={step.variant} className='min-w-10 flex justify-center items-center text-black font-bold text-lg min-h-10 rounded-xl'>{index + 1}</BrandBox>
                  <li className='text-lg text-gray-300'>{step.text}</li>
                </div>
              );
            })}
          </ul>
        </BrandBox>
      </div>
    </div>
  );
};

export default page;
