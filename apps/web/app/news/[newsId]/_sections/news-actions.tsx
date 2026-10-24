'use client';

import {useState} from 'react';
import BrandBox from '@/components/brand-box';
import {CalendarPlus, Copy, Share2} from 'lucide-react';
import {generateGoogleCalendarUrl} from '../_lib/news-utils';
import { Button } from '@repo/ui/components/ui/button';

interface NewsActionsProps {
  title: string;
  description: string;
  date: string;
}

export function NewsActions({title, description, date}: NewsActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`شاهد هذا الخبر: ${title} - ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleAddToCalendar = () => {
    const calendarUrl = generateGoogleCalendarUrl(title, description, date);
    window.open(calendarUrl, '_blank');
  };

  return (
    <BrandBox variant='list-item' className='flex flex-col gap-4 p-6 rounded-[32px] sticky top-8'>
      <h3 className='mb-2 text-center text-xl font-bold text-[#1C2A39]'>تفاعل مع الخبر</h3>

      <Button variant='website-primary' onClick={handleWhatsAppShare} className='flex w-full items-center justify-center gap-2'>
        <Share2 size={20} />
        مشاركة عبر واتساب
      </Button>

      <Button variant='website-ice-cream' onClick={handleAddToCalendar} className='flex w-full items-center justify-center gap-2 font-bold'>
        <CalendarPlus size={20} />
        إضافة للتقويم
      </Button>

      <Button variant='website-white' onClick={handleCopyLink} className='flex w-full items-center justify-center gap-2 font-bold'>
        <Copy size={20} />
        {copied ? 'تم نسخ الرابط بنجاح!' : 'نسخ رابط الخبر'}
      </Button>
    </BrandBox>
  );
}
