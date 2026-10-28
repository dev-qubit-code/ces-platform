'use client';

import {Skeleton} from '@repo/ui/components/ui/skeleton';

interface FilesListSkeletonProps {
  count?: number;
}

function FileCardSkeleton() {
  return (
    <div className='flex w-full items-center gap-4 rounded-xl border p-3'>
      {/* PDF icon */}
      <Skeleton className='size-[55px] shrink-0 rounded-lg bg-muted-foreground/20' />

      {/* File information */}
      <div className='flex min-w-0 flex-1 flex-col items-start gap-2'>
        {/* File name */}
        <Skeleton className='h-7 w-3/4 rounded-md bg-muted-foreground/20' />

        {/* Badges */}
        <div className='flex max-w-full flex-wrap items-center gap-2'>
          <Skeleton className='h-7 w-24 rounded-lg bg-muted-foreground/20' />
          <Skeleton className='h-7 w-28 rounded-lg bg-muted-foreground/20' />
        </div>
      </div>

      {/* Actions */}
      <div className='flex shrink-0 flex-col gap-3'>
        <Skeleton className='size-10 rounded-xl bg-muted-foreground/20' />
        <Skeleton className='size-10 rounded-xl bg-muted-foreground/20' />
      </div>
    </div>
  );
}

function FilesListSkeleton({count = 9}: FilesListSkeletonProps) {
  return (
    <div className='flex-1'>
      {/* Item number and sort */}
      <div className='mb-4 flex items-center justify-between'>
        <Skeleton className='h-6 w-24 rounded-md bg-muted-foreground/20' />

        <div className='flex items-center gap-4'>
          <Skeleton className='h-5 w-14 rounded-md bg-muted-foreground/20' />
          <Skeleton className='h-10 w-40 rounded-lg bg-muted-foreground/20' />
        </div>
      </div>

      {/* Files grid */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({length: count}).map((_, index) => (
          <FileCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
export default FilesListSkeleton;
