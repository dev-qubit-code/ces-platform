import {useHeader} from '@/store/header-store';
import {Card} from '@/components/ui/card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {IconBrandGithub, IconBrandLinkedin, IconMail, IconWorld, IconCode, IconServer, IconTools, IconBriefcase, IconSparkles} from '@tabler/icons-react';
import {AboutBreadcrumb, developers} from './helper';

const About = () => {
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);

  setBreadcrumb(AboutBreadcrumb);

  return (
    <div className='flex flex-col gap-6 w-full pb-10'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-3xl font-bold tracking-tight'>نبدة المطورين</h2>
        <p className='text-muted-foreground'>نظرة مفصلة على العقول التقنية خلف بناء هذا النظام.</p>
      </div>

      <div className='flex flex-col gap-8 w-full mt-2'>
        {developers.map(dev => (
          <Card key={dev.id} className='relative overflow-hidden border shadow-sm group'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 transition-all duration-500 group-hover:bg-primary/10' />

            <div className='relative p-6 md:p-8 flex flex-col xl:flex-row gap-8'>
              <div className='flex flex-col gap-6 xl:w-2/5'>
                <div className='flex items-center gap-5'>
                  <div className='p-1 rounded-full bg-gradient-to-tr from-primary via-primary/50 to-transparent shadow-md'>
                    <Avatar className='h-20 w-20 border-2 border-background'>
                      <AvatarFallback className='text-2xl font-black bg-muted text-foreground'>{dev.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h3 className='text-2xl font-bold tracking-tight'>{dev.name}</h3>
                    <p className='text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60'>{dev.role}</p>
                  </div>
                </div>

                <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-full w-fit border border-primary/10'>
                  <span className='relative flex h-2 w-2'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-2 w-2 bg-primary'></span>
                  </span>
                  {dev.status}
                </div>

                <p className='text-muted-foreground leading-relaxed text-sm'>{dev.bio}</p>

                <div className='flex items-center gap-2 mt-auto pt-2'>
                  {dev.socials.github && (
                    <Button variant='outline' size='icon' className='rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all'>
                      <a href={dev.socials.github} target='_blank' rel='noreferrer'>
                        <IconBrandGithub stroke={1.5} className='h-4 w-4' />
                      </a>
                    </Button>
                  )}
                  {dev.socials.linkedin && (
                    <Button variant='outline' size='icon' className='rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all'>
                      <a href={dev.socials.linkedin} target='_blank' rel='noreferrer'>
                        <IconBrandLinkedin stroke={1.5} className='h-4 w-4' />
                      </a>
                    </Button>
                  )}
                  {dev.socials.portfolio && (
                    <Button variant='outline' size='icon' className='rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all'>
                      <a href={dev.socials.portfolio} target='_blank' rel='noreferrer'>
                        <IconWorld stroke={1.5} className='h-4 w-4' />
                      </a>
                    </Button>
                  )}
                  {dev.socials.email && (
                    <Button variant='outline' size='icon' className='rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all'>
                      <a href={dev.socials.email}>
                        <IconMail stroke={1.5} className='h-4 w-4' />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <Separator orientation='vertical' className='hidden xl:block h-auto' />
              <Separator className='block xl:hidden' />

              <div className='flex flex-col gap-6 xl:w-3/5'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex items-center gap-3 p-3 rounded-lg border bg-muted/20'>
                    <div className='p-2 bg-primary/10 rounded-md text-primary'>
                      <IconBriefcase stroke={1.5} className='h-5 w-5' />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-xs text-muted-foreground'>الخبرة</span>
                      <span className='font-semibold text-sm'>{dev.stats.experience}</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 p-3 rounded-lg border bg-muted/20'>
                    <div className='p-2 bg-primary/10 rounded-md text-primary'>
                      <IconSparkles stroke={1.5} className='h-5 w-5' />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-xs text-muted-foreground'>المشاريع</span>
                      <span className='font-semibold text-sm'>{dev.stats.projects}</span>
                    </div>
                  </div>
                </div>

                <div className='flex flex-wrap gap-4'>
                  {dev.stack.frontend && dev.stack.frontend.length > 0 && (
                    <div className='flex md:flex-1 w-full md:min-w-80 flex-col gap-3 p-4 rounded-xl border bg-card hover:border-primary/30 transition-colors'>
                      <div className='flex items-center gap-2 text-primary'>
                        <IconCode stroke={1.5} className='h-5 w-5' />
                        <h4 className='font-semibold text-sm text-foreground'>واجهات المستخدم</h4>
                      </div>
                      <div className='flex flex-wrap gap-1.5'>
                        {dev.stack.frontend.map(tech => (
                          <Badge key={tech} variant='secondary' className='bg-secondary/50 font-medium hover:bg-secondary'>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {dev.stack.backend && dev.stack.backend.length > 0 && (
                    <div className='flex md:flex-1 w-full md:min-w-80 flex-col gap-3 p-4 rounded-xl border bg-card hover:border-primary/30 transition-colors'>
                      <div className='flex items-center gap-2 text-primary'>
                        <IconServer stroke={1.5} className='h-5 w-5' />
                        <h4 className='font-semibold text-sm text-foreground'>الخوادم وقواعد البيانات</h4>
                      </div>
                      <div className='flex flex-wrap gap-1.5'>
                        {dev.stack.backend.map(tech => (
                          <Badge key={tech} variant='outline' className='font-medium'>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {dev.stack.tools && dev.stack.tools.length > 0 && (
                    <div className='flex md:flex-1 w-full md:min-w-80 flex-col gap-3 p-4 rounded-xl border bg-card hover:border-primary/30 transition-colors md:col-span-2'>
                      <div className='flex items-center gap-2 text-primary'>
                        <IconTools stroke={1.5} className='h-5 w-5' />
                        <h4 className='font-semibold text-sm text-foreground'>أدوات وبيئة التطوير</h4>
                      </div>
                      <div className='flex flex-wrap gap-1.5'>
                        {dev.stack.tools.map(tech => (
                          <Badge key={tech} variant='secondary' className='bg-muted font-medium text-muted-foreground'>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default About;
  