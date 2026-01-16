import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createDefineSectionFailed,
  createDefineSectionSuccess,
  CREATE_DEFINE_SECTION_START,
} from '~/modules/configuration/redux/actions/define-section'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createDefineSectionApi = (params) => {
  const uri = `v1/cost-centers/sections`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateDefineSection(action) {
  try {
    const response = yield call(createDefineSectionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createDefineSectionSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createDefineSectionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateDefineSection() {
  yield takeLatest(CREATE_DEFINE_SECTION_START, doCreateDefineSection)
}
