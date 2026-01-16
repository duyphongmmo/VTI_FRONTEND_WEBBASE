import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteDefineSectionFailed,
  deleteDefineSectionSuccess,
  DELETE_DEFINE_SECTION_START,
} from '~/modules/configuration/redux/actions/define-section'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteDefineSectionApi = (params) => {
  const uri = `v1/cost-centers/sections/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteDefineSection(action) {
  try {
    const response = yield call(deleteDefineSectionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteDefineSectionSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteDefineSectionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteDefineSection() {
  yield takeLatest(DELETE_DEFINE_SECTION_START, doDeleteDefineSection)
}
