import {IconBrandGithub, IconBrandLinkedin, IconMail, IconDeviceDesktop, IconWorld} from '@tabler/icons-react';

export const getLinkDetails = (url: string, name: string) => {
  const str = (url + name).toLowerCase();

  if (str.includes('github') || str.includes('جيت')) return {icon: <IconBrandGithub size={40} stroke={1.2} />, variant: 'black' as const};

  if (str.includes('linkedin') || str.includes('لينكد')) return {icon: <IconBrandLinkedin size={40} stroke={1.2} />, variant: 'dark-blue' as const};

  if (str.includes('mail') || str.includes('@') || str.includes('بريد')) return {icon: <IconMail size={40} stroke={1.2} />, variant: 'vanilla' as const};

  if (str.includes('portfolio') || str.includes('معرض') || str.includes('أعمال')) return {icon: <IconDeviceDesktop size={40} stroke={1.2} />, variant: 'purple' as const};

  return {icon: <IconWorld size={40} stroke={1.2} />, variant: 'light-green' as const};
};
