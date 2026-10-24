'use client';
import BrandBox from '@/components/brand-box';
import Input from '@/components/input';
import Select from '@/components/select';
import Textarea from '@/components/textarea';
import {Button} from '@repo/ui/components/ui/button';
import React, {useState} from 'react';

const listOfPriorities = [
  {label: 'عالية', value: 'high'},
  {label: 'متوسطة', value: 'medium'},
  {label: 'منخفضة', value: 'low'}
];
const ReportForm = () => {
  const [relatedSection, setRelatedSection] = useState('');
  const [contentName, setContentName] = useState('');
  const [description, setDescription] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const contentOfReport = `
      ${relatedSection ? `القسم المتعلق: ${relatedSection}` : ''}
      ${description ? `وصف المشكلة: ${description}` : ''}
      ${contactMethod ? `وسيلة تواصل للمتابعة: ${contactMethod}` : ''}
      `;
    const reportData = {
      contentName,
      contentOfReport,
      selectedPriority
    };
    console.log('====================================');
    console.log(reportData);
    console.log('====================================');
  }
  return (
    <BrandBox className='flex-1 rounded-2xl'>
      <form className='space-y-3 p-7 rounded-xl mt-10' onSubmit={handleSubmit}>
        <div className='flex gap-5'>
          <Input label='القسم المتعلق' value={relatedSection} onChange={e => setRelatedSection(e.target.value)} />
          <Input label='اسم المحتوى (اختياري)' value={contentName} onChange={e => setContentName(e.target.value)} />
        </div>
        <Textarea label='وصف المشكلة' value={description} onChange={e => setDescription(e.target.value)} />
        <Select label='الأولوية' className='rounded-xl' options={listOfPriorities} value={selectedPriority} onValueChange={e => setSelectedPriority(e)} />
        <Input label='وسيلة تواصل للمتابعة (اختياري)' value={contactMethod} onChange={e => setContactMethod(e.target.value)} />
        <Button variant={'website-primary'} className={'rounded-xl'}>
          أرسل البلاغ
        </Button>
      </form>
    </BrandBox>
  );
};

export default ReportForm;
