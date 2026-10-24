import {notFound} from 'next/navigation';
import {StudentProfile} from './_types';
import {StudentHero, StudentBio, StudentAvatar, StudentTech, StudentLinkCard} from './_sections';

const getStudentById = async (id: string): Promise<StudentProfile | null> => {
  return {
    id,
    name: 'أحمد عبدالله',
    major: 'هندسة برمجيات',
    bio: 'أبني واجهات رقمية لا تُنسى. أدمج بين المنطق الهندسي الصارم والحس الفني العميق لخلق تجارب مستخدم تتجاوز المألوف وتترك أثراً حقيقياً.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Node.js', 'PostgreSQL'],
    links: [
      {key: 'https://github.com/', name: 'جيت هب'},
      {key: 'https://linkedin.com/', name: 'لينكد إن'},
      {key: 'https://portfolio.com/', name: 'معرض الأعمال'},
      {key: 'mailto:ahmed@example.com', name: 'البريد الإلكتروني'}
    ]
  };
};

export default async function StudentProfilePage({params}: {params: {id: string}}) {
  const student = await getStudentById(params.id);

  if (!student) {
    notFound();
  }

  return (
    <div className='custom-container mx-auto min-h-screen py-4 md:py-8 selection:bg-black selection:text-white' dir='rtl'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto'>
        <StudentHero name={student.name} major={student.major} />

        <StudentBio bio={student.bio} />

        <StudentAvatar name={student.name} />

        <StudentTech technologies={student.technologies} />

        <div className='md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {student.links.map((link, index) => (
            <StudentLinkCard key={link.key} link={link} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
