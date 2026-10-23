import {Button} from '@repo/ui/components/ui/button';
import BannerSection from './_sections/banner';
import Filters from './_sections/filters';
import StudentItem, {StudentItemProps} from './components/student-item';

const listOfStudents: StudentItemProps[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    bio: 'طالب جامعي في تخصص البرمجة',
    technology: ['React', 'Node.js', 'Express'],
    whatsappNumber: '01012345678'
  },
  {
    id: '2',
    name: 'سارة علي',
    bio: 'طالبة جامعية في تخصص التصميم',
    technology: ['Python', 'Django', 'Flask'],
    whatsappNumber: '01098765432'
  },
  {
    id: '3',
    name: 'محمد عبد الله',
    bio: 'طالب جامعي في تخصص البرمجة',
    technology: ['Java', 'Spring Boot', 'Hibernate'],
    whatsappNumber: '01056789012'
  },
  {
    id: '4',
    name: 'ليلى حسن',
    bio: 'طالبة جامعية في تخصص التصميم',
    technology: ['JavaScript', 'Vue.js', 'Nuxt.js'],
    whatsappNumber: '01034567890'
  }
];
const page = () => {
  return (
    <div className='custom-container'>
      <BannerSection />
      <div>
        {/* Filter */}
        <Filters />
        <span className='font-bold'>8 طالب</span>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {listOfStudents.map((student, index) => (
            <StudentItem key={index} {...student} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
