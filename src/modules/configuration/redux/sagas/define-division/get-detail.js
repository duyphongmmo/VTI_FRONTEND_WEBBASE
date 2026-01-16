import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDefineDivisionDetailByIdSuccess,
  getDefineDivisionDetailByIdFailed,
  GET_DETAIL_DEFINE_DIVISION_START,
} from '~/modules/configuration/redux/actions/define-division'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDefineDivisionDetailApi = (params) => {
  const uri = `v1/cost-centers/divisions/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDefineDivisionDetail(action) {
  try {
    const response = yield call(getDefineDivisionDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDefineDivisionDetailByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDefineDivisionDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDefineDivisionDetail() {
  yield takeLatest(GET_DETAIL_DEFINE_DIVISION_START, doGetDefineDivisionDetail)
}
