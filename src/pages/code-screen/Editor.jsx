import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const handleEditorChange = (val, e) => {
    setCode(val);
  };
  return (
    <Editor
      height='80vh'
      width='60vw'
      defaultLanguage='javascript'
      value={code}
      onChange={handleEditorChange}
      theme='vs-dark'
      options={{
        quickSuggestions: true,
        lineHeight: 20,
        fontSize: 16,
        formatOnPaste: true,
        fontFamily: 'operator mono',
        smoothScrolling: true,
        stablePeek: true,
        showUnused: true,
        mouseWheelZoom: true,
        minimap: { enabled: false },
      }}
    />
  );
};

export default CodeEditor;
