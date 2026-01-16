import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateCostCenterFailed,
  updateCostCenterSuccess,
  UPDATE_COST_CENTER_START,
} from '~/modules/configuration/redux/actions/define-cost-center'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search factory API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateCostCenterApi = (params) => {
  const uri = `v1/cost-centers/${params?.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateCostCenter(action) {
  try {
    const response = yield call(updateCostCenterApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateCostCenterSuccess(response.data))

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
    yield put(updateCostCenterFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search factorys
 */
export default function* watchUpdateCostCenter() {
  yield takeLatest(UPDATE_COST_CENTER_START, doUpdateCostCenter)
}
