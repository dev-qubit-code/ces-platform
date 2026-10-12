import type {ColumnDef} from '@tanstack/react-table';
import {Edit, Eye, MoreHorizontal, Trash} from 'lucide-react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {formatDate} from '@/lib/utils';
import type {TBreadcrumb} from '@/components/header';
import type {NewsArticle} from './type';

export const NewsBreadcrumb: TBreadcrumb[] = [
  {title: 'الرئيسية', url: '/'},
  {title: 'الأخبار', url: '/news'}
];

export function getNewsColumns({onView, onUpdate, onDelete}: {onView: (id: string) => void; onUpdate: (id: string) => void; onDelete: (article: NewsArticle) => void}): ColumnDef<NewsArticle>[] {
  return [
    {accessorKey: 'thumbnailUrl', header: 'الغلاف', cell: ({row}) => (row.original.thumbnailUrl ? <img src={row.original.thumbnailUrl} alt='' className='h-12 w-20 rounded object-cover' /> : <span className='text-muted-foreground'>بدون صورة</span>)},
    {accessorKey: 'title', header: 'العنوان'},
    {accessorKey: 'description', header: 'الوصف', cell: ({row}) => <span className='line-clamp-2 max-w-md'>{row.original.description}</span>},
    {accessorKey: 'date', header: 'التاريخ', cell: ({row}) => formatDate(row.original.date)},
    {
      id: 'actions',
      header: 'الإجراءات',
      cell: ({row}) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent dir='rtl' align='end'>
            <DropdownMenuGroup>
              <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onView(row.original.id)}>
                <Eye className='ml-2 h-4 w-4' />
                عرض الخبر
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdate(row.original.id)}>
                <Edit className='ml-2 h-4 w-4' />
                تعديل
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(row.original)} className='text-destructive'>
                <Trash className='ml-2 h-4 w-4' />
                حذف
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];
}
