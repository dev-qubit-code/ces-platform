import * as React from 'react';
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from '@/components/ui/sidebar';
import {Kbd, KbdGroup} from '@/components/ui/kbd';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';

type TeamSwitcherProps = {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
};

export function TeamSwitcher({teams}: TeamSwitcherProps) {
  const [activeTeam] = React.useState(teams[0]);
  const {open, setOpen} = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Tooltip>
          <TooltipTrigger className={'w-full'}>
            <SidebarMenuButton
              onClick={() => {
                setOpen(!open);
              }}
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <activeTeam.logo className='size-4' />
              </div>

              <div className='grid min-w-0 flex-1 text-start text-sm leading-tight'>
                <span className='truncate font-semibold'>{activeTeam.name}</span>

                <span className='truncate text-xs'>{activeTeam.plan}</span>
              </div>
            </SidebarMenuButton>
          </TooltipTrigger>

          <TooltipContent side='bottom' className='flex items-center gap-2'>
            <span>فتح وإغلاق القائمة الجانبية</span>

            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>B</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
