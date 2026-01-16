import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  approveDefineDivisionFailed,
  approveDefineDivisionSuccess,
  APPROVE_DEFINE_DIVISION_START,
} from '~/modules/configuration/redux/actions/define-division'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const approveDefineDivisionApi = (params) => {
  const uri = `v1/cost-centers/divisions/${params}/approve`
  return api.put(uri, params)
}

function* doApproveDefineDivision(action) {
  try {
    const response = yield call(approveDefineDivisionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(approveDefineDivisionSuccess(response.payload))

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
    yield put(approveDefineDivisionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchApproveDefineDivision() {
  yield takeLatest(APPROVE_DEFINE_DIVISION_START, doApproveDefineDivision)
}
