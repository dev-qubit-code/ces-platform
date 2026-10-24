'use client';

import React, {useState} from 'react';
import Select from '@/components/select';
import Input from '@/components/input';
import {Button} from '@repo/ui/components/ui/button';
import {IconPlus, IconX} from '@tabler/icons-react';
import {linkTypeOptions} from './../_constants/upload';
import {StudentLink} from './../_types/upload';

export default function PortfolioForm() {
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [links, setLinks] = useState<StudentLink[]>([]);
  const [linkName, setLinkName] = useState('');
  const [linkKey, setLinkKey] = useState('');

  const handleAddTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const handleAddLink = () => {
    if (linkName && linkKey.trim()) {
      setLinks([...links, {name: linkName, key: linkKey.trim()}]);
      setLinkKey('');
      setLinkName('');
    }
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Input label='اسم الطالب' placeholder='الاسم الرباعي' />
        <Input label='التخصص' placeholder='مثال: هندسة برمجيات' />

        <div className='flex flex-col gap-2 md:col-span-2'>
          <label className='text-base font-bold text-[#1C2A39]'>نبذة عنك</label>
          <textarea rows={4} placeholder='تحدث عن مهاراتك وشغفك...' className='rounded-2xl border-0 bg-[#EEF5FA] p-4 text-[#1C2A39] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.75),inset_4px_6px_12px_rgba(28,42,57,0.14)] placeholder:text-[#7F8B96] focus-visible:ring-2 focus-visible:ring-[#D4A72C]/50 focus-visible:ring-offset-0 resize-none outline-none' />
        </div>
      </div>

      <div className='flex flex-col gap-4 p-6 bg-[#FBFDFF] rounded-3xl shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.75),inset_4px_6px_12px_rgba(28,42,57,0.05)] border border-[#1C2A39]/5'>
        <label className='text-base font-bold text-[#1C2A39]'>التقنيات (Technologies)</label>
        <div className='flex items-end gap-3'>
          <div className='flex-1'>
            <Input value={techInput} onChange={e => setTechInput(e.target.value)} placeholder='مثال: React' />
          </div>
          <Button type='button' onClick={handleAddTech} className='h-13.5 rounded-2xl bg-[#1C2A39] hover:bg-[#0E4E84] px-6'>
            <IconPlus size={20} className='text-white' />
          </Button>
        </div>
        {technologies.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-2'>
            {technologies.map((tech, i) => (
              <div key={i} className='flex items-center gap-2 bg-[#EEF5FA] px-4 py-2 rounded-xl text-sm font-bold text-[#1C2A39] shadow-sm'>
                <span>{tech}</span>
                <button type='button' onClick={() => handleRemoveTech(i)} className='text-red-500 hover:text-red-700'>
                  <IconX size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='flex flex-col gap-4 p-6 bg-[#FBFDFF] rounded-3xl shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.75),inset_4px_6px_12px_rgba(28,42,57,0.05)] border border-[#1C2A39]/5'>
        <label className='text-base font-bold text-[#1C2A39]'>الروابط الشخصية</label>
        <div className='flex items-end gap-3'>
          <div className='w-1/3'>
            <Select label='' options={linkTypeOptions} placeholder='نوع الرابط' value={linkName} onValueChange={setLinkName} />
          </div>
          <div className='flex-1'>
            <Input value={linkKey} onChange={e => setLinkKey(e.target.value)} placeholder='https://...' />
          </div>
          <Button type='button' onClick={handleAddLink} className='h-13.5 rounded-2xl bg-[#1C2A39] hover:bg-[#0E4E84] px-6'>
            <IconPlus size={20} className='text-white' />
          </Button>
        </div>
        {links.length > 0 && (
          <div className='flex flex-col gap-2 mt-2'>
            {links.map((link, i) => (
              <div key={i} className='flex items-center justify-between bg-[#EEF5FA] px-4 py-3 rounded-xl text-sm font-bold text-[#1C2A39] shadow-sm'>
                <div className='flex items-center gap-3'>
                  <span className='text-[#0E4E84] bg-white px-3 py-1 rounded-lg shadow-sm'>{linkTypeOptions.find(o => o.value === link.name)?.label || link.name}</span>
                  <span className='text-[#1C2A39]/70 font-mono' dir='ltr'>
                    {link.key}
                  </span>
                </div>
                <button type='button' onClick={() => handleRemoveLink(i)} className='text-red-500 hover:text-red-700'>
                  <IconX size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
