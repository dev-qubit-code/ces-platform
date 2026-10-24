import Link from 'next/link';
import {IconArrowRight} from '@tabler/icons-react';
import BrandBox from '@/components/brand-box';

interface StudentHeroProps {
  major: string;
  name: string;
}

export const StudentHero = ({major, name}: StudentHeroProps) => (
  <BrandBox variant='black' className='md:col-span-12 p-8 md:p-12 min-h-112.5 flex flex-col justify-between relative overflow-hidden group rounded-[2.5rem]'>
    <div className='relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/10 pb-6'>
      <Link href='/students' className='flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-500 font-bold text-sm tracking-widest group/link'>
        <IconArrowRight className='transform group-hover/link:translate-x-2 transition-transform duration-500' size={22} stroke={1.5} />
        <span>[ العودة لدليل الطلاب ]</span>
      </Link>
      <div className='flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-2 rounded-full border border-white/10'>
        <span className='relative flex size-2.5'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full size-2.5 bg-green-500'></span>
        </span>
        <span className='text-white/90 text-xs font-bold tracking-widest mt-1'>متاح للتوظيف</span>
      </div>
    </div>
    <div className='relative z-10 mt-12 flex flex-col items-start w-full'>
      <div className='text-white/40 text-sm font-bold tracking-widest mb-4 flex items-center gap-4'>
        <span className='font-mono'>(01)</span>
        <span className='h-px w-12 bg-white/20'></span>
        <span>{major}</span>
      </div>
      <h1 className='text-[12vw] md:text-[7.5vw] lg:text-[6.5vw] font-black text-white leading-[0.9] tracking-tighter hover:tracking-tight transition-all duration-700 ease-in-out cursor-default w-full'>{name}</h1>
    </div>
  </BrandBox>
);
