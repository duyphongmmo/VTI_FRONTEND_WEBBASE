import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateHolonFailed,
  updateHolonSuccess,
  UPDATE_HOLON_START,
} from '~/modules/configuration/redux/actions/holon'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search factory API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateHolonApi = (params) => {
  const uri = `v1/cost-centers/holons/${params?.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateHolon(action) {
  try {
    const response = yield call(updateHolonApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateHolonSuccess(response.data))

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
    yield put(updateHolonFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search factorys
 */
export default function* watchUpdateHolon() {
  yield takeLatest(UPDATE_HOLON_START, doUpdateHolon)
}
