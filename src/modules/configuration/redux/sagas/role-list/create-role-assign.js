import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createRoleAssignFailed,
  createRoleAssignSuccess,
  CREATE_ROLE_ASSIGN_START,
} from '../../actions/role-list'

const createRoleAssignApi = (body) => {
  const uri = `/v1/users/user-role-settings`
  return api.post(uri, body)
}

function* doCreateRoleAssign(action) {
  try {
    const response = yield call(createRoleAssignApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createRoleAssignSuccess(response.data))

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
    yield put(createRoleAssignFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateRoleAssign() {
  yield takeLatest(CREATE_ROLE_ASSIGN_START, doCreateRoleAssign)
}
