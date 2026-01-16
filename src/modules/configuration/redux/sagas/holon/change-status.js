import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  changeStatusHolonFailed,
  changeStatusHolonSuccess,
  CHANGE_STATUS_HOLON_START,
} from '~/modules/configuration/redux/actions/holon'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const changeStatusHolonApi = (params) => {
  const uri = `v1/cost-centers/holons/${params?.id}/change-status`
  return api.put(uri, params)
}

function* doChangeStatusHolon(action) {
  try {
    const response = yield call(changeStatusHolonApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(changeStatusHolonSuccess(response.payload))

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
    yield put(changeStatusHolonFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchChangeStatusHolon() {
  yield takeLatest(CHANGE_STATUS_HOLON_START, doChangeStatusHolon)
}
