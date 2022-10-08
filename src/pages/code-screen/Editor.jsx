// PACKAGES
import { useCallback } from "react";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
// MISC
import { writeCode } from "reducer/CodeReducer";
import useCodeRunner from "hooks/useCodeRunner";
import { Languages } from "helper/languages";

const CodeEditor = () => {
  const writtenCode = useSelector((state) => state.codeEnv.paperCode);
  const language = useSelector((state) => state.codeEnv.paperLang);
  const paperLang = useSelector(state => state.codeEnv.paperLangExt)
  const dispatch = useDispatch();
  const [executeCode] = useCodeRunner(dispatch);

  const language_id = Languages.find((i) => i.ext === paperLang).language_id;

  const handleEditorChange = (val, e) => {
    dispatch(writeCode({ paperCode: val }));
  };

  const executeFreshCode = useCallback(() => {
    return executeCode({ language_id, sourceCode: writtenCode });
  }, [writtenCode, language_id, executeCode]);

  function handleEditorMount(editor, monaco) {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, executeFreshCode);
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
