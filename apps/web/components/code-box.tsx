import React from 'react';
import BrandBox from './brand-box';
import {cn} from 'cn';

interface CodeBoxProps {
  fileName?: string;
  hasActionWindow?: boolean;
  children?: React.ReactNode;
  className?: string;
}
const CodeBox = ({fileName, className, children, hasActionWindow}: CodeBoxProps) => {
  return (
    <BrandBox dir='ltr' variant='black' className={cn('p-4', className)}>
      {(fileName || hasActionWindow) && (
        <div className='flex gap-x-3 items-center justify-start'>
          {hasActionWindow && (
            <div className='flex gap-1'>
              <div className='w-3 h-3 rounded-full bg-[#FFB79C]' />
              <div className='w-3 h-3 rounded-full bg-[#F7D774]' />
              <div className='w-3 h-3 rounded-full bg-[#8EDCB5]' />
            </div>
          )}
          {fileName && <div className='rounded-lg text-sm py-0.5 px-2 bg-[#2A3A4D]'>{fileName}</div>}
        </div>
      )}
      {children}
    </BrandBox>
  );
};

export default CodeBox;
