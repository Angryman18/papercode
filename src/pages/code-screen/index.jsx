// PACKAGES
import { useEffect } from "react";
import { useUserId } from "@nhost/react";
import { connect } from "react-redux";

// COMPONENTS
import CodeEditor from "./Editor";
import File from "./File";
import Output from "./Output";

// ACTIONS REDUCERS, SERVICES
import { pushNotification } from "actions/snack.action";
import useCodeRunner from "hooks/useCodeRunner";
import { utilStateSetter } from "reducer/UtilsReducer";
import { savePaperCode } from "service/query";

// MISC
import useGraphqlQuery from "hooks/useGraphqlQuery";
import { Languages } from "helper/languages";

const CodeScreen = (props) => {
  const { dispatch, sourceCode, paperId, runner, paperLangExt, isAuthenticated } = props;
  const [executeCode] = useCodeRunner(dispatch);
  const userId = useUserId();
  const [request] = useGraphqlQuery();

  const language_id = Languages.find((i) => i.ext === paperLangExt)?.language_id;

  console.log(paperId, language_id)

  useEffect(() => {
    if (runner) {
      executeCode({ language_id, sourceCode }).finally(() => {
        dispatch(utilStateSetter({ state: "runner", stateValue: false }));
      });
    }
  }, [runner, dispatch, language_id, sourceCode, executeCode]);

  useEffect(() => {
    const saveEvent = async (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        if (isAuthenticated) {
          try {
            const query = savePaperCode(userId, btoa(sourceCode), paperId);
            await request(query);
            return pushNotification("Progress is Saved.");
          } catch (err) {
            return pushNotification("Ah. Error Saving Code.");
          }
        }
        return pushNotification("Please Login to Save Your Progress.");
      } else if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        executeCode({ language_id, sourceCode });
      }
    };
    window.addEventListener("keydown", saveEvent);
    return () => window.removeEventListener("keydown", saveEvent);
  }, [executeCode, isAuthenticated, sourceCode, language_id, request, paperId, userId]);

  return (
    <div className='text-white flex'>
      <File />
      <CodeEditor />
      <Output />
    </div>
  );
};

const props = (state) => {
  const sourceCode = state?.codeEnv?.paperCode;
  const paperId = state?.codeEnv?.paperId;
  const runner = state?.utils.runner;
  const paperLangExt = state?.codeEnv?.paperLangExt;
  return { sourceCode, paperId, runner, paperLangExt };
};

export default connect(props)(CodeScreen);
