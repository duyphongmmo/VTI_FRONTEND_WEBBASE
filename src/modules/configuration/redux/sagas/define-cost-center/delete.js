import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteCostCenterFailed,
  deleteCostCenterSuccess,
  DELETE_COST_CENTER_START,
} from '~/modules/configuration/redux/actions/define-cost-center'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteCostCenterApi = (params) => {
  const uri = `v1/cost-centers/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteCostCenter(action) {
  try {
    const response = yield call(deleteCostCenterApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteCostCenterSuccess(response.results))

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
    yield put(deleteCostCenterFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteCostCenter() {
  yield takeLatest(DELETE_COST_CENTER_START, doDeleteCostCenter)
}
