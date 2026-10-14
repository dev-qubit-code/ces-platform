'use client';
import {Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@repo/ui/components/ui/select';
import {cn} from 'cn';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  outerClassName?: string;
  disabled?: boolean;
};

const Select = ({label, placeholder = 'اختر', options, value, defaultValue, onValueChange, className, outerClassName, disabled}: SelectProps) => {
  const id = `select-${label}`;

  return (
    <div className={cn('flex w-full flex-col gap-2', outerClassName)}>
      <label htmlFor={id} className="text-right font-['Tajawal'] text-base leading-[19px] font-bold text-[#1C2A39]">
        {label}
      </label>

      <ShadcnSelect
        value={value}
        defaultValue={defaultValue}
        onValueChange={value => {
          if (value !== null) {
            onValueChange?.(value);
          }
        }}
        disabled={disabled}
      >
        <SelectTrigger id={id} className={cn('min-h-10 w-full rounded-2xl border-0 bg-[#EEF5FA] px-4 text-[#1C2A39] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.75),inset_4px_6px_12px_rgba(28,42,57,0.14)] focus:ring-2 focus:ring-[#D4A72C]/50 focus:ring-offset-0', className)}>
          <SelectValue>{options.find(option => option.value === (value ?? defaultValue))?.label ?? placeholder}</SelectValue>{' '}
        </SelectTrigger>

        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </div>
  );
};

export default Select;
