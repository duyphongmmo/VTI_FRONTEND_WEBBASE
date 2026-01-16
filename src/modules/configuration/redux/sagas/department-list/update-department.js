import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateDepartmentFailed,
  updateDepartmentSuccess,
  UPDATE_DEPARTMENT_START,
} from '~/modules/configuration/redux/actions/department-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateDepartmentApi = (params) => {
  const uri = `/v1/users/department-settings/${params.id}`
  return api.put(uri, params)
}

function* doUpdateDepartment(action) {
  try {
    const response = yield call(updateDepartmentApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateDepartmentSuccess(response.data))

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
    yield put(updateDepartmentFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateDepartment() {
  yield takeLatest(UPDATE_DEPARTMENT_START, doUpdateDepartment)
}
