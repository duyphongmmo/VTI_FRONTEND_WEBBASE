import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getDepartmentDetailsByIdFailed,
  getDepartmentDetailsByIdSuccess,
  GET_DEPARTMENT_DETAILS_START,
} from '~/modules/configuration/redux/actions/department-list'
import { api } from '~/services/api'

const getDepartmentDetailsApi = (params) => {
  const uri = `/v1/users/department-settings/${params}`
  return api.get(uri)
}

function* doGetDepartmentDetails(action) {
  try {
    const response = yield call(getDepartmentDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDepartmentDetailsByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDepartmentDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetDepartmentDetails() {
  yield takeLatest(GET_DEPARTMENT_DETAILS_START, doGetDepartmentDetails)
}
