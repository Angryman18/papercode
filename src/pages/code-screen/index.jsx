import { useEffect } from "react";
import CodeEditor from "./Editor";
import File from "./File";
import Output from "./Output";
import { pushNotification } from "actions/snack.action";

const CodeScreen = ({ isAuthenticated }) => {
  useEffect(() => {
    const saveEvent = (e) => {
      if (e.ctrlKey && e.key === "s") {
        if (isAuthenticated) return pushNotification("Progress Saved.");
        return pushNotification("Please Login to Save.");
      } else if (e.ctrlKey && e.key === "Enter") {
        alert("Ctrl Enter Hitted");
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
