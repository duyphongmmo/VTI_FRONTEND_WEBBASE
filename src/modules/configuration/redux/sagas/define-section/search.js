import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchDefineSectionFailed,
  searchDefineSectionSuccess,
  SEARCH_DEFINE_SECTION_START,
} from '~/modules/configuration/redux/actions/define-section'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchDefineSectionApi = (params) => {
  const uri = `v1/cost-centers/sections`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchDefineSection(action) {
  try {
    const response = yield call(searchDefineSectionApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchDefineSectionSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDefineSectionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchSearchDefineSection() {
  yield takeLatest(SEARCH_DEFINE_SECTION_START, doSearchDefineSection)
}
