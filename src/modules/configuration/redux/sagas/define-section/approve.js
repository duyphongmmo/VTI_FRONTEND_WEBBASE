import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  approveDefineSectionFailed,
  approveDefineSectionSuccess,
  APPROVE_DEFINE_SECTION_START,
} from '~/modules/configuration/redux/actions/define-section'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const approveDefineSectionApi = (params) => {
  const uri = `v1/cost-centers/sections/${params}/approve`
  return api.put(uri)
}

function* doApproveDefineSection(action) {
  try {
    const response = yield call(approveDefineSectionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(approveDefineSectionSuccess(response.payload))

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
    yield put(approveDefineSectionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchApproveDefineSection() {
  yield takeLatest(APPROVE_DEFINE_SECTION_START, doApproveDefineSection)
}
