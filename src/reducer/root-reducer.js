import SnackReducer from "./SnackReducer";
import CodeReducer from "./CodeReducer";
import OutputReducer from "./OutputReducer";
import { combineReducers } from "redux";

const totalReducers = combineReducers({
  snacks: SnackReducer,
  codeEnv: CodeReducer,
  output: OutputReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return [{}];
  }
  return totalReducers(state, action);
};

export default rootReducer;
