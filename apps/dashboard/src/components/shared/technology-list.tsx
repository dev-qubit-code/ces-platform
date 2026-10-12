import {Badge} from '@/components/ui/badge';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';

interface Props {
  technologies: string[];
  limit?: number;
}

const TechnologyList = ({technologies, limit = 5}: Props) => {
  const visible = technologies.slice(0, limit);
  const hidden = technologies.slice(limit);

  return (
    <div className='flex flex-wrap gap-1'>
      {visible.map(tech => (
        <Badge key={tech} variant='secondary'>
          {tech}
        </Badge>
      ))}

      {hidden.length > 0 && (
        <Tooltip>
          <TooltipTrigger>
            <Badge variant='outline' className='cursor-pointer'>
              +{hidden.length}
            </Badge>
          </TooltipTrigger>

          <TooltipContent dir='rtl' className='max-w-xs'>
            <div className='flex flex-wrap gap-1'>
              {hidden.map(tech => (
                <Badge key={tech} variant='secondary'>
                  {tech}
                </Badge>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default TechnologyList;
