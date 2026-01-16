import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  approveCostCenterFailed,
  approveCostCenterSuccess,
  APPROVE_COST_CENTER_START,
} from '~/modules/configuration/redux/actions/define-cost-center'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const approveCostCenterApi = (params) => {
  const uri = `v1/cost-centers/${params}/approve`
  return api.put(uri, params)
}

function* doApproveCostCenter(action) {
  try {
    const response = yield call(approveCostCenterApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(approveCostCenterSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(approveCostCenterFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchApproveCostCenter() {
  yield takeLatest(APPROVE_COST_CENTER_START, doApproveCostCenter)
}
