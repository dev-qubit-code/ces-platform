import React from 'react';
import BannerSection from './_sections/banner';
import BrandBox, {boxVariants} from '@/components/brand-box';
import {IconBook, IconBrandGithub, IconBrandLinkedin, IconBrandLinkedinFilled, IconCalendar, IconCode, IconCodeCircle, IconUser} from '@tabler/icons-react';
import {Button} from '@repo/ui/components/ui/button';
import CodeBox from '@/components/code-box';
import EditableCode from '../_components/editable-code';
const boxes: {title: string; description: string; variant: keyof typeof boxVariants}[] = [
  {title: 'الرؤية', variant: 'ice-cream', description: 'نؤمن بأن التكنولوجيا يمكن أن تُحدث ثورة في كيفية تفاعل الناس مع العالم من حولهم.'},
  {title: 'الرسالة', variant: 'vanilla', description: 'نسعى لتقديم حلول مبتكرة وفعالة تلبي احتياجات عملائنا وتساهم في تحسين حياتهم اليومية.'},
  {title: 'الأهداف', variant: 'light-green', description: 'نسعى لتحقيق التميز في كل ما نقوم به، مع التركيز على الابتكار والجودة وخدمة العملاء.'}
];
const metadata: {icon: React.ReactNode; iconVariant: keyof typeof boxVariants; title: string; description: string}[] = [
  {icon: <IconBook />, iconVariant: 'ice-cream', title: 'دعم أكاديمي', description: 'نجمع الاختبارات والملازم ونسهّل وصولها لكل الطلاب.'},
  {icon: <IconCalendar />, iconVariant: 'vanilla', title: 'دورات وفعاليات', description: 'ورش عمل ومؤتمرات ومعارض تقنية طوال السنة.'},
  {icon: <IconUser />, iconVariant: 'light-green', title: 'مجتمع طلابي', description: 'نربط الطلاب ببعض لتبادل الخبرات والتعاون في المشاريع.'},
  {icon: <IconCode />, iconVariant: 'light-blue', title: 'مشاريع تطوعية', description: 'مشاريع حقيقية يبنيها الطلاب، مثل هذه المنصة.'}
];
interface IDeveloper {
  name: string;
  role: string;
  bio: string;
  linkedInLink?: string;
  githubLink?: string;
  portfolioLink?: string;
}
const listOfDevelopers: IDeveloper[] = [
  {
    name: 'محمد العتيبي',
    role: 'مطور واجهة المستخدم',
    bio: 'محمد هو مطور واجهة المستخدم الذي يركز على إنشاء تجارب مستخدم سلسة وجذابة. لديه خبرة واسعة في React وNext.js.',
    linkedInLink: 'https://www.linkedin.com/in/mohammed-alotaibi',
    githubLink: 'www.github.com/mohammed-alotaibi',
    portfolioLink: 'www.mohammed-alotaibi.com'
  },
  {
    name: 'أحمد محمد',
    role: 'مطور واجهة المستخدم',
    bio: 'أحمد هو مطور واجهة المستخدم الذي يركز على إنشاء تجارب مستخدم سلسة وجذابة. لديه خبرة واسعة في React وNext.js.',
    linkedInLink: 'https://www.linkedin.com/in/ahmed-mohammed',
    githubLink: 'www.github.com/ahmed-mohammed',
    portfolioLink: 'www.ahmed-mohammed.com'
  },
  {
    name: 'سارة علي',
    role: 'مصممة واجهة المستخدم',
    bio: 'سارة هي مصممة واجهة المستخدم التي تركز على إنشاء تصاميم جذابة وسهلة الاستخدام. لديها خبرة واسعة في تصميم واجهات المستخدم وتجربة المستخدم.',
    linkedInLink: 'https://www.linkedin.com/in/sara-ali',
    githubLink: 'www.github.com/sara-ali',
    portfolioLink: 'www.sara-ali.com'
  },
  {
    name: 'سالم الحربي',
    role: 'مهندس برمجيات',
    bio: 'سالم هو مهندس برمجيات متخصص في تطوير الأنظمة الخلفية والبنية التحتية. لديه خبرة واسعة في Node.js وExpress وMongoDB.',
    linkedInLink: 'https://www.linkedin.com/in/salem-alharbi',
    githubLink: 'www.github.com/salem-alharbi',
    portfolioLink: 'www.salem-alharbi.com'
  },
  {
    name: 'ليلى الزهراني',
    role: 'مهندسة برمجيات',
    bio: 'ليلى هي مهندسة برمجيات متخصصة في تطوير الأنظمة الخلفية والبنية التحتية. لديها خبرة واسعة في Node.js وExpress وMongoDB.',
    linkedInLink: 'https://www.linkedin.com/in/layla-alzahrani',
    githubLink: 'www.github.com/layla-alzahrani',
    portfolioLink: 'www.layla-alzahrani.com'
  },
  {
    name: 'خالد الشمري',
    role: 'مهندس برمجيات',
    bio: 'خالد هو مهندس برمجيات متخصص في تطوير الأنظمة الخلفية والبنية التحتية. لديه خبرة واسعة في Node.js وExpress وMongoDB.',
    linkedInLink: 'https://www.linkedin.com/in/khalid-alshammari',
    githubLink: 'www.github.com/khalid-alshammari',
    portfolioLink: 'www.khalid-alshammari.com'
  }
];
const page = () => {
  return (
    <div className='custom-container'>
      <BannerSection />
      <div className='flex flex-wrap items-center gap-5 mt-10'>
        {boxes.map((box, index) => (
          <BrandBox variant={box.variant} className='flex-1 min-w-80 p-6 rounded-2xl' key={index}>
            <h3 className='text-3xl font-bold'>{box.title}</h3>
            <p className='text-lg'>{box.description}</p>
          </BrandBox>
        ))}
      </div>
      <div>
        <h2 className='text-5xl font-bold my-10'>وش نســـوي في الجمعية؟</h2>
        <div className='flex flex-wrap items-center gap-5'>
          {metadata.map((item, index) => (
            <BrandBox className='flex-1 min-w-80 flex flex-col items-start gap-5 p-6 rounded-3xl' key={index}>
              <BrandBox variant={item.iconVariant} className='flex justify-center items-center rounded-xl p-3'>
                {item.icon}
              </BrandBox>
              <h3 className='text-2xl font-bold'>{item.title}</h3>
              <p className='text-lg'>{item.description}</p>
            </BrandBox>
          ))}
        </div>
      </div>
      <BrandBox variant='black' className='px-10 py-15 mt-10'>
        <div className='flex items-start gap-5'>
          <div className='flex-3'>
            <h2 className='text-5xl font-bold mb-5'>فريـــق المطورين</h2>
            <p className='text-gray-300 mb-3'>طلاب من القسم تطوّعوا لتصميم وبرمجة هذه المنصة. تعرّف علينا وعلى أعمالنا، ولو عندك فكرة مشروع أو فرصة تعاون، تواصل معنا.</p>
            <Button variant={'website-ice-cream'}>تعاون معنا</Button>
          </div>
          <CodeBox hasActionWindow fileName='developer.ts' className='flex-2'>
            <EditableCode
              initialCode={`
$ git shortlog -s
$ git all developers
$ found ${listOfDevelopers.length} developers:
${listOfDevelopers.map(developer => `- ${developer.name} (${developer.role})`).join('\n')}
                `}
              path='exams.ts'
              language='shell'
            />
          </CodeBox>
        </div>
        <div className='flex flex-wrap gap-5 items-center mt-10'>
          {listOfDevelopers.map((developer, index) => (
            <DeveloperCard key={index} developer={developer} />
          ))}
        </div>
      </BrandBox>
    </div>
  );
};

