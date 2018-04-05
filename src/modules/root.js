import { combineReducers } from "redux";

import appReducer from "./App";

export const rootReducer = combineReducers({
  app: appReducer
});
