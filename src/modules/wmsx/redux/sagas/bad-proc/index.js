import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_BAD_PROC,
  GET_BAD_PROC_BY_NAME,
  getBadProcByNameSuccess,
  getBadProcSuccess,
} from "../../actions/bad-proc";
import { getBadProcApi, getBadProcByNameApi } from "../../api/bad-proc";
import addNotification from "~/utils/toast";
import { NOTIFICATION_TYPE } from "~/common/constants";

function* doGetBadProc(action) {
  try {
    const response = yield call(getBadProcApi, action?.payload);
    if (response?.statusCode === 200) {
      yield put(getBadProcSuccess(response?.data?.items));
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess();
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      );

      throw new Error(response?.message);
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError();
    }
  }
}

function* doGetBadProcByName(action) {
  try {
    const response = yield call(getBadProcByNameApi, action?.payload);
    if (response?.statusCode === 200) {
      yield put(getBadProcByNameSuccess(response?.data?.items));
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess();
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      );

      throw new Error(response?.message);
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError();
    }
  }
}

export default function* watchBadProc() {
  yield takeLatest(GET_BAD_PROC, doGetBadProc);
  yield takeLatest(GET_BAD_PROC_BY_NAME, doGetBadProcByName);
}
