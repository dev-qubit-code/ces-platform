import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {FieldGroup, FieldSet} from '@/components/ui/field';
import InputField from '@/components/form/input-field';
import TextareaField from '@/components/form/textarea-field';
import FileUploadField from '@/components/form/file-upload-field';
import {useAppSheet} from '@/store/sheet-store';
import {useArticleById, useUpdateArticle} from '@/api/articles/api';
import type {UpdateNewsInput} from '../type';

const ArticleSchema = z.object({
  title: z.string().min(3, 'عنوان الخبر يجب أن يكون 3 أحرف على الأقل'),
  description: z.string().min(3, 'وصف الخبر مطلوب'),
  date: z.string().min(1, 'التاريخ مطلوب'),
  thumbnailFile: z.custom<File>().optional()
});

type ArticleFormValues = z.infer<typeof ArticleSchema>;

export default function EditArticleForm({id, onClose}: {id: string; onClose: () => void}) {
  const {sheet, setSheet} = useAppSheet();
  const {data: article, isLoading} = useArticleById(id, {select: response => response.data});
  const {mutate: updateArticle, isPending} = useUpdateArticle();
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: {title: '', description: '', date: '', thumbnailFile: undefined}
  });

  useEffect(() => {
    if (article) {
      form.reset({title: article.title, description: article.description, date: article.date.slice(0, 10), thumbnailFile: undefined});
    }
  }, [article, form]);

  useEffect(() => {
    if (!sheet) return;
    setSheet({
      ...sheet,
      primaryAction: {...sheet.primaryAction!, disabled: isPending, text: isPending ? 'جاري التعديل' : 'تعديل'},
      secondaryAction: {...sheet.secondaryAction!, disabled: isPending}
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  function onSubmit(values: ArticleFormValues) {
    updateArticle({id, data: values as UpdateNewsInput}, {onSuccess: onClose});
  }

  const disabled = isLoading || isPending;
  return (
    <form id='edit-article-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <InputField label='عنوان الخبر' control={form.control} register={form.register('title')} props={{disabled}} />
          <TextareaField label='وصف الخبر' control={form.control} register={form.register('description')} props={{disabled, rows: 5}} />
          <InputField label='تاريخ الخبر' control={form.control} register={form.register('date')} props={{type: 'date', disabled}} />
          <FileUploadField label='صورة الغلاف (اختياري)' control={form.control} register={{name: 'thumbnailFile'}} accept='image/*' />
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
