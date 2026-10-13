import HeroSection from './_sections/hero';
import MemorizeAndTestSection from './_sections/memorize-and-test';
import UploadTestSection from './_sections/upload-test';
import NewsSection from './_sections/news';
import AboutUsSections from './_sections/about-us';
import ReportSections from './_sections/report';

export default function Home() {
  return (
    <div className='custom-container'>
      <HeroSection />
      {/* sections 2 */}
      <MemorizeAndTestSection />
      {/* sections 3 */}
      <UploadTestSection />
      {/* sections 4 */}
      <NewsSection />
      {/* sections 5 */}
      <AboutUsSections />
      {/* sections 6 */}
      <ReportSections />
    </div>
  );
}
