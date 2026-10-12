import {PanelBreadcrumb} from './helper';
import {StatsGrid} from './components/stats-grid';
import {Overview} from './components/overview';
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from '@/components/ui/card';
import {RecentExams} from './components/recent-exams';
import {useHeader} from '@/store/header-store';

const Panel = () => {
  const setBreadcrumb = useHeader(state => state.setBreadcrumb);
  setBreadcrumb(PanelBreadcrumb);
  return (
    <section>
      <StatsGrid />
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7 mt-4'>
        <Card className='col-span-1 lg:col-span-4'>
          <CardHeader>
            <CardTitle>نظرة عامة على النشاط</CardTitle>
          </CardHeader>
          <CardContent className='ps-2'>
            <Overview />
          </CardContent>
        </Card>

        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle>أحدث الإضافات</CardTitle>
            <CardDescription>تم رفع 34 ملف واختبار جديد هذا الشهر.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentExams />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Panel;

// const developer = [
//   {key: 'github 1', value: 'github.com/eng-bxi'},
//   {key: 'github 2', value: 'github.com/eng-bxi2'},
//   {
//     key: 'linkedin',
//     value: 'linkedin.com/in/eng-bxi'
//   }
//   // ....
// ];

// const designer = [
//   {key: 'dribbble', value: 'dribbble.com/eng-bxi'},
//   {key: 'behance', value: 'behance.net/eng-bxi'}
//   // ...
// ];
