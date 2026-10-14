import {codeToHtml} from 'shiki';

type CodeHighlightProps = {
  code: string;
  lang?: string;
};

export default async function CodeHighlight({code, lang = 'typescript'}: CodeHighlightProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: 'github-dark',
  });

  return <div className='overflow-x-auto text-sm [&_pre]:bg-transparent! [&_pre]:leading-7' dangerouslySetInnerHTML={{__html: html}} />;
}
