import {
  EXPORT_REPORT_FAILED,
  EXPORT_REPORT_START,
  EXPORT_REPORT_SUCCESS,
  LIST_REPORT_START,
  LIST_REPORT_SUCCESS,
  LIST_REPORT_FAILED,
} from '~/modules/wmsx/redux/actions/report-export'

const initialState = {
  isLoading: false,
  listReport: [],
  total: null,
}

/**
 * Sample reducer
 * @param {object} state
 * @param {object} action
 * @returns
 */
export default function reportExport(state = initialState, action) {
  switch (action.type) {
    case LIST_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case LIST_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listReport: action?.payload?.items,
        total: action.payload?.meta?.total,
      }
    case LIST_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
        listReport: [],
      }
    case EXPORT_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case EXPORT_REPORT_SUCCESS:
    case EXPORT_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
