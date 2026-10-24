import {Textarea as ShadcnTextarea} from '@repo/ui/components/ui/textarea';
import {cn} from 'cn';
import type {ComponentProps} from 'react';

type TextareaProps = ComponentProps<typeof ShadcnTextarea> & {
  label?: string;
  unstyled?: boolean;
};

export const TextareaClassName = 'min-h-32 resize-y rounded-2xl border-0 bg-[#EEF5FA] px-4 py-3 text-[#1C2A39] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.75),inset_4px_6px_12px_rgba(28,42,57,0.14)] placeholder:text-[#7F8B96] focus-visible:ring-2 focus-visible:ring-[#D4A72C]/50 focus-visible:ring-offset-0';

const Textarea = ({label, id, className, unstyled = false, ...props}: TextareaProps) => {
  const textareaId = id ?? `textarea-${label}`;

  return (
    <div className={cn('flex w-full flex-col gap-2', unstyled && 'contents')}>
      {label && (
        <label htmlFor={textareaId} className='text-base leading-4.75 font-bold text-[#1C2A39]'>
          {label}
        </label>
      )}

      <ShadcnTextarea {...props} id={textareaId} className={cn(!unstyled && TextareaClassName, unstyled && 'h-full w-full min-w-0 resize-none rounded-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0', className)} />
    </div>
  );
};

export default Textarea;
