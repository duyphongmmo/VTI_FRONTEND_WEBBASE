import { combineReducers } from "redux";

import dashboard from "./dashboard";
import reportExport from "./report-export";
import badProc from "./bad-proc";

export default combineReducers({
  dashboard,
  reportExport,
  badProc,
});
