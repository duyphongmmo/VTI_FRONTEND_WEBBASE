import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDefineSectionDetailByIdSuccess,
  getDefineSectionDetailByIdFailed,
  GET_DETAIL_DEFINE_SECTION_START,
} from '~/modules/configuration/redux/actions/define-section'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getDefineSectionDetailApi = (params) => {
  const uri = `v1/cost-centers/sections/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDefineSectionDetail(action) {
  try {
    const response = yield call(getDefineSectionDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDefineSectionDetailByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDefineSectionDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDefineSectionDetail() {
  yield takeLatest(GET_DETAIL_DEFINE_SECTION_START, doGetDefineSectionDetail)
}
