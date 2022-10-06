import { registerExecutionToken, resolvedTokenInfo } from "service/coderunner.service";
import { getOutputObject } from "reducer/OutputReducer";

const useCodeRunner = (dispatch) => {
  const runCode = async (data) => {
    data.source_code = btoa(data?.sourceCode);
    const { token } = await registerExecutionToken(JSON.stringify(data)).catch((er) => {
      console.log("err or happened");
    });
    const info = await resolvedTokenInfo(token).catch((err) => {
      console.log("resolved token error");
    });
    dispatch(getOutputObject(info));
    if (info.status.id === 3) return info.stdout;
    return info.stderr;
  };
  return [runCode];
};
export default useCodeRunner;
