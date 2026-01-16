import { combineReducers } from 'redux'

import dashboard from './dashboard'
import reportExport from './report-export'

export default combineReducers({
  dashboard,
  reportExport,
})
