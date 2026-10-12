'use client';

import {useState, type ReactNode} from 'react';
import {flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState} from '@tanstack/react-table';
import {Settings2} from 'lucide-react';

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {DataTablePagination, type DataTablePaginationProps} from './app-pagenation';
import {IconLoader2} from '@tabler/icons-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  emptyMessage?: string;
  SearchElement?: ReactNode;
  paginationProps?: DataTablePaginationProps;
}

export function DataTable<TData, TValue>({columns, data, SearchElement, isLoading, paginationProps, emptyMessage = 'لا توجد بيانات لعرضها.'}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        {SearchElement ? SearchElement : <div />}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='outline' size='sm' className='ml-auto flex h-9'>
              <Settings2 className='mr-2 h-4 w-4' />
              الأعمدة
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-37.5'>
            {table
              .getAllColumns()
              .filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem key={column.id} className='capitalize' checked={column.getIsVisible()} onCheckedChange={value => column.toggleVisibility(!!value)}>
                    {(column.columnDef.header as string) || column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* الجدول */}
      <div className='rounded-md border bg-card text-card-foreground shadow-sm'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-48 text-center'>
                  <div className='flex items-center justify-center gap-2 text-muted-foreground'>
                    <IconLoader2 className='h-6 w-6 animate-spin' />
                    <span>جاري تحميل البيانات...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className='hover:bg-muted/50 data-[state=selected]:bg-muted'>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='py-3'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-32 text-center text-muted-foreground'>
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paginationProps && <DataTablePagination {...paginationProps} />}
    </div>
  );
}
