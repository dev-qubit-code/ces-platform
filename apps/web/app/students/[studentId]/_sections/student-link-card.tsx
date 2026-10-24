import Link from 'next/link';
import {IconArrowUpLeft} from '@tabler/icons-react';
import BrandBox from '@/components/brand-box';
import { StudentLink } from '../_types';
import { getLinkDetails } from '../_lib/student-helpers';

interface StudentLinkCardProps {
  link: StudentLink;
  index: number;
}

export const StudentLinkCard = ({link, index}: StudentLinkCardProps) => {
  const {icon, variant} = getLinkDetails(link.key, link.name);
  const isDark = variant === 'black' || variant === 'dark-blue';

  return (
    <Link href={link.key} target='_blank' rel='noopener noreferrer' className='block outline-none h-full group'>
      <BrandBox variant={variant} className='p-8 h-[280px] flex flex-col justify-between rounded-[2.5rem] hover:scale-[0.97] hover:rounded-[3rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer relative overflow-hidden'>
        <div className='flex justify-between items-start z-10 w-full'>
          <div className='text-sm font-bold tracking-widest opacity-50 flex flex-col gap-2'>
            <span className='font-mono'>0{index + 4}</span>
            <span className='h-px w-8 bg-current'></span>
          </div>
          <div className={`p-3.5 rounded-full backdrop-blur-md ${isDark ? 'bg-white/10 text-white/50 group-hover:text-white group-hover:bg-white/20' : 'bg-black/5 text-black/40 group-hover:text-black group-hover:bg-black/10'} transition-all duration-500`}>
            <IconArrowUpLeft size={32} stroke={1.5} className='transform group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]' />
          </div>
        </div>
        <div className='z-10 mt-auto'>
          <div className={`${isDark ? 'text-white/40' : 'text-black/30'} mb-6 transform group-hover:-translate-y-3 group-hover:opacity-0 transition-all duration-500 absolute`}>{icon}</div>
          <h3 className={`text-3xl md:text-4xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#1C2A39]'} transform group-hover:-translate-y-2 transition-transform duration-500 delay-75`}>{link.name}</h3>
        </div>
      </BrandBox>
    </Link>
  );
};
