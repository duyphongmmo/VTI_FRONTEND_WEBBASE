export const MMSX_GET_DEVICE_STATUS_SUMMARY_START =
  'MMSX_GET_DEVICE_STATUS_SUMMARY_START'
export const MMSX_GET_DEVICE_STATUS_SUMMARY_SUCCESS =
  'MMSX_GET_DEVICE_STATUS_SUMMARY_SUCCESS'
export const MMSX_GET_DEVICE_STATUS_SUMMARY_FAIL =
  'MMSX_GET_DEVICE_STATUS_SUMMARY_FAIL'
export const MMSX_REFRESH_DEVICE_STATUS_SUMMARY_START =
  'MMSX_REFRESH_DEVICE_STATUS_SUMMARY_START'

export const MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_START =
  'MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_START'
export const MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_SUCCESS =
  'MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_SUCCESS'
export const MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_FAIL =
  'MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_FAIL'
export const MMSX_REFRESH_DEVICE_STATUS_DETAIL_DASHBOARD_START =
  'MMSX_REFRESH_DEVICE_STATUS_DETAIL_DASHBOARD_START'

export const MMSX_GET_DEVICE_LAYOUT_DASHBOARD_START =
  'MMSX_GET_DEVICE_LAYOUT_DASHBOARD_START'
export const MMSX_GET_DEVICE_LAYOUT_DASHBOARD_SUCCESS =
  'MMSX_GET_DEVICE_LAYOUT_DASHBOARD_SUCCESS'
export const MMSX_GET_DEVICE_LAYOUT_DASHBOARD_FAIL =
  'MMSX_GET_DEVICE_LAYOUT_DASHBOARD_FAIL'
export const MMSX_REFRESH_DEVICE_LAYOUT_DASHBOARD_START =
  'MMSX_REFRESH_DEVICE_LAYOUT_DASHBOARD_START'

export const MMSX_GET_DASHBOARD_WARNING_START =
  'MMSX_GET_DASHBOARD_WARNING_START'
export const MMSX_GET_DASHBOARD_WARNING_SUCCESS =
  'MMSX_GET_DASHBOARD_WARNING_SUCCESS'
export const MMSX_GET_DASHBOARD_WARNING_FAIL = 'MMSX_GET_DASHBOARD_WARNING_FAIL'

export const MMSX_RESET_DEVICE_DASHBOARD_STATE = 'MMSX_DEVICE_DASHBOARD_STATE'
export const MMSX_RESET_DEVICE_SUMMARY = 'MMSX_RESET_DEVICE_SUMMARY_DASHBOARD'
export const MMSX_RESET_DEVICE_LAYOUT_DASHBOARD =
  'MMSX_RESET_DEVICE_LAYOUT_DASHBOARD'

export const MMSX_UPDATE_DEVICE_LAYOUT_DASHBOARD =
  'MMSX_UPDATE_DEVICE_LAYOUT_DASHBOARD'

export const MMS_DASHBOARD_SINGLE_DEVICE_CHANGE_STATUS =
  'MMS_DASHBOARD_SINGLE_DEVICE_CHANGE_STATUS'

export const MMSX_UPDATE_AVAILABLE_COLOR = 'MMSX_UPDATE_AVAILABLE_COLOR'
export const MMSX_ADD_WARNING = 'MMSX_ADD_WARNING'

export function refreshDeviceStatusSummary(payload, onSuccess, onError) {
  return {
    type: MMSX_REFRESH_DEVICE_STATUS_SUMMARY_START,
    payload,
    onSuccess,
    onError,
  }
}
export function getDeviceStatusSummary(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEVICE_STATUS_SUMMARY_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDeviceStatusSummarySuccess(payload) {
  return {
    type: MMSX_GET_DEVICE_STATUS_SUMMARY_SUCCESS,
    payload,
  }
}

export function getDeviceStatusSummaryFail() {
  return {
    type: MMSX_GET_DEVICE_STATUS_SUMMARY_FAIL,
  }
}

export function refreshDeviceStatusDetailDashboard(
  payload,
  onSuccess,
  onError,
) {
  return {
    type: MMSX_REFRESH_DEVICE_STATUS_DETAIL_DASHBOARD_START,
    payload,
    onSuccess,
    onError,
  }
}
export function getDeviceStatusDetailDashboard(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDeviceStatusDetailDashboardSuccess(payload) {
  return {
    type: MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_SUCCESS,
    payload,
  }
}

export function getDeviceStatusDetailDashboardFail() {
  return {
    type: MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_FAIL,
  }
}

export function refreshLayout(payload, onSuccess, onError) {
  return {
    type: MMSX_REFRESH_DEVICE_LAYOUT_DASHBOARD_START,
    payload,
    onSuccess,
    onError,
  }
}
export function getDeviceLayoutDashboard(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DEVICE_LAYOUT_DASHBOARD_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDeviceLayoutDashboardSuccess(payload) {
  return {
    type: MMSX_GET_DEVICE_LAYOUT_DASHBOARD_SUCCESS,
    payload,
  }
}

export function getDeviceLayoutDashboardFail() {
  return {
    type: MMSX_GET_DEVICE_LAYOUT_DASHBOARD_FAIL,
  }
}

export function getDashboardWarning(payload, onSuccess, onError) {
  return {
    type: MMSX_GET_DASHBOARD_WARNING_START,
    payload,
    onSuccess,
    onError,
  }
}

export function getDashboardWarningSuccess(payload) {
  return {
    type: MMSX_GET_DASHBOARD_WARNING_SUCCESS,
    payload,
  }
}

export function getDashboardWarningFail() {
  return {
    type: MMSX_GET_DASHBOARD_WARNING_FAIL,
  }
}

export function resetDeviceDashboardState() {
  return {
    type: MMSX_RESET_DEVICE_DASHBOARD_STATE,
  }
}
export function resetSummary() {
  return {
    type: MMSX_RESET_DEVICE_SUMMARY,
  }
}
export function resetDeviceLayoutDashboard() {
  return {
    type: MMSX_RESET_DEVICE_LAYOUT_DASHBOARD,
  }
}

export function addWarning(payload) {
  return {
    type: MMSX_ADD_WARNING,
    payload: payload,
  }
}

export function updateDeviceLayoutDashboard(payload) {
  return {
    type: MMSX_UPDATE_DEVICE_LAYOUT_DASHBOARD,
    payload: payload,
  }
}

export function updateSingleDeviceStatus(payload) {
  return {
    type: MMS_DASHBOARD_SINGLE_DEVICE_CHANGE_STATUS,
    payload: payload,
  }
}

export function updateAvailableColor(payload) {
  return {
    type: MMSX_UPDATE_AVAILABLE_COLOR,
    payload: payload,
  }
}
export default {
  getDeviceStatusSummary,
  getDeviceStatusSummarySuccess,
  getDeviceStatusSummaryFail,
  resetDeviceDashboardState,
  getDeviceStatusDetailDashboard,
  getDeviceStatusDetailDashboardSuccess,
  getDeviceStatusDetailDashboardFail,
  resetSummary,
  resetDeviceLayoutDashboard,
  getDeviceLayoutDashboard,
  getDeviceLayoutDashboardSuccess,
  getDeviceLayoutDashboardFail,
  getDashboardWarning,
  getDashboardWarningSuccess,
  getDashboardWarningFail,
  addWarning,
  refreshDeviceStatusDetailDashboard,
  refreshLayout,
  refreshDeviceStatusSummary,
  updateDeviceLayoutDashboard,
  updateSingleDeviceStatus,
  updateAvailableColor,
}
