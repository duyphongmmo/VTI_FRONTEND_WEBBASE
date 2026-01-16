import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateEmailNotificationFailed,
  updateEmailNotificationSuccess,
  UPDATE_EMAIL_NOTIFICATION_START,
} from '~/modules/configuration/redux/actions/email-notification'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update BOO API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateEmailNotificationApi = (params) => {
  const uri = `v1/users/email-notifications/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateEmailNotification(action) {
  try {
    const response = yield call(updateEmailNotificationApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateEmailNotificationSuccess(response.data))

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
    yield put(updateEmailNotificationFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchUpdateEmailNotification() {
  yield takeLatest(UPDATE_EMAIL_NOTIFICATION_START, doUpdateEmailNotification)
}
