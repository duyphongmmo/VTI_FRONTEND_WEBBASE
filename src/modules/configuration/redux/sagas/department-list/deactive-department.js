import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deactiveDepartmentByIdFailed,
  deactiveDepartmentByIdSuccess,
  DEACTIVE_DEPARTMENT_START,
} from '~/modules/configuration/redux/actions/department-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deactiveDepartmentApi = (params) => {
  const uri = `/v1/users/department-settings/${params}/reject`
  return api.put(uri)
}

function* doDeactiveDepartment(action) {
  try {
    const response = yield call(deactiveDepartmentApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deactiveDepartmentByIdSuccess(response.payload))

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
    yield put(deactiveDepartmentByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeactiveDepartment() {
  yield takeLatest(DEACTIVE_DEPARTMENT_START, doDeactiveDepartment)
}
