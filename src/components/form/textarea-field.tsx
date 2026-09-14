import React from 'react';
import {Controller, type Control, type FieldValues, type UseControllerProps} from 'react-hook-form';
import {Field, FieldError, FieldLabel} from '../ui/field';
import {Textarea} from '../ui/textarea';
import {cn} from '@/lib/utils';

interface TextareaFieldProps<T extends FieldValues> {
  label?: string;
  labelClassName?: string;
  textareaClassName?: string;
  className?: string;
  control: Control<T>;
  register: UseControllerProps<T>;
  placeholder?: string;
  props?: React.ComponentProps<'textarea'>;
}

function TextareaField<T extends FieldValues>({label, labelClassName, className, textareaClassName, placeholder, register, control, props}: TextareaFieldProps<T>) {
  return (
    <Controller
      {...register}
      control={control}
      render={({field, fieldState: {error, invalid}}) => (
        <Field className={cn(className)}>
          {label && (
            <FieldLabel htmlFor={props?.id} className={cn(labelClassName)}>
              {label}
            </FieldLabel>
          )}

          <Textarea {...field} placeholder={placeholder} {...props} className={cn(textareaClassName)} />

          {invalid && <FieldError errors={[error]} />}
        </Field>
      )}
    />
  );
}

export default TextareaField;
