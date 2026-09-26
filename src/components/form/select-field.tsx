import {Field, FieldError, FieldLabel} from '../ui/field';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../ui/select';
import {Controller, type Control, type FieldValues, type UseControllerProps} from 'react-hook-form';
import {cn} from '@/lib/utils';
import {useCallback, useEffect, useRef} from 'react';
import {IconLoader2} from '@tabler/icons-react';

interface SelectOption {
  label: string;
  value: string;
}
interface SelectFieldProps<T extends FieldValues> {
  label?: string;
  labelClassName?: string;
  className?: string;
  selectClassName?: string;
  control: Control<T>;
  register: UseControllerProps<T>;
  placeholder?: string;
  options: SelectOption[];
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  props?: React.ComponentProps<typeof Select>;
}

function SelectField<T extends FieldValues>({label, labelClassName, className, selectClassName, control, register, placeholder, options, onLoadMore, isLoadingMore, props}: SelectFieldProps<T>) {
  const onLoadMoreRef = useRef(onLoadMore);
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelCallbackRef = useCallback((node: HTMLDivElement | null) => {
    // نظّف أي observer قديم أول شي
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!node) return; // العنصر اتشال من الـ DOM (السلكت اتقفل)

    // العنصر دخل الـ DOM (السلكت فتح) → اربط observer جديد
    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          onLoadMoreRef.current?.();
        }
      },
      {root: null, threshold: 0, rootMargin: '100px'}
    );

    observerRef.current.observe(node);
  }, []);

  return (
    <Controller
      {...register}
      control={control}
      render={({field, fieldState: {error, invalid}}) => (
        <Field className={cn(className)}>
          {label && <FieldLabel className={cn(labelClassName)}>{label}</FieldLabel>}

          <Select {...props} value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className={cn(selectClassName)}>
              <SelectValue placeholder={placeholder}>{options.find(option => option.value === field.value)?.label}</SelectValue>
            </SelectTrigger>

            <SelectContent dir='rtl'>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
              {isLoadingMore && (
                <SelectItem value='loading-more' disabled>
                  <IconLoader2 className='animate-spin mx-auto' />
                </SelectItem>
              )}
              {onLoadMore && <div ref={sentinelCallbackRef} style={{height: 1}} />}
            </SelectContent>
          </Select>

          {invalid && <FieldError errors={[error]} />}
        </Field>
      )}
    />
  );
}

export default SelectField;
