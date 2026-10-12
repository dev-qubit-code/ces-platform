import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';

// تم تعديل الأشهر لتكون بالعربية وتغيير اسم المفتاح إلى activities (يمثل الملفات، الاختبارات، والمشاركات)
const data = [
  {name: 'يناير', activities: Math.floor(Math.random() * 50) + 10},
  {name: 'فبراير', activities: Math.floor(Math.random() * 50) + 10},
  {name: 'مارس', activities: Math.floor(Math.random() * 50) + 10},
  {name: 'أبريل', activities: Math.floor(Math.random() * 50) + 10},
  {name: 'مايو', activities: Math.floor(Math.random() * 50) + 10},
  {name: 'يونيو', activities: Math.floor(Math.random() * 50) + 10},
  {name: 'يوليو', activities: Math.floor(Math.random() * 50) + 10},
  {name: 'أغسطس', activities: Math.floor(Math.random() * 50) + 10},
  {name: 'سبتمبر', activities: Math.floor(Math.random() * 50) + 10},
  {name: 'أكتوبر', activities: Math.floor(Math.random() * 50) + 10},
  {name: 'نوفمبر', activities: Math.floor(Math.random() * 50) + 10},
  {name: 'ديسمبر', activities: Math.floor(Math.random() * 50) + 10}
];

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis reversed dataKey='name' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
        <YAxis direction={'ltr'} stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `${value}`} />
        <Bar dataKey='activities' fill='currentColor' radius={[4, 4, 0, 0]} className='fill-primary' />
      </BarChart>
    </ResponsiveContainer>
  );
}
