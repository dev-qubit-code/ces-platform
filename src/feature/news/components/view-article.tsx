import {useForm} from 'react-hook-form';
import {useArticleById} from '@/api/articles/api';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import TextareaField from '@/components/form/textarea-field';

type ViewArticleFormValues = {
  title: string;
  date: string;
  description: string;
};

export function ViewArticle({id}: {id: string}) {
  const {data, isLoading} = useArticleById(id, {select: response => response.data});
  const form = useForm<ViewArticleFormValues>({
    defaultValues: {title: '', date: '', description: ''},
    values: data
      ? {
          title: data.title,
          date: data.date.slice(0, 10),
          description: data.description
        }
      : undefined
  });

  return (
    <form id='view-article-form'>
      <FieldSet>
        <FieldGroup>
          <InputField label='عنوان الخبر' control={form.control} register={form.register('title')} props={{readOnly: true, disabled: isLoading}} />

          <InputField label='تاريخ الخبر' control={form.control} register={form.register('date')} props={{readOnly: true, disabled: isLoading, type: 'date'}} />

          <TextareaField label='وصف الخبر' control={form.control} register={form.register('description')} props={{readOnly: true, disabled: isLoading, rows: 5}} />
          
          {data?.thumbnailUrl && <img src={data.thumbnailUrl} alt={data.title} className='max-h-64 w-full rounded-lg object-cover' />}
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
