import BrandBox from '@/components/brand-box';

interface StudentBioProps {
  bio: string;
}

export const StudentBio = ({bio}: StudentBioProps) => (
  <BrandBox variant='list-item' className='md:col-span-8 p-8 md:p-12 min-h-[320px] flex flex-col justify-center rounded-[2.5rem] group hover:bg-[#EEF5FA]/80 transition-colors duration-500'>
    <div className='text-[#1C2A39]/40 text-sm font-bold tracking-widest mb-6 flex items-center gap-4'>
      <span className='font-mono'>(02)</span>
      <span className='h-px w-12 bg-[#1C2A39]/20'></span>
      <span>الرؤية والتوجه</span>
    </div>
    <p className='text-3xl md:text-[2.75rem] leading-[1.4] text-[#1C2A39] font-black tracking-tighter'>{bio}</p>
  </BrandBox>
);
