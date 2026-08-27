import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

export interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function DataTablePagination({page, pageSize, total, onPageChange, onPageSizeChange}: DataTablePaginationProps) {
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className='flex items-center justify-between px-2'>
      <div className='text-sm text-muted-foreground'>{total} row(s)</div>

      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-2'>
          <p className='text-sm font-medium'>Rows per page</p>

          <Select value={String(pageSize)} onValueChange={value => onPageSizeChange(Number(value))}>
            <SelectTrigger className='h-8 w-18'>
              <SelectValue />
            </SelectTrigger>

            <SelectContent side='top'>
              {[10, 20, 25, 30, 40, 50].map(size => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='w-25 text-center text-sm font-medium'>
          Page {page} of {pageCount || 1}
        </div>

        <div className='flex items-center gap-2'>
          <Button variant='outline' size='icon' className='hidden size-8 lg:flex' onClick={() => onPageChange(1)} disabled={page <= 1}>
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft />
          </Button>

          <Button variant='outline' size='icon' className='size-8' onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft />
          </Button>

          <Button variant='outline' size='icon' className='size-8' onClick={() => onPageChange(page + 1)} disabled={page >= pageCount}>
            <span className='sr-only'>Go to next page</span>
            <ChevronRight />
          </Button>

          <Button variant='outline' size='icon' className='hidden size-8 lg:flex' onClick={() => onPageChange(pageCount)} disabled={page >= pageCount}>
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
