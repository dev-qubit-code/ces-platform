import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';

import {Badge} from '@/components/ui/badge';

interface Props {
  links: {
    key: string;
    value: string;
  }[];
}

const LinksList = ({links}: Props) => {
  const limit = 2;

  const visibleLinks = links.slice(0, limit);
  const hiddenLinks = links.slice(limit);

  return (
    <div className='flex flex-wrap gap-1'>
      {visibleLinks.map(link => (
        <Badge key={link.key} variant='secondary' className='capitalize'>
          {link.key}
        </Badge>
      ))}

      {hiddenLinks.length > 0 && (
        <Tooltip>
          <TooltipTrigger>
            <Badge variant='outline' className='cursor-pointer'>
              +{hiddenLinks.length} روابط
            </Badge>
          </TooltipTrigger>

          <TooltipContent dir='rtl' className='max-w-xs'>
            <div className='flex flex-col gap-2'>
              {hiddenLinks.map(link => (
                <a key={link.key} href={link.value} target='_blank' rel='noopener noreferrer' className='text-sm hover:underline'>
                  {link.key}
                </a>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default LinksList;
