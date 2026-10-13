'use client';

import {useState} from 'react';
import Editor from '@monaco-editor/react';
import type {Monaco} from '@monaco-editor/react';

interface EditableCodeProps {
  initialCode: string;
  language?: string;
  height?: string;
  onRun?: (code: string) => void | Promise<void>;
}

const defineTransparentTheme = (monaco: Monaco) => {
  monaco.editor.defineTheme('ces-transparent', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#00000000',
      'editorGutter.background': '#00000000',
      'editor.lineHighlightBackground': '#00000000',
      'editor.selectionBackground': '#D4A72C44',
      'editorLineNumber.foreground': '#7F8088',
      'editorCursor.foreground': '#D4A72C'
    }
  });
};

export default function EditableCode({initialCode, language = 'typescript', height = '260px', onRun}: EditableCodeProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);

  async function handleRun() {
    if (isRunning) return;

    setIsRunning(true);

    try {
      await onRun?.(code);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className='overflow-hidden rounded-xl bg-transparent'>
      {onRun && (
        <div className='flex h-10 items-center justify-end border-b border-[#2E2F34] px-4'>
          <button type='button' onClick={handleRun} disabled={isRunning} className='rounded-md bg-[#D4A72C] px-3 py-1 text-xs font-medium text-black transition hover:bg-[#B98F20] disabled:cursor-not-allowed disabled:opacity-50'>
            {isRunning ? 'Running...' : 'Run →'}
          </button>
        </div>
      )}

      <Editor
        height={height}
        language={language}
        theme='ces-transparent'
        value={code}
        onChange={value => setCode(value ?? '')}
        beforeMount={defineTransparentTheme}
        options={{
          automaticLayout: true,
          minimap: {enabled: false},
          lineNumbers: 'off',
          folding: false,
          glyphMargin: false,
          lineDecorationsWidth: 12,
          lineNumbersMinChars: 0,
          renderLineHighlight: 'none',
          scrollBeyondLastLine: false,
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          contextmenu: false,
          fontSize: 13,
          lineHeight: 24,
          fontFamily: 'monospace',
          padding: {top: 16, bottom: 16},
          wordWrap: 'on',
          guides: {indentation: false},
          scrollbar: {
            vertical: 'auto',
            horizontal: 'hidden',
            verticalScrollbarSize: 6
          }
        }}
      />
    </div>
  );
}
