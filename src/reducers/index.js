import { combineReducers } from "redux";
import stableReducer from "./stable.reducer.js";
import listReducer from "./list.reducer.js";

export default combineReducers({
  stableReducer,
  listReducer,
});
