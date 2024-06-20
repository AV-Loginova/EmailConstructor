import React, { useEffect, useState, useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { HTMLtemplate } from "../data/template";
import QuestionIcon from "../assets/question.svg";
import DownloadIcon from "../assets/download.svg";
import CopyIcon from "../assets/copy.svg";
import UndoIcon from "../assets/undo.svg";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/htmlmixed/htmlmixed";

interface CodeFieldProps {
  HTMLCode: [string, number];
  isClicked: number;
}

const CodeField: React.FC<CodeFieldProps> = ({ HTMLCode, isClicked }) => {
  const [htmlCode, setHtmlCode] = useState<string>(HTMLtemplate);
  const editorRef = useRef<any | null>(null);

  useEffect(() => {
    if (isClicked && editorRef.current) {
      handleInsertCode();
    }
  }, [isClicked]);

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      const lineNumberToFocus = 155;
      const cursor = editor.getCursor();
      const line = editor.getLine(cursor.line);
      const pos = {
        line: lineNumberToFocus - 1,
        ch: line.length,
        sticky: "after",
      };
      editor.setCursor(pos);
      editor.scrollIntoView({
        line: lineNumberToFocus + 10,
        ch: line.length,
        sticky: "after",
      });
      editor.focus();
    }
  }, []);

  const handleInsertCode = () => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      const codeToInsert = HTMLCode[0];
      const cursor = editor.getCursor();
      const line = editor.getLine(cursor.line);
      const pos = { line: cursor.line, ch: line.length, sticky: "after" };
      const newPos = {
        line: cursor.line + HTMLCode[1] + 1,
        ch: line.length,
        sticky: "after",
      };
      editor.replaceRange(codeToInsert, pos);
      editor.replaceRange("\n", newPos);
      editor.setCursor(newPos);
      editor.focus();
    }
  };

  const handleCodeChange = (editor: string, data: string, value: string) => {
    setHtmlCode(value);
  };

  const copyToClipboard = () => {
    // Remove comments and empty lines before copying to clipboard
    const codeWithoutComments = removeCommentsAndEmptyLines(htmlCode);
    navigator.clipboard
      .writeText(codeWithoutComments)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  const downloadHtmlFile = () => {
    // Remove comments and empty lines before downloading
    const codeWithoutComments = removeCommentsAndEmptyLines(htmlCode);
    const element = document.createElement("a");
    const file = new Blob([codeWithoutComments], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
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
    // Remove consecutive empty lines
    return code.replace(/\n\s*\n/g, "\n");
  };

  const removeCommentsAndEmptyLines = (code: string) => {
    // Remove HTML comments
    let codeWithoutComments = code.replace(/<!--[\s\S]*?-->/g, "");

    // Remove consecutive empty lines after comments removal
    codeWithoutComments = removeEmptyLines(codeWithoutComments);

    return codeWithoutComments;
  };

  return (
    <div className="relative flex justify-between h-[80vh] m-3 p-0">
      <button
        onClick={copyToClipboard}
        className="border-[1px] border-[#253237] h-30px absolute top-[-37px] z-50 
        bg-[#253237e0] text-[#7ca2b2] p-2 rounded-md rounded-b-none hover:bg-[#253237b4] 
        transition-all duration-300"
      >
        <img
          src={CopyIcon}
          width="20"
          alt="Copy Icon"
          className="text-[#7ca2b2]"
        />
      </button>
      <button
        onClick={downloadHtmlFile}
        className="border-[1px] border-[#253237] h-30px absolute top-[-37px] left-[37px] z-50
        bg-[#253237e0] text-[#7ca2b2] p-2 rounded-md rounded-b-none hover:bg-[#253237b4] 
        transition-all duration-300"
      >
        <img
          src={DownloadIcon}
          width="20"
          alt="Download Icon"
          className="text-[#7ca2b2]"
        />
      </button>
      <button
        onClick={undoLastChange}
        className="border-[1px] border-[#253237] h-30px absolute top-[-37px] left-[74px] z-50
        bg-[#253237e0] text-[#7ca2b2] p-2 rounded-md rounded-b-none hover:bg-[#253237b4] 
        transition-all duration-300"
      >
        <img
          src={UndoIcon}
          width="20"
          alt="Undo Icon"
          className="text-[#7ca2b2]"
        />
      </button>
      <div
        className="h-30px absolute top-[-37px] left-[110px] z-50 p-2 cursor-pointer"
        title="Элементы, которые должны находиться внутри новой строки или списка, отмечены желтой кнопкой."
      >
        <img
          src={QuestionIcon}
          width="20"
          alt="Question Icon"
          className="text-[#7ca2b2]"
        />
      </div>

      <div
        className="relative flex flex-col w-[47vw] overflow-scroll rounded-md 
      rounded-tl-none h-[80vh]"
      >
        <CodeMirror
          ref={editorRef}
          value={htmlCode}
          onBeforeChange={handleCodeChange}
          options={{
            mode: "htmlmixed",
            theme: "material",
            lineNumbers: true,
            lineWrapping: true,
          }}
          onChange={() => {}}
        />
      </div>
      <div
        className="preview w-[47vw] border-[#eaeaea] rounded-md border-[1px] 
      bg-[#ffffff] overflow-y-auto h-[80vh]"
      >
        <pre>
          <iframe
            title="Preview"
            className="w-[100%] border-[#eaeaea] rounded-md border-[1px] 
            bg-[#ffffff] overflow-y-auto h-[80vh]"
            srcDoc={htmlCode}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeField;
