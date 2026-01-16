import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  listReportFailed,
  listReportSuccess,
  LIST_REPORT_START,
} from '../../actions/report-export'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const listReportApi = (params) => {
  const uri = `/v1/reports/export-jobs`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doListReport(action) {
  try {
    const response = yield call(listReportApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(listReportSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(listReportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchListReport() {
  yield takeLatest(LIST_REPORT_START, doListReport)
}
