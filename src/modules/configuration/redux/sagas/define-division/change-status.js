import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  changeStatusDefineDivisionFailed,
  changeStatusDefineDivisionSuccess,
  CHANGE_STATUS_DEFINE_DIVISION_START,
} from '~/modules/configuration/redux/actions/define-division'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const changeStatusDefineDivisionApi = (params) => {
  const uri = `v1/cost-centers/divisions/${params?.id}/change-status`
  return api.put(uri, params)
}

function* doChangeStatusDefineDivision(action) {
  try {
    const response = yield call(changeStatusDefineDivisionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(changeStatusDefineDivisionSuccess(response.payload))

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
    yield put(changeStatusDefineDivisionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchChangeStatusDefineDivision() {
  yield takeLatest(
    CHANGE_STATUS_DEFINE_DIVISION_START,
    doChangeStatusDefineDivision,
  )
}
