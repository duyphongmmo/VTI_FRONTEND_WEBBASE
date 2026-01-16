export const EXPORT_REPORT_START = 'WMSX_EXPORT_REPORT_START'
export const EXPORT_REPORT_SUCCESS = 'WMSX_EXPORT_REPORT_SUCCESS'
export const EXPORT_REPORT_FAILED = 'WMSX_EXPORT_REPORT_FAILED'

export const LIST_REPORT_START = 'WMSX_LIST_REPORT_START'
export const LIST_REPORT_SUCCESS = 'WMSX_LIST_REPORT_SUCCESS'
export const LIST_REPORT_FAILED = 'WMSX_LIST_REPORT_FAILED'

export const DOWNLOAD_REPORT_START = 'WMSX_DOWNLOAD_REPORT_START'
export const DOWNLOAD_REPORT_SUCCESS = 'WMSX_DOWNLOAD_REPORT_SUCCESS'
export const DOWNLOAD_REPORT_FAILED = 'WMSX_DOWNLOAD_REPORT_FAILED'
export function exportReport(payload, onSuccess, onError) {
  return {
    type: EXPORT_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function exportReportSuccess(payload) {
  return {
    type: EXPORT_REPORT_SUCCESS,
    payload: payload,
  }
}

export function exportReportFailed() {
  return {
    type: EXPORT_REPORT_FAILED,
  }
}
export function listReport(payload, onSuccess, onError) {
  return {
    type: LIST_REPORT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function listReportSuccess(payload) {
  return {
    type: LIST_REPORT_SUCCESS,
    payload: payload,
  }
}

export function listReportFailed() {
  return {
    type: LIST_REPORT_FAILED,
  }
}
export default {
  exportReport,
  exportReportSuccess,
  exportReportFailed,
  listReport,
  listReportSuccess,
  listReportFailed,
}
