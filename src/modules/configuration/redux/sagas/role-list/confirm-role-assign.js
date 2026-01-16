import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmRoleAssignByIdFailed,
  confirmRoleAssignByIdSuccess,
  CONFIRM_ROLE_ASSIGN_START,
} from '~/modules/configuration/redux/actions/role-list'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmRoleAssignApi = (params) => {
  const uri = `/v1/users/user-role-settings/${params}/unlock`
  return api.put(uri)
}

function* doConfirmRoleAssign(action) {
  try {
    const response = yield call(confirmRoleAssignApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmRoleAssignByIdSuccess(response.payload))

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
    yield put(confirmRoleAssignByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmRoleAssign() {
  yield takeLatest(CONFIRM_ROLE_ASSIGN_START, doConfirmRoleAssign)
}
