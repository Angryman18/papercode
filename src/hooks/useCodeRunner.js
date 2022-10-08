import { registerExecutionToken, resolvedTokenInfo } from "service/coderunner.service";
import { getOutputObject, updateState } from "reducer/OutputReducer";
import { pushNotification } from "actions/snack.action";

const useCodeRunner = (dispatch) => {
  const runCode = async (data) => {
    data.source_code = btoa(data?.sourceCode);
    dispatch(updateState({ state: "loading", stateValue: true }));
    const { token } = await registerExecutionToken(JSON.stringify(data)).catch(() => {
      dispatch(updateState({ state: "loading", stateValue: false }));
      return pushNotification("Error Occured. Api Call Failed");
    });
    const info = await resolvedTokenInfo(token).catch(() => {
      dispatch(updateState({ state: "loading", stateValue: false }));
      return pushNotification("Error Occured. Api Call Failed");
    });
    dispatch(getOutputObject({ ...info, loading: false }));
    if (info.status.id === 3) return info.stdout;
    return info.stderr;
  };
  return [runCode];
};
export default useCodeRunner;
