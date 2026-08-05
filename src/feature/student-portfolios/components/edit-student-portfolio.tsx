import {useForm, useFieldArray} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

import {Button} from '@/components/ui/button';
import {FieldGroup, FieldSet} from '@/components/ui/field';

import InputField from '@/components/form/input-field';

import {Plus, Trash} from 'lucide-react';
import type {TStudentPortfolio} from '../type';

const StudentPortfolioSchema = z.object({
  studentName: z.string().min(3),

  specialization: z.string().min(2),

  description: z.string().min(10),

  technologies: z.array(
    z.object({
      name: z.string().min(1)
    })
  ),

  links: z.array(
    z.object({
      key: z.string().min(1),
      value: z.string().url()
    })
  )
});

type StudentPortfolioFormValues = z.infer<typeof StudentPortfolioSchema>;

const EditStudentPortfolioForm = ({student, onClose}: {student: TStudentPortfolio; onClose: () => void}) => {
  const form = useForm<StudentPortfolioFormValues>({
    resolver: zodResolver(StudentPortfolioSchema),

    defaultValues: {
      studentName: student.studentName || '',
      specialization: student.specialization || '',
      description: student.description || '',

      technologies: student.technologies.map(item => ({name: item})),

      links: student.links
    }
  });

  const technologies = useFieldArray({
    control: form.control,
    name: 'technologies'
  });

  const links = useFieldArray({
    control: form.control,
    name: 'links'
  });

  function onSubmit(values: StudentPortfolioFormValues) {
    console.log(values);

    onClose();
  }

  return (
    <form id='update-student-portfolio-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='اسم الطالب' control={form.control} register={form.register('studentName')} />

          <InputField label='التخصص' control={form.control} register={form.register('specialization')} />

          <InputField label='النبذة' control={form.control} register={form.register('description')} />

          {/* Technologies */}

          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <h3 className='font-semibold'>التقنيات</h3>

              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() =>
                  technologies.append({
                    name: ''
                  })
                }
              >
                <Plus className='ml-2 h-4 w-4' />
                إضافة تقنية
              </Button>
            </div>

            {technologies.fields.map((field, index) => (
              <div key={field.id} className='flex items-end gap-2'>
                <InputField label={`التقنية ${index + 1}`} control={form.control} register={form.register(`technologies.${index}.name`)} />

                <Button type='button' variant='destructive' size='icon' onClick={() => technologies.remove(index)}>
                  <Trash className='h-4 w-4' />
                </Button>
              </div>
            ))}
          </div>

          {/* Links */}

          <div className='space-y-3 mt-5'>
            <div className='flex justify-between items-center'>
              <h3 className='font-semibold'>الروابط</h3>

              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() =>
                  links.append({
                    key: '',
                    value: ''
                  })
                }
              >
                <Plus className='ml-2 h-4 w-4' />
                إضافة رابط
              </Button>
            </div>

            {links.fields.map((field, index) => (
              <div key={field.id} className='grid grid-cols-[1fr_2fr_auto] items-end gap-2'>
                <InputField label='الاسم' control={form.control} register={form.register(`links.${index}.key`)} />

                <InputField label='الرابط' control={form.control} register={form.register(`links.${index}.value`)} />

                <Button type='button' variant='destructive' size='icon' onClick={() => links.remove(index)}>
                  <Trash className='h-4 w-4' />
                </Button>
              </div>
            ))}
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default EditStudentPortfolioForm;
