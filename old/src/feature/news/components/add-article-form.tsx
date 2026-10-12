import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import TextareaField from '@/components/form/textarea-field';
import FileUploadField from '@/components/form/file-upload-field';
import {useAppSheet} from '@/store/sheet-store';
import {useCreateArticle} from '@/api/articles/api';
import type {CreateNewsInput} from '../type';

const ArticleSchema = z.object({
  title: z.string().min(3, 'عنوان الخبر يجب أن يكون 3 أحرف على الأقل'),
  description: z.string().min(3, 'وصف الخبر مطلوب'),
  date: z.string().min(1, 'التاريخ مطلوب'),
  thumbnailFile: z.custom<File>().optional()
});

type ArticleFormValues = z.infer<typeof ArticleSchema>;

export default function AddArticleForm({onClose}: {onClose: () => void}) {
  const {sheet, setSheet} = useAppSheet();
  const {mutate: createArticle, isPending} = useCreateArticle();
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: {title: '', description: '', date: '', thumbnailFile: undefined}
  });

  useEffect(() => {
    if (!sheet) return;
    setSheet({
      ...sheet,
      primaryAction: {...sheet.primaryAction!, disabled: isPending, text: isPending ? 'جاري الإضافة' : 'إضافة'},
      secondaryAction: {...sheet.secondaryAction!, disabled: isPending}
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  function onSubmit(values: ArticleFormValues) {
    createArticle(values as CreateNewsInput, {onSuccess: onClose});
  }

  return (
    <form id='create-article-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='عنوان الخبر' control={form.control} register={form.register('title')} props={{disabled: isPending}} />
          <TextareaField label='وصف الخبر' control={form.control} register={form.register('description')} props={{disabled: isPending, rows: 5}} />
          <InputField label='تاريخ الخبر' control={form.control} register={form.register('date')} props={{type: 'date', disabled: isPending}} />
          <FileUploadField label='صورة الغلاف' control={form.control} register={{name: 'thumbnailFile'}} accept='image/*' />
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
