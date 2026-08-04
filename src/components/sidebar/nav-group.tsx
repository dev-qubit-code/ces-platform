import {useState, type ReactNode} from 'react';
import {Link, useLocation} from 'react-router';
import {ChevronRight} from 'lucide-react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar} from '@/components/ui/sidebar';
import {Badge} from '../ui/badge';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {type NavCollapsible, type NavItem, type NavLink, type NavGroup as NavGroupProps} from './type';
import { cn } from '@/lib/utils';

export function NavGroup({title, items}: NavGroupProps) {
  const {state, isMobile} = useSidebar();
  const href = useLocation().pathname;
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => {
          const key = `${item.title}-${item.url}`;

          if (!item.items) return <SidebarMenuLink key={key} item={item} href={href} />;

          if (state === 'collapsed' && !isMobile) return <SidebarMenuCollapsedDropdown key={key} item={item} href={href} />;

          return <SidebarMenuCollapsible key={key} item={item} href={href} />;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavBadge({children}: {children: ReactNode}) {
  return <Badge className='rounded-full px-1 py-0 text-xs'>{children}</Badge>;
}

function SidebarMenuLink({item, href}: {item: NavLink; href: string}) {
  const {setOpenMobile} = useSidebar();
  return (
    <Link to={item.url} onClick={() => setOpenMobile(false)}>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={checkIsActive(href, item)} tooltip={item.title}>
          <div className='flex items-center gap-2'>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
}

function SidebarMenuCollapsible({item, href}: {item: NavCollapsible; href: string}) {
  const {setOpenMobile} = useSidebar();
  const [open, setOpen] = useState(checkIsActive(href, item, true));
  return (
    <Collapsible open={open} onOpenChange={setOpen} className='group/collapsible'>
      <SidebarMenuItem>
        <CollapsibleTrigger className={'w-full'}>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className={cn(`ms-auto transition-transform duration-200 rtl:rotate-180`,open ? 'rotate-90!' : '')} />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className='CollapsibleContent'>
          <SidebarMenuSub>
            {item.items.map(subItem => (
              <Link to={subItem.url} onClick={() => setOpenMobile(false)}>
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton isActive={checkIsActive(href, subItem)}>
                    <div>
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                      {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                    </div>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </Link>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function SidebarMenuCollapsedDropdown({item, href}: {item: NavCollapsible; href: string}) {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SidebarMenuButton tooltip={item.title} isActive={checkIsActive(href, item)}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className='ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='right' align='start' sideOffset={4}>
          <DropdownMenuLabel>
            {item.title} {item.badge ? `(${item.badge})` : ''}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map(sub => (
            <Link key={`${sub.title}-${sub.url}`} to={sub.url}>
              <DropdownMenuItem>
                <div className={`${checkIsActive(href, sub) ? 'bg-secondary' : ''}`}>
                  {sub.icon && <sub.icon />}
                  <span className='max-w-52 text-wrap'>{sub.title}</span>
                  {sub.badge && <span className='ms-auto text-xs'>{sub.badge}</span>}
                </div>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url || // /endpint?search=param
    href.split('?')[0] === item.url || // endpoint
    !!item?.items?.filter(i => i.url === href).length || // if child nav is active
    (mainNav && href.split('/')[1] !== '' && href.split('/')[1] === ((item?.url as string) || '').split('/')[1])
  );
}
