import { useState } from "react";
import Editor from "@monaco-editor/react";
import { writeCode } from "reducer/CodeReducer";
import { useDispatch, useSelector } from "react-redux";
import { useTransition } from "react";

const CodeEditor = () => {
  const writtenCode = useSelector(state => state.codeEnv.paperCode)
  const language = useSelector(state => state.codeEnv.paperLang)
  const [pending, delay] = useTransition()
  const dispatch = useDispatch()

  const handleEditorChange = (val, e) => {
    delay(() => {
      dispatch(writeCode({paperCode: val}))
    })
  };

  return (
    <Editor
      height='80vh'
      width='60vw'
      defaultLanguage={language}
      value={writtenCode}
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
