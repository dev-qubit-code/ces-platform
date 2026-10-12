import {Trash2} from 'lucide-react';
import {useEffect} from 'react';
import {useAppDialog} from '@/store/dialog-store';
import {useDeleteArticle} from '@/api/articles/api';

export function DeleteArticle({id, title}: {id: string; title: string}) {
  const {dialog, setDialog, onClose} = useAppDialog();
  const {mutate: deleteArticle, isPending} = useDeleteArticle();

  function handleDelete() {
    deleteArticle({id}, {onSuccess: onClose});
  }

  useEffect(() => {
    if (!dialog) return;
    setDialog({
      ...dialog,
      primaryAction: {...dialog.primaryAction!, disabled: isPending, text: isPending ? 'جاري الحذف' : 'حذف الخبر', onClick: handleDelete},
      secondaryAction: {...dialog.secondaryAction!, disabled: isPending}
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  return (
    <div className='space-y-5'>
      <div className='flex items-center gap-3 rounded-lg border px-4 py-3'>
        <div className='flex size-9 shrink-0 items-center justify-center rounded-md bg-destructive/10'>
          <Trash2 className='size-4 text-destructive' />
        </div>
        <div>
          <p className='text-sm font-medium'>{title}</p>
          <p className='text-xs text-muted-foreground'>الخبر المحدد</p>
        </div>
      </div>
      <div className='space-y-2'>
        <p className='text-sm font-medium'>هل تريد حذف هذا الخبر؟</p>
        <p className='text-sm leading-6 text-muted-foreground'>لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.</p>
      </div>
    </div>
  );
}
