import BrandBox from '@/components/brand-box';

interface NewsCoverProps {
  src: string;
  alt: string;
}

export function NewsCover({src, alt}: NewsCoverProps) {
  return (
    <BrandBox variant='default' className='relative mb-8 h-100 w-full overflow-hidden rounded-[48px]'>
      {/* //TODO : Replace with a proper image component */}
      <img src={src} alt={alt} className='object-cover size-full' />
    </BrandBox>
  );
}
