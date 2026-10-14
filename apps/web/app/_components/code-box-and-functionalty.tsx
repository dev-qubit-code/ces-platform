'use client';

import BrandBox from '@/components/brand-box';
import EditableCode from './editable-code';
import CodeBox from '@/components/code-box';

const initialCode = `// Search for an exam
const exam = await ces.exams.find({
  subject: 'Data Structures',
  level: 2,
  type: 'final'
});

exam.status;
exam.download();`;

export default function CodeBoxAndFunctionality() {
  async function handleSearch(code: string) {
    const match = code.match(/subject\s*:\s*["']([^"']+)["']/);

    const subject = match?.[1]?.trim();

    if (!subject) {
      console.error('Subject not found');
      return;
    }
    console.log('Searching for:', subject);
  }

  return (
    <BrandBox variant='light-blue' className='p-4 flex-2'>
      <CodeBox hasActionWindow fileName='exams.ts' className='h-full'>
        <EditableCode initialCode={initialCode} path='exams.ts' language='typescript' onRun={handleSearch} />
      </CodeBox>
    </BrandBox>
  );
}
