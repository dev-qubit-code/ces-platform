import {useLayout} from '@/context/layout-provider';
import {Sidebar, SidebarContent, SidebarHeader, SidebarRail} from '../ui/sidebar';
// import { AppTitle } from './app-title'
import {NavGroup} from './nav-group';
import {sidebarData} from './sidebar-config';
import {TeamSwitcher} from './team-switcher';

export function AppSidebar() {
  const {collapsible, variant} = useLayout();
  return (
    <Sidebar side='right' collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map(props => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
