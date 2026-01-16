import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getHolonDetailsByIdSuccess,
  getHolonDetailsByIdFailed,
  GET_HOLON_DETAILS_START,
} from '~/modules/configuration/redux/actions/holon'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getHolonDetailApi = (params) => {
  const uri = `v1/cost-centers/holons/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetHolonDetail(action) {
  try {
    const response = yield call(getHolonDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getHolonDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getHolonDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetHolonDetail() {
  yield takeLatest(GET_HOLON_DETAILS_START, doGetHolonDetail)
}
