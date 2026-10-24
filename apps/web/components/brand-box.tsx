import {cn} from 'cn';
import React from 'react';

export const boxVariants = {
  default: 'bg-[#FBFDFF] drop-shadow-[0_10px_1px_#C7DAEA] shadow-[inset_-8px_-10px_18px_#4682B41F,inset_8px_8px_16px_#FFFFFFF2] rounded-[48px]',
  'dark-blue': 'bg-[#1670B8] shadow-[0_10px_0_#0E4E84,inset_10px_10px_20px_rgba(255,255,255,0.258824),inset_-10px_-12px_22px_rgba(6,58,104,0.4)] rounded-[48px] text-white',
  'light-blue': 'bg-[#8FCDF2] shadow-[0_10px_0_#4C9FD3,inset_10px_10px_20px_rgba(255,255,255,0.6),inset_-10px_-12px_22px_rgba(40,125,180,0.301961)] rounded-[48px]',
  'ice-cream': 'bg-[#F7D774] shadow-[0_10px_0_#CFA52A,inset_10px_10px_20px_rgba(255,255,255,0.619608),inset_-10px_-12px_22px_rgba(190,140,10,0.278431)] rounded-[40px]',
  vanilla: 'bg-[#FFB79C] shadow-[0_10px_0_#DB7653,inset_10px_10px_20px_rgba(255,255,255,0.54902),inset_-10px_-12px_22px_rgba(215,100,65,0.278431)] rounded-[40px]',
  purple: 'bg-[#BBA9FF] shadow-[0_10px_0_#8A70E8,inset_10px_10px_20px_rgba(255,255,255,0.501961),inset_-10px_-12px_22px_rgba(95,70,200,0.278431)] rounded-[40px]',
  'light-green': 'bg-[#8EDCB5] shadow-[0_10px_0_#46AE80,inset_10px_10px_20px_rgba(255,255,255,0.580392),inset_-10px_-12px_22px_rgba(35,140,95,0.278431)] rounded-[48px]',
  black: 'bg-[#2A323C] shadow-[0_10px_0_#14191F,inset_10px_10px_20px_rgba(255,255,255,0.0784314),inset_-10px_-12px_22px_rgba(0,0,0,0.4)] rounded-[44px] text-white',
  'list-item': 'bg-[#EEF5FA] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.74902),inset_4px_6px_12px_rgba(28,42,57,0.160784)] text-black p-2 rounded-[22px]'
};
export interface BrandBoxProps {
  className?: string;
  variant?: keyof typeof boxVariants;
  children?: React.ReactNode;
  dir?: 'ltr' | 'rtl';
}
const BrandBox = ({className, dir = 'rtl', variant, children}: BrandBoxProps) => {
  return (
    <div dir={dir} className={cn('rounded-4xl', boxVariants[variant || 'default'], className)}>
      {children}
    </div>
  );
};

export default BrandBox;
