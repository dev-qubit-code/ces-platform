import {Input as ShadcnInput} from '@repo/ui/components/ui/input';
import {cn} from 'cn';
import type {ComponentProps} from 'react';

type InputProps = ComponentProps<typeof ShadcnInput> & {
  label?: string;
  unstyled?: boolean;
};

export const InputClassName = 'h-13.5 rounded-2xl border-0 bg-[#EEF5FA] px-4 text-[#1C2A39] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.75),inset_4px_6px_12px_rgba(28,42,57,0.14)] placeholder:text-[#7F8B96] focus-visible:ring-2 focus-visible:ring-[#D4A72C]/50 focus-visible:ring-offset-0';

const Input = ({label, id, className, unstyled = false, ...props}: InputProps) => {
  const inputId = id ?? `input-${label}`;

  return (
    <div className={cn('flex w-full flex-col gap-2', unstyled && 'contents')}>
      {label && (
        <label htmlFor={inputId} className='text-base leading-4.75 font-bold text-[#1C2A39]'>
          {label}
        </label>
      )}

      <ShadcnInput {...props} id={inputId} className={cn(!unstyled && InputClassName, unstyled && 'h-full w-full min-w-0 rounded-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0', className)} />
    </div>
  );
};

export default Input;
