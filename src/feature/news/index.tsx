import {useEffect, useState} from 'react';
import {Plus} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {DataTable} from '@/components/app-table';
import {useAppDialog} from '@/store/dialog-store';
import {useAppSheet} from '@/store/sheet-store';
import {useHeader} from '@/store/header-store';
import {useDebounce} from '@/hooks/use-debounce';
import {usePagination} from '@/hooks/use-pagination';
import {useArticles} from '@/api/articles/api';
import type {NewsArticle} from './type';
import {NewsBreadcrumb, getNewsColumns} from './helper';
import AddArticleForm from './components/add-article-form';
import EditArticleForm from './components/edit-article-form';
import {DeleteArticle} from './components/delete-article';
import {ViewArticle} from './components/view-article';

const News = () => {
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  const {setSheet, onClose: closeSheet} = useAppSheet();
  const {setDialog} = useAppDialog();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const {data: response, isLoading} = useArticles({page, pageSize, search: debouncedSearch}, {select: result => result.data, placeholderData: previous => previous});
  const pagination = usePagination({pagination: response, setPage, setPageSize});
  setBreadcrumb(NewsBreadcrumb);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [debouncedSearch]);
  function openCreate() {
    setSheet({
      title: 'إضافة خبر',
      description: 'أدخل بيانات الخبر ثم اضغط حفظ.',
      content: <AddArticleForm onClose={closeSheet} />,
      primaryAction: {text: 'إضافة', formId: 'create-article-form'},
      secondaryAction: {text: 'إلغاء'}
    });
  }
  function openEdit(id: string) {
    setSheet({
      title: 'تعديل الخبر',
      description: 'عدّل بيانات الخبر ثم اضغط حفظ.',
      content: <EditArticleForm id={id} onClose={closeSheet} />,
      primaryAction: {text: 'تعديل', formId: 'edit-article-form'},
      secondaryAction: {text: 'إلغاء'}
    });
  }
  function openDelete(article: NewsArticle) {
    setDialog({
      title: 'حذف الخبر',
      description: 'هذا الإجراء لا يمكن التراجع عنه.',
      content: <DeleteArticle id={article.id} title={article.title} />,
      primaryAction: {text: 'حذف الخبر', className: 'bg-destructive hover:bg-destructive/90'},
      secondaryAction: {text: 'إلغاء'}
    });
  }
  const columns = getNewsColumns({onView: id => setSheet({title: 'عرض الخبر', description: 'عرض بيانات الخبر.', content: <ViewArticle id={id} />, secondaryAction: {text: 'إغلاق'}}), onUpdate: openEdit, onDelete: openDelete});
  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight'>الأخبار</h2>
          <p className='text-muted-foreground'>إدارة أخبار الجمعية وإضافة الأخبار وتعديلها.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className='mr-2 h-4 w-4' />
          إضافة خبر
        </Button>
      </div>
      <DataTable columns={columns} data={response?.items ?? []} isLoading={isLoading} paginationProps={pagination} SearchElement={<Input value={search} onChange={event => setSearch(event.target.value)} placeholder='ابحث عن خبر...' className='w-full max-w-sm' />} />
    </div>
  );
};

export default News;
