import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectRoleAssignByIdFailed,
  rejectRoleAssignByIdSuccess,
  REJECT_ROLE_ASSIGN_START,
} from '~/modules/configuration/redux/actions/role-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectRoleAssignApi = (params) => {
  const uri = `/v1/users/user-role-settings/${params}/lock`
  return api.put(uri)
}

function* doRejectRoleAssign(action) {
  try {
    const response = yield call(rejectRoleAssignApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectRoleAssignByIdSuccess(response.payload))

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
    yield put(rejectRoleAssignByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectRoleAssign() {
  yield takeLatest(REJECT_ROLE_ASSIGN_START, doRejectRoleAssign)
}
