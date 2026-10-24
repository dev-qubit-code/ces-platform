import BrandBox from '@/components/brand-box';

interface StudentAvatarProps {
  name: string;
}

export const StudentAvatar = ({name}: StudentAvatarProps) => (
  <BrandBox variant='ice-cream' className='md:col-span-4 min-h-80 relative overflow-hidden rounded-[2.5rem] p-8 flex flex-col items-center justify-center group'>
    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700'></div>
    <div className='text-[10rem] font-black text-white/90 drop-shadow-2xl mix-blend-overlay group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 ease-out'>{name.charAt(0)}</div>
  </BrandBox>
);
