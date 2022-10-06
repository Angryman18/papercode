import { useEffect } from "react";
import CodeEditor from "./Editor";
import File from "./File";
import Output from "./Output";
import { pushNotification } from "actions/snack.action";
import useCodeRunner from "hooks/useCodeRunner";
import { useDispatch, useSelector } from "react-redux";

const CodeScreen = ({ isAuthenticated }) => {
  const writtenCode = useSelector(state => state.codeEnv.paperCode)
  const dispatch = useDispatch()
  const [executeCode] = useCodeRunner(dispatch);

  useEffect(() => {
    const saveEvent = (e) => {
      if (e.ctrlKey && e.key === "s") {
        if (isAuthenticated) return pushNotification("Progress Saved.");
        return pushNotification("Please Login to Save.");
      } else if (e.ctrlKey && e.key === "Enter") {
        alert("Ctrl Enter Hitted");
        executeCode({language_id: 63, sourceCode: writtenCode})
      }
    };
    window.addEventListener("keydown", saveEvent);
    return () => window.removeEventListener("keydown", saveEvent);
  }, []);

  return (
    <div className='text-white flex'>
      <File />
      <CodeEditor />
      <Output />
    </div>
  );
};

export default CodeScreen;
