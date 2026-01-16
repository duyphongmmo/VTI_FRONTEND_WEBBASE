import { all } from 'redux-saga/effects'


import watchDashboard from './dashboard'
import watchExportReport from './report-export/export-report'
import watchListReport from './report-export/list-report'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    // Dashboard
    watchDashboard(),
    
    // export report
    watchExportReport(),
    watchListReport(),
   
  ])
}
