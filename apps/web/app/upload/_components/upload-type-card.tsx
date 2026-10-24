import React from 'react';
import BrandBox from '@/components/brand-box';
import {cn} from 'cn';

interface UploadTypeCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export default function UploadTypeCard({title, subtitle, icon, isActive, onClick}: UploadTypeCardProps) {
  return (
    <button onClick={onClick} className='w-full outline-none transition-transform active:scale-95'>
      <BrandBox variant={isActive ? 'ice-cream' : 'list-item'} className={cn('w-full p-4 flex items-start gap-4 transition-colors', isActive ? 'text-[#1C2A39]' : 'text-[#1C2A39]/60 hover:text-[#1C2A39]')}>
        <div className='bg-[#FBFDFF] rounded-[1.25rem] p-4 shadow-sm text-[#1C2A39] shrink-0'>{icon}</div>
        <div className='flex flex-col text-right'>
          <span className='text-2xl font-bold'>{title}</span>
          <span className='text-sm font-medium opacity-80 mt-1'>{subtitle}</span>
        </div>
      </BrandBox>
    </button>
  );
}
