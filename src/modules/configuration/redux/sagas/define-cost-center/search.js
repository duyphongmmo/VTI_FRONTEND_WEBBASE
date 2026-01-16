import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchCostCentersFailed,
  searchCostCentersSuccess,
  SEARCH_COST_CENTER_START,
} from '~/modules/configuration/redux/actions/define-cost-center'
import { api } from '~/services/api'

/**
 * Search factory API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchCostCentersApi = (params) => {
  const uri = `/v1/cost-centers`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchCostCenter(action) {
  try {
    const response = yield call(searchCostCentersApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchCostCentersSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchCostCentersFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search factorys
 */
export default function* watchSearchCostCenters() {
  yield takeLatest(SEARCH_COST_CENTER_START, doSearchCostCenter)
}
