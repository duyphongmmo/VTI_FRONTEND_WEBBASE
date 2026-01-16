import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createHolonFailed,
  createHolonSuccess,
  CREATE_HOLON_START,
} from '~/modules/configuration/redux/actions/holon'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createHolonApi = (params) => {
  const uri = `v1/cost-centers/holons`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateHolon(action) {
  try {
    const response = yield call(createHolonApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createHolonSuccess(response.data))

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
    yield put(createHolonFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateHolon() {
  yield takeLatest(CREATE_HOLON_START, doCreateHolon)
}
