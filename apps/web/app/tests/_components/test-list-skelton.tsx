import React from 'react';

import {Skeleton} from '@repo/ui/components/ui/skeleton';

interface TestsSkeletonProps {
  count?: number;
}

function TestItemSkeleton() {
  return (
    <div className='w-full min-h-70 p-3 rounded-3xl border'>
      {/* Image */}
      <Skeleton className={`w-full h-36 rounded-xl bg-muted-foreground/20`} />

      {/* Content */}
      <div className='p-3 space-y-3'>
        {/* Course */}
        <Skeleton className={`h-6 w-3/4 bg-muted-foreground/20`} />

        {/* Badges */}
        <div className='flex items-center gap-2 flex-wrap'>
          <Skeleton className={`h-9 w-24 rounded-lg bg-muted-foreground/20`} />

          <Skeleton className={`h-9 w-16 rounded-lg bg-muted-foreground/20`} />

          <Skeleton className={`h-9 w-20 rounded-lg bg-muted-foreground/20`} />
        </div>
      </div>
    </div>
  );
}

function TestsListSkeleton({count = 6}: TestsSkeletonProps) {
  return (
    <div className='flex-1'>
      {/* Item number and sort */}
      <div className='flex items-center justify-between mb-4'>
        <Skeleton className={`h-6 w-28 bg-muted-foreground/20`} />

        <div className='flex items-center gap-4'>
          <Skeleton className={`h-5 w-14 bg-muted-foreground/20`} />

          <Skeleton className={`h-10 w-40 rounded-lg bg-muted-foreground/20`} />
        </div>
      </div>

      {/* Tests grid */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({length: count}).map((_, index) => (
          <TestItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export default TestsListSkeleton;
