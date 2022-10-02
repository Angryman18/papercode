import SnackReducer from "./SnackReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  snacks: SnackReducer,
});

export default reducer;
