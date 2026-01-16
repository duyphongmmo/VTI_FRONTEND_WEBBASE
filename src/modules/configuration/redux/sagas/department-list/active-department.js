import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  activeDepartmentByIdFailed,
  activeDepartmentByIdSuccess,
  ACTIVE_DEPARTMENT_START,
} from '~/modules/configuration/redux/actions/department-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const activeDepartmentApi = (params) => {
  const uri = `/v1/users/department-settings/${params}/confirm`
  return api.put(uri)
}

function* doActiveDepartment(action) {
  try {
    const response = yield call(activeDepartmentApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(activeDepartmentByIdSuccess(response.payload))

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
    yield put(activeDepartmentByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchActiveDepartment() {
  yield takeLatest(ACTIVE_DEPARTMENT_START, doActiveDepartment)
}
