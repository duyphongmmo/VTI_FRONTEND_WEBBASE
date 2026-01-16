import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateDefineDivisionFailed,
  updateDefineDivisionSuccess,
  UPDATE_DEFINE_DIVISION_START,
} from '~/modules/configuration/redux/actions/define-division'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search factory API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateDefineDivisionApi = (params) => {
  const uri = `v1/cost-centers/divisions/${params?.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateDefineDivision(action) {
  try {
    const response = yield call(updateDefineDivisionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateDefineDivisionSuccess(response.data))

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
    yield put(updateDefineDivisionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search factorys
 */
export default function* watchUpdateDefineDivision() {
  yield takeLatest(UPDATE_DEFINE_DIVISION_START, doUpdateDefineDivision)
}
