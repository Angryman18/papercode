import { useEffect } from "react";
import CodeEditor from "./Editor";
import File from "./File";
import Output from "./Output";
import { pushNotification } from "actions/snack.action";
import useCodeRunner from "hooks/useCodeRunner";
import { useDispatch, useSelector } from "react-redux";
import { Languages } from "helper/languages";

const CodeScreen = ({ isAuthenticated }) => {
  const sourceCode = useSelector((state) => state.codeEnv.paperCode);
  const paperLang = useSelector(state => state.codeEnv.paperLangExt)
  const dispatch = useDispatch();
  const [executeCode] = useCodeRunner(dispatch);

  const language_id = Languages.find(i => i.ext === paperLang).language_id

  useEffect(() => {
    const saveEvent = (e) => {
      if (e.ctrlKey && e.key === "s") {
        if (isAuthenticated) return pushNotification("Progress Saved.");
        return pushNotification("Please Login to Save Your Progress.");
      } else if (e.ctrlKey && e.key === "Enter") {
        executeCode({ language_id, sourceCode });
      }
    };
    window.addEventListener("keydown", saveEvent);
    return () => window.removeEventListener("keydown", saveEvent);
  }, [executeCode, isAuthenticated, sourceCode]);

  return (
    <div className='text-white flex'>
      <File />
      <CodeEditor />
      <Output />
    </div>
  );
};

export default CodeScreen;
