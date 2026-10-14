import type {Metadata} from 'next';
import {Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    template: '%s | جمعية هندسة الحاسوب',
    absolute: 'جمعية هندسة الحاسوب'
  },
  description: 'جمعية هندسة الحاسوب هي منظمة طلابية تهدف إلى تعزيز المعرفة والمهارات في مجال هندسة الحاسوب بين الطلاب. نحن نقدم مجموعة متنوعة من الأنشطة والفعاليات التي تساعد الطلاب على تطوير مهاراتهم التقنية والشخصية.'
};

export default function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html lang='ar' dir='rtl' className={cn('h-full', 'antialiased', geistSans.variable, geistMono.variable, 'font-sans', inter.variable)}>
      <body className='min-h-full flex flex-col bg-[#EDF5FB]'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
