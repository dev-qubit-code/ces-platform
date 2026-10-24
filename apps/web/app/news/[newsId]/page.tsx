import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowRight} from 'lucide-react';
import {NewsCover} from './_sections/news-cover';
import {NewsContent} from './_sections/news-content';
import {NewsActions} from './_sections/news-actions';
import {Button} from '@repo/ui/components/ui/button';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
}

const getNewsById = async (id: string): Promise<NewsItem | null> => {
  return {
    id,
    title: 'معرض CES 2023: أحدث الابتكارات في مجال التكنولوجيا',
    description: 'يعد معرض CES 2023 منصة عالمية لعرض أحدث الابتكارات في مجال التكنولوجيا، حيث يشارك فيه العديد من الشركات الرائدة في صناعة الإلكترونيات والتقنيات الحديثة.\n\nفي هذا المعرض تم الكشف عن أجهزة الجيل القادم.',
    date: '2023-01-01',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop'
  };
};

export default async function NewsDetailsPage({params}: {params: {id: string}}) {
  const newsItem = await getNewsById(params.id);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className='custom-container mx-auto py-10' dir='rtl'>
      <div className='mb-6'>
        <Button variant='website-white' className='flex w-fit items-center gap-2 font-bold'>
          <Link href='/news'>
            <ArrowRight size={18} />
            العودة للأخبار
          </Link>
        </Button>
      </div>

      <NewsCover src={newsItem.coverImage} alt={newsItem.title} />

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 relative'>
        <div className='lg:col-span-2'>
          <NewsContent title={newsItem.title} description={newsItem.description} date={newsItem.date} />
        </div>

        <aside className='relative'>
          <NewsActions title={newsItem.title} description={newsItem.description} date={newsItem.date} />
        </aside>
      </div>
    </div>
  );
}
