import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchHolonsFailed,
  searchHolonsSuccess,
  SEARCH_HOLON_START,
} from '~/modules/configuration/redux/actions/holon'
import { api } from '~/services/api'

/**
 * Search factory API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchHolonsApi = (params) => {
  const uri = `/v1/cost-centers/holons`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchHolon(action) {
  try {
    const response = yield call(searchHolonsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchHolonsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchHolonsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search factorys
 */
export default function* watchSearchHolons() {
  yield takeLatest(SEARCH_HOLON_START, doSearchHolon)
}
