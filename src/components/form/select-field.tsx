import {Field, FieldError, FieldLabel} from '../ui/field';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../ui/select';
import {Controller, type Control, type FieldValues, type UseControllerProps} from 'react-hook-form';
import {cn} from '@/lib/utils';

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

  props?: React.ComponentProps<typeof Select>;
}

function SelectField<T extends FieldValues>({label, labelClassName, className, selectClassName, control, register, placeholder, options, props}: SelectFieldProps<T>) {
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
            </SelectContent>
          </Select>

          {invalid && <FieldError errors={[error]} />}
        </Field>
      )}
    />
  );
}

export default SelectField;
