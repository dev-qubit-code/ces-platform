import {useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';

import * as z from 'zod';

import {FieldGroup, FieldSet} from '@/components/ui/field';

import InputField from '@/components/form/input-field';

import TextareaField from '@/components/form/textarea-field';

import {useReportById} from '@/api/issus';

import {formatDate} from '@/lib/utils';

const ViewIssueSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  createdAt: z.string()
});

type ViewIssueFormValues = z.infer<typeof ViewIssueSchema>;

const ViewIssueForm = ({id}: {id: string}) => {
  const {data: issue, isLoading} = useReportById(id, {
    select: data => data.data
  });

  const form = useForm<ViewIssueFormValues>({
    resolver: zodResolver(ViewIssueSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: '',
      createdAt: ''
    },
    values: issue
      ? {
          title: issue.title,
          description: issue.description,
          priority: issue.priority,
          createdAt: formatDate(issue.createdAt)
        }
      : undefined
  });

  return (
    <form id='view-issue-form'>
      <FieldSet>
        <FieldGroup>
          <InputField label='نص الشكوى' control={form.control} props={{readOnly: true, disabled: isLoading}} register={form.register('title')} />

          <TextareaField label='وصف الشكوى' control={form.control} props={{readOnly: true, disabled: isLoading}} register={form.register('description')} />

          <InputField label='الأولوية' control={form.control} props={{readOnly: true, disabled: isLoading}} register={form.register('priority')} />

          <InputField label='تاريخ الإضافة' control={form.control} props={{readOnly: true, disabled: isLoading}} register={form.register('createdAt')} />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default ViewIssueForm;
