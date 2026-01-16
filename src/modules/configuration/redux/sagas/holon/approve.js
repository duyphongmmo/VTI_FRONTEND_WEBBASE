import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  approveHolonFailed,
  approveHolonSuccess,
  APPROVE_HOLON_START,
} from '~/modules/configuration/redux/actions/holon'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const approveHolonApi = (params) => {
  const uri = `v1/cost-centers/holons/${params}/approve`
  return api.put(uri, params)
}

function* doApproveHolon(action) {
  try {
    const response = yield call(approveHolonApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(approveHolonSuccess(response.payload))

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
    yield put(approveHolonFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchApproveHolon() {
  yield takeLatest(APPROVE_HOLON_START, doApproveHolon)
}
