import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  changeStatusCostCenterFailed,
  changeStatusCostCenterSuccess,
  CHANGE_STATUS_COST_CENTER_START,
} from '~/modules/configuration/redux/actions/define-cost-center'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const changeStatusCostCenterApi = (params) => {
  const uri = `v1/cost-centers/${params?.id}/change-status`
  return api.put(uri, params)
}

function* doChangeStatusCostCenter(action) {
  try {
    const response = yield call(changeStatusCostCenterApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(changeStatusCostCenterSuccess(response.payload))

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
    yield put(changeStatusCostCenterFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchChangeStatusCostCenter() {
  yield takeLatest(CHANGE_STATUS_COST_CENTER_START, doChangeStatusCostCenter)
}
