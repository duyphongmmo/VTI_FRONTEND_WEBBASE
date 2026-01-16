import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteHolonFailed,
  deleteHolonSuccess,
  DELETE_HOLON_START,
} from '~/modules/configuration/redux/actions/holon'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteHolonApi = (params) => {
  const uri = `v1/cost-centers/holons/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteHolon(action) {
  try {
    const response = yield call(deleteHolonApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteHolonSuccess(response.results))

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
    yield put(deleteHolonFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteHolon() {
  yield takeLatest(DELETE_HOLON_START, doDeleteHolon)
}
