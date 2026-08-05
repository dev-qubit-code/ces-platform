import React from 'react';
import {Controller, type Control, type FieldValues, type UseControllerProps} from 'react-hook-form';

import {Attachment, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentActions, AttachmentAction} from '@/components/ui/attachment';

import {Field, FieldError, FieldLabel} from '@/components/ui/field';
import {Input} from '@/components/ui/input';

import {FileCodeIcon, XIcon, UploadIcon} from 'lucide-react';
import {cn} from '@/lib/utils';

interface FileUploadFieldProps<T extends FieldValues> {
  label?: string;
  labelClassName?: string;
  className?: string;
  control: Control<T>;
  register: UseControllerProps<T>;
  accept?: string;
  multiple?: boolean;
}

function FileUploadField<T extends FieldValues>({label, labelClassName, className, control, register, accept, multiple = false}: FileUploadFieldProps<T>) {
  return (
    <Controller
      {...register}
      control={control}
      render={({field, fieldState: {error, invalid}}) => {
        const files = field.value ? (Array.isArray(field.value) ? field.value : [field.value]) : [];

        function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
          const selectedFiles = event.target.files;

          if (!selectedFiles) return;

          field.onChange(multiple ? Array.from(selectedFiles) : selectedFiles[0]);
        }

        function removeFile(index: number) {
          if (multiple) {
            const newFiles = files.filter((_, i) => i !== index);

            field.onChange(newFiles);
          } else {
            field.onChange(null);
          }
        }

        return (
          <Field className={cn(className)}>
            {label && <FieldLabel className={cn(labelClassName)}>{label}</FieldLabel>}

            <label
              className='
                flex cursor-pointer
                items-center justify-center
                rounded-lg border border-dashed
                p-6 text-sm
                hover:bg-muted
              '
            >
              <div className='flex flex-col items-center gap-2'>
                <UploadIcon className='h-5 w-5' />

                <span>اضغط لاختيار ملف</span>

                <span className='text-muted-foreground'>PDF, Images</span>
              </div>

              <Input type='file' className='hidden' accept={accept} multiple={multiple} onChange={handleChange} />
            </label>

            {files.length > 0 && (
              <AttachmentGroup className='mt-3'>
                {files.map((file: File, index: number) => (
                  <Attachment key={index}>
                    <AttachmentMedia>
                      <FileCodeIcon className='h-5 w-5' />
                    </AttachmentMedia>

                    <AttachmentContent>
                      <AttachmentTitle>{file.name}</AttachmentTitle>

                      <AttachmentDescription>{(file.size / 1024).toFixed(1)} KB</AttachmentDescription>
                    </AttachmentContent>

                    <AttachmentActions>
                      <AttachmentAction onClick={() => removeFile(index)}>
                        <XIcon className='h-4 w-4' />
                      </AttachmentAction>
                    </AttachmentActions>
                  </Attachment>
                ))}
              </AttachmentGroup>
            )}

            {invalid && <FieldError errors={[error]} />}
          </Field>
        );
      }}
    />
  );
}

export default FileUploadField;
