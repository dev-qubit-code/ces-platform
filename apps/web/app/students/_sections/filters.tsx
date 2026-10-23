'use client';
import {Button} from '@repo/ui/components/ui/button';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useCallback, useEffect, useState} from 'react';
import {useDebounce} from '@repo/ui/hooks/use-debounce';

const listOfTechnologies = ['تصميم UI/UX', 'تطوير واجهات', 'تطوير خلفي', 'تطبيقات جوال', 'شبكات وأمن', 'ذكاء اصطناعي', 'تصميم جرافيك'];

const Filters = () => {
  const [activeTechnology, setActiveTechnology] = useState<string>('all');
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim() === '' || value === 'all') {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  function FilterChange(type: 'filter' | 'level' | 'testType' | 'year', value: string) {
    const queryString = createQueryString(type, value);
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }
 
  const activeTechnologyDebounced = useDebounce(activeTechnology);

  useEffect(() => {
    if (activeTechnologyDebounced === '') {
      FilterChange('filter', 'all');
    } else FilterChange('filter', activeTechnologyDebounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTechnologyDebounced]);

  if (!isMounted) return null;
  return (
    <div className='flex gap-2 items-center my-5'>
      <Button onClick={() => setActiveTechnology('all')} variant={activeTechnology === 'all' ? 'website-purple' : 'website-white'}>الكل</Button>
      {listOfTechnologies.map(technology => (
        <Button onClick={() => setActiveTechnology(technology)} key={technology} variant={activeTechnology === technology ? 'website-purple' : 'website-white'}>
          {technology}
        </Button>
      ))}
    </div>
  );
};

export default Filters;
