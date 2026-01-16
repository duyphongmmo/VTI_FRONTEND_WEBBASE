import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createCostCenterFailed,
  createCostCenterSuccess,
  CREATE_COST_CENTER_START,
} from '~/modules/configuration/redux/actions/define-cost-center'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createCostCenterApi = (params) => {
  const uri = `v1/cost-centers`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateCostCenter(action) {
  try {
    const response = yield call(createCostCenterApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createCostCenterSuccess(response.data))

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
    yield put(createCostCenterFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateCostCenter() {
  yield takeLatest(CREATE_COST_CENTER_START, doCreateCostCenter)
}
