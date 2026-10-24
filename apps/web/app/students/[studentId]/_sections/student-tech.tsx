import BrandBox from '@/components/brand-box';

interface StudentTechProps {
  technologies: string[];
}

export const StudentTech = ({technologies}: StudentTechProps) => (
  <BrandBox variant='default' className='md:col-span-12 p-8 md:p-12 rounded-[2.5rem] flex flex-col lg:flex-row gap-8 lg:gap-16 items-start'>
    <div className='text-[#1C2A39]/40 text-sm font-bold tracking-widest flex items-center gap-4 shrink-0 mt-3'>
      <span className='font-mono'>(03)</span>
      <span className='h-px w-12 bg-[#1C2A39]/20'></span>
      <span>الترسانة التقنية</span>
    </div>
    <div className='flex flex-wrap gap-x-8 gap-y-4'>
      {technologies.map((tech, i) => (
        <div key={tech} className='text-2xl md:text-4xl font-black text-[#1C2A39] hover:text-[#0E4E84] hover:-translate-y-1.5 transition-all duration-300 cursor-default'>
          {tech}
          {i !== technologies.length - 1 && <span className='text-[#1C2A39]/20 mr-8 font-light'>/</span>}
        </div>
      ))}
    </div>
  </BrandBox>
);