export default page;

function DeveloperCard({developer}: {developer: IDeveloper}) {
  const {name, role, bio, linkedInLink, githubLink, portfolioLink} = developer;
  return (
    <BrandBox variant='black' className='flex-1 min-w-90 p-7'>
      <BrandBox variant='light-blue' className='max-w-min rounded-2xl p-3 flex justify-center items-center mb-5'>
        <IconUser className='size-8 text-black' />
      </BrandBox>
      <h4 className='text-xl font-bold'>{name}</h4>
      <h5 className='text-blue-400 font-bold text-lg'>{role}</h5>
      <p className='text-gray-300 text-lg my-5'>{bio}</p>
      <div className='flex items-center gap-3 mt-3'>
        {githubLink && (
          <Button variant='website-primary' className='rounded-xl size-15 p-4 flex justify-center items-center'>
            <IconBrandGithub className='size-7' />
          </Button>
        )}
        {linkedInLink && (
          <Button variant='website-primary' className='rounded-xl size-15 p-4 flex justify-center items-center'>
            <IconBrandLinkedinFilled className='size-7' />
          </Button>
        )}
        {portfolioLink && (
          <Button variant='website-white' className='rounded-xl font-bold text-lg flex-1 h-15 p-4 flex justify-center items-center'>
            ملف الأعمال
          </Button>
        )}
      </div>
    </BrandBox>
  );
}
