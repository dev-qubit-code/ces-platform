import {dashboardStats} from '../helper';
import {StatCard} from './stats-card';

export function StatsGrid() {
  return (
    <div className='flex flex-wrap gap-4 p-4'>
      {dashboardStats.map(item => (
        <StatCard key={item.title} {...item} />
      ))}
    </div>
  );
}
