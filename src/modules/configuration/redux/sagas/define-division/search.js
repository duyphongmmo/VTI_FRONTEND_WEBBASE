import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchDefineDivisionFailed,
  searchDefineDivisionSuccess,
  SEARCH_DEFINE_DIVISION_START,
} from '~/modules/configuration/redux/actions/define-division'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchDefineDivisionApi = (params) => {
  const uri = `v1/cost-centers/divisions`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchDefineDivision(action) {
  try {
    const response = yield call(searchDefineDivisionApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchDefineDivisionSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDefineDivisionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchDefineDivision() {
  yield takeLatest(SEARCH_DEFINE_DIVISION_START, doSearchDefineDivision)
}
