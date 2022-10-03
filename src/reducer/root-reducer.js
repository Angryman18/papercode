import SnackReducer from "./SnackReducer";
import CodeReducer from "./CodeReducer";
import { combineReducers } from "redux";

const totalReducers = combineReducers({
  snacks: SnackReducer,
  codeEnv: CodeReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return [{}];
  }
  return totalReducers(state, action);
};

export default rootReducer;
