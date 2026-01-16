import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteRoleAssignFailed,
  deleteRoleAssignSuccess,
  DELETE_ROLE_ASSIGN_START,
} from '~/modules/configuration/redux/actions/role-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteRoleAssignApi = (params) => {
  const uri = `/v1/users/user-role-settings/${params}`
  return api.delete(uri)
}

function* doDeleteRoleAssign(action) {
  try {
    const response = yield call(deleteRoleAssignApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteRoleAssignSuccess(response.results))

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
    yield put(deleteRoleAssignFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteRoleAssign() {
  yield takeLatest(DELETE_ROLE_ASSIGN_START, doDeleteRoleAssign)
}
