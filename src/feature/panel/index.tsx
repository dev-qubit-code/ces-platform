import Header from '@/components/header';
import {PanelBreadcrumb} from './helper';
import {StatsGrid} from './components/stats-grid';

const Panel = () => {
  return (
    <section>
      <Header breadcrumb={PanelBreadcrumb} />
      <div className='container mx-auto '>
        <StatsGrid />
      </div>
    </section>
  );
};

export default Panel;
