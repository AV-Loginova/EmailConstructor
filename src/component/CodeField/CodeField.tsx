import React, { useEffect, useState, useRef } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import { templateManipulateButtons } from '@shared/constants/buttons';

import IconButton from '@ui/IconButton';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/mode/htmlmixed/htmlmixed';

interface CodeFieldProps {
  HTMLTemplate: string;
  HTMLCode: [string, number];
  isClicked: number;
}

const CodeField: React.FC<CodeFieldProps> = ({
  HTMLTemplate,
  HTMLCode,
  isClicked,
}) => {
  const initialHistory = localStorage.getItem('mail');
  const [htmlCode, setHtmlCode] = useState<string>(
    initialHistory ? JSON.parse(initialHistory) : HTMLTemplate
  );
  const editorRef = useRef<any | null>(null);

  useEffect(() => {
    setHtmlCode(HTMLTemplate);
  }, [HTMLTemplate]);

  useEffect(() => {
    if (isClicked && editorRef.current) {
      handleInsertCode();
    }
  }, [isClicked]);

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      const lineNumberToFocus = 164;
      const cursor = editor.getCursor();
      const line = editor.getLine(cursor.line);
      const pos = {
        line: lineNumberToFocus - 1,
        ch: line.length,
        sticky: 'after',
      };
      editor.setCursor(pos);
      editor.scrollIntoView({
        line: lineNumberToFocus + 10,
        ch: line.length,
        sticky: 'after',
      });
      editor.focus();
    }
  }, [localStorage]);

  const clearLocalStorage = () => {
    const currentTemplate = localStorage.getItem('currentTemplate');

    localStorage.removeItem('mail');
    setHtmlCode(currentTemplate ? JSON.parse(currentTemplate) : '');
  };

  const handleInsertCode = () => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      const codeToInsert = HTMLCode[0];
      const cursor = editor.getCursor();
      const line = editor.getLine(cursor.line);
      const pos = { line: cursor.line, ch: line.length, sticky: 'after' };
      const newPos = {
        line: cursor.line + HTMLCode[1] + 1,
        ch: line.length,
        sticky: 'after',
      };
      editor.replaceRange(codeToInsert, pos);
      editor.replaceRange('\n', newPos);
      editor.setCursor(newPos);
      editor.focus();
    }
  };

  const handleCodeChange = (editor: string, data: string, value: string) => {
    setHtmlCode(value);
    localStorage.setItem('mail', JSON.stringify(value));
  };

  const copyToClipboard = () => {
    const codeWithoutComments = removeCommentsAndEmptyLines(htmlCode);
    navigator.clipboard
      .writeText(codeWithoutComments)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Error copying text: ', err);
      });
  };

  const downloadHtmlFile = () => {
    const codeWithoutComments = removeCommentsAndEmptyLines(htmlCode);
    const element = document.createElement('a');
    const file = new Blob([codeWithoutComments], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'index.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const undoLastChange = () => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      editor.undo();
      editor.undo();
      editor.focus();
    }
  };

  const removeEmptyLines = (code: string) => {
    return code.replace(/\n\s*\n/g, '\n');
  };

  const removeCommentsAndEmptyLines = (code: string) => {
    let codeWithoutComments = code.replace(/<!--[\s\S]*?-->/g, '');

    codeWithoutComments = removeEmptyLines(codeWithoutComments);

    return codeWithoutComments;
  };

  const handlers = {
    copy: copyToClipboard,
    download: downloadHtmlFile,
    undo: undoLastChange,
    clear: clearLocalStorage,
    none: () => {},
  };

  return (
    <div className="relative flex justify-between h-[80vh] m-3 p-0">
      <section className="absolute left-2 top-[-27px] flex gap-1">
        {templateManipulateButtons.map((btn) => (
          <IconButton
            clickAction={handlers[btn.action]}
            imageSource={btn.src}
            alt={btn.alt}
            key={btn.id}
            title={btn.title}
          />
        ))}
      </section>

      <div
        className="relative flex flex-col w-[47vw] overflow-scroll rounded-md 
       h-[78vh]"
      >
        <CodeMirror
          ref={editorRef}
          value={htmlCode}
          onBeforeChange={handleCodeChange}
          options={{
            mode: 'htmlmixed',
            theme: 'ayu-mirage',
            lineNumbers: true,
            lineWrapping: true,
          }}
          onChange={() => {}}
        />
      </div>
      <div
        className="preview w-[47vw] border-[#eaeaea] rounded-md  
      bg-[#ffffff] overflow-y-auto h-[80vh]"
      >
        <pre>
          <iframe
            title="Preview"
            className="w-[100%] border-[#eaeaea] rounded-md  
            bg-[#ffffff] overflow-y-auto h-[80vh]"
            srcDoc={htmlCode}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeField;
