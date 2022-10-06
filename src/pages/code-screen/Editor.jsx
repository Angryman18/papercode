import Editor from "@monaco-editor/react";
import { writeCode } from "reducer/CodeReducer";
import { useDispatch, useSelector } from "react-redux";

const CodeEditor = () => {
  const writtenCode = useSelector((state) => state.codeEnv.paperCode);
  const language = useSelector((state) => state.codeEnv.paperLang);
  const dispatch = useDispatch();

  const handleEditorChange = (val, e) => {
    dispatch(writeCode({ paperCode: val }));
  };

  function handleEditorMount(editor, monaco) {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      alert("you've pressed the very key combination"); 
    });
  }

  return (
    <Editor
      height='80vh'
      width='60vw'
      defaultLanguage={language}
      value={writtenCode}
      onChange={handleEditorChange}
      theme='vs-dark'
      onMount={handleEditorMount}
      options={{
        quickSuggestions: true,
        lineHeight: 20,
        fontSize: 17,
        formatOnPaste: true,
        fontFamily: "operator mono",
        smoothScrolling: true,
        stablePeek: true,
        showUnused: true,
        mouseWheelZoom: true,
        wordBasedSuggestionsOnlySameLanguage: true,
        minimap: { enabled: false },
      }}
    />
  );
};

export default CodeEditor;
