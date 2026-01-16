import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getCostCenterDetailsByIdSuccess,
  getCostCenterDetailsByIdFailed,
  GET_COST_CENTER_DETAILS_START,
} from '~/modules/configuration/redux/actions/define-cost-center'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getCostCenterDetailApi = (params) => {
  const uri = `v1/cost-centers/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCostCenterDetail(action) {
  try {
    const response = yield call(getCostCenterDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getCostCenterDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getCostCenterDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetCostCenterDetail() {
  yield takeLatest(GET_COST_CENTER_DETAILS_START, doGetCostCenterDetail)
}
