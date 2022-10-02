import { useEffect } from "react";
import CodeEditor from "./Editor";
import File from "./File";
import { pushNotification } from "actions/snack.action";

const CodeScreen = () => {
  useEffect(() => {
    const saveEvent = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        return pushNotification("Progress Saved.");
      }
    };
    window.addEventListener("keydown", saveEvent);
    return () => window.removeEventListener("keydown", saveEvent);
  }, []);

  return (
    <div className='text-white flex'>
      <File />
      <CodeEditor />
    </div>
  );
};

export default CodeScreen;
