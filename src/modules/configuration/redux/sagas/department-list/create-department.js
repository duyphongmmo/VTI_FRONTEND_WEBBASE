import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createDepartmentFailed,
  createDepartmentSuccess,
  CREATE_DEPARTMENT_START,
} from '~/modules/configuration/redux/actions/department-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createDepartmentApi = (params) => {
  const uri = `/v1/users/department-settings`
  return api.post(uri, params)
}

function* doCreateDepartment(action) {
  try {
    const response = yield call(createDepartmentApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createDepartmentSuccess(response.data))

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
    yield put(createDepartmentFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateDepartment() {
  yield takeLatest(CREATE_DEPARTMENT_START, doCreateDepartment)
}
