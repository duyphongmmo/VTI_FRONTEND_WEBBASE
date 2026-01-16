import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createEmailNotificationFailed,
  createEmailNotificationSuccess,
  CREATE_EMAIL_NOTIFICATION_START,
} from '~/modules/configuration/redux/actions/email-notification'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createEmailNotificationApi = (params) => {
  const uri = `v1/users/email-notifications/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateEmailNotification(action) {
  try {
    const response = yield call(createEmailNotificationApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createEmailNotificationSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response.statusText,
        NOTIFICATION_TYPE.ERROR,
      )
      yield put(createEmailNotificationFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(createEmailNotificationFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateEmailNotification() {
  yield takeLatest(CREATE_EMAIL_NOTIFICATION_START, doCreateEmailNotification)
}
