// PACKAGES
import { useCallback, useEffect } from "react";
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
import { registerPaperInfo } from "reducer/CodeReducer";

// MISC
import useGraphqlQuery from "hooks/useGraphqlQuery";
import { Languages } from "helper/languages";

const CodeScreen = (props) => {
  const {
    dispatch,
    codeEnv: { paperCode, paperLangExt, paperLang, paperName, paperSync, paperId },
    runner,
    isAuthenticated,
    accessToken,
  } = props;

  const [executeCode] = useCodeRunner(dispatch);
  const userId = useUserId();
  const [request] = useGraphqlQuery();

  const language_id = Languages.find((i) => i.ext === paperLangExt)?.language_id;

  // SYNCING THE PAPAER HADNLER
  const paperSyncHandler = useCallback(() => {
    const data = { paperLang, paperLangExt, paperName, paperOwner: userId, paperCode: btoa(paperCode) };
    dispatch(registerPaperInfo({ data, token: accessToken })).then(() => {
      return pushNotification("Paper Synced");
    });
  }, [paperLang, paperLangExt, paperName, accessToken, dispatch, userId, paperCode]);

  // SYNCING THE PAPER EXECUTION
  useEffect(() => {
    if (paperSync === false && isAuthenticated && !paperId) {
      paperSyncHandler();
    }
  }, [paperSync, isAuthenticated, paperSyncHandler, paperId]);

  // CODE EXECUTION
  useEffect(() => {
    if (runner) {
      executeCode({ language_id, sourceCode: paperCode }).finally(() => {
        dispatch(utilStateSetter({ state: "runner", stateValue: false }));
      });
    }
  }, [runner, dispatch, language_id, paperCode, executeCode]);

  // KEYBOARD EVENTS
  useEffect(() => {
    const saveEvent = async (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        if (isAuthenticated) {
          try {
            const query = savePaperCode(userId, btoa(paperCode), paperId);
            await request(query);
            return pushNotification("Progress is Saved.");
          } catch (err) {
            return pushNotification("Ah. Error Saving Code.");
          }
        }
        return pushNotification("Please Login to Save Your Progress.");
      } else if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        executeCode({ language_id, sourceCode: paperCode });
      }
    };
    window.addEventListener("keydown", saveEvent);
    return () => window.removeEventListener("keydown", saveEvent);
  }, [executeCode, request, isAuthenticated, paperCode, language_id, paperId, userId]);

  return (
    <div className='text-white flex'>
      <File />
      <CodeEditor dispatch={dispatch} />
      <Output dispatch={dispatch} />
    </div>
  );
};

const props = (state) => {
  const runner = state?.utils.runner;
  const codeEnv = state?.codeEnv;
  return { runner, codeEnv };
};

export default connect(props)(CodeScreen);
