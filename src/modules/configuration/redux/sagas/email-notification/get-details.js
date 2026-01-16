import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getEmailNotificationDetailsByIdFailed,
  getEmailNotificationDetailsByIdSuccess,
  GET_EMAIL_NOTIFICATION_DETAILS_START,
} from '~/modules/configuration/redux/actions/email-notification'
import { api } from '~/services/api'

/**
 * Search BOO API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const getEmailNotificationDetailsApi = (params) => {
  const uri = `v1/users/email-notifications/${params}/detail`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetEmailNotificationDetails(action) {
  try {
    const response = yield call(getEmailNotificationDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getEmailNotificationDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getEmailNotificationDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetEmailNotificationDetails() {
  yield takeLatest(
    GET_EMAIL_NOTIFICATION_DETAILS_START,
    doGetEmailNotificationDetails,
  )
}
