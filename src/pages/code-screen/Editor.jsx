// PACKAGES
import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
// MISC
import { writeCode } from "reducer/CodeReducer";
import { utilStateSetter } from "reducer/UtilsReducer";

const CodeEditor = ({ dispatch }) => {
  const writtenCode = useSelector((state) => state.codeEnv.paperCode);
  const language = useSelector((state) => state.codeEnv.paperLang);

  const handleEditorChange = (val, e) => {
    dispatch(writeCode({ paperCode: val }));
  };

  function handleEditorMount(editor, monaco) {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      dispatch(utilStateSetter({ state: "runner", stateValue: true }));
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
        fontFamily: "Fira Code",
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
