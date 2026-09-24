import {useLayout} from '@/context/layout-provider';
import {Sidebar, SidebarContent, SidebarHeader, SidebarRail} from '../ui/sidebar';
// import { AppTitle } from './app-title'
import {NavGroup} from './nav-group';
import {getSidebarData} from './sidebar-config';
import {TeamSwitcher} from './team-switcher';
import {useUser} from '@/store/user.store';

export function AppSidebar() {
  const {collapsible, variant} = useLayout();
  const user = useUser(state => state.user);
  console.log(user?.role);
  const role = user?.role || 'manager';
  
  const sidebarData = getSidebarData(role);
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
