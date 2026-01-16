import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchEmailNotificationSuccess,
  searchEmailNotificationFailed,
  SEARCH_EMAIL_NOTIFICATION_START,
} from '~/modules/configuration/redux/actions/email-notification'
import { api } from '~/services/api'

/**
 * Search Mo API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchEmailNotificationApi = (params) => {
  const uri = `v1/users/email-notifications/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchEmailNotification(action) {
  try {
    const response = yield call(searchEmailNotificationApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }

      yield put(searchEmailNotificationSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchEmailNotificationFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search Mo
 */
export default function* watchSearchEmailNotification() {
  yield takeLatest(SEARCH_EMAIL_NOTIFICATION_START, doSearchEmailNotification)
}
