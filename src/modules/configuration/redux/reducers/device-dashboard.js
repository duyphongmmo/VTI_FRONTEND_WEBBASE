import {
  MMSX_GET_DEVICE_STATUS_SUMMARY_START,
  MMSX_GET_DEVICE_STATUS_SUMMARY_FAIL,
  MMSX_RESET_DEVICE_DASHBOARD_STATE,
  MMSX_GET_DEVICE_STATUS_SUMMARY_SUCCESS,
  MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_START,
  MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_FAIL,
  MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_SUCCESS,
  MMSX_RESET_DEVICE_SUMMARY,
  MMSX_RESET_DEVICE_LAYOUT_DASHBOARD,
  MMSX_GET_DEVICE_LAYOUT_DASHBOARD_SUCCESS,
  MMSX_GET_DEVICE_LAYOUT_DASHBOARD_FAIL,
  MMSX_GET_DASHBOARD_WARNING_START,
  MMSX_GET_DASHBOARD_WARNING_SUCCESS,
  MMSX_GET_DASHBOARD_WARNING_FAIL,
  MMSX_ADD_WARNING,
  MMSX_GET_DEVICE_LAYOUT_DASHBOARD_START,
  MMSX_UPDATE_DEVICE_LAYOUT_DASHBOARD,
  MMS_DASHBOARD_SINGLE_DEVICE_CHANGE_STATUS,
  MMSX_UPDATE_AVAILABLE_COLOR,
} from '../actions/device-dashboard'

const initialState = {
  statusSummary: null,
  detailStatus: null,
  isLoading: false,
  layoutDashboard: null,
  warningList: [],
  notiLoading: false,
  totalWarning: 0,

  summaryLoading: false,

  deviceLayoutStatuses: new Map(),
  deviceLayoutDesign: null,
  colorAvailable: [],
}

export default function deviceDashboard(state = initialState, action) {
  switch (action.type) {
    case MMSX_GET_DEVICE_STATUS_SUMMARY_START:
      return {
        ...state,
        summaryLoading: true,
      }
    case MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_START:
    case MMSX_GET_DEVICE_LAYOUT_DASHBOARD_START:
      return {
        ...state,
        isLoading: true,
      }

    case MMSX_GET_DASHBOARD_WARNING_START:
      return {
        ...state,
        notiLoading: true,
      }

    case MMSX_GET_DEVICE_STATUS_SUMMARY_SUCCESS:
      return {
        ...state,
        summaryLoading: false,
        statusSummary: action.payload,
      }

    case MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        detailStatus: action.payload,
      }
    case MMSX_GET_DEVICE_LAYOUT_DASHBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        layoutDashboard: action.payload,
        deviceLayoutDesign: action.payload?.deviceLayoutResponse,
        deviceLayoutStatuses: new Map(
          action.payload?.deviceStatuses?.map((item) => [item.deviceId, item]),
        ),
        colorAvailable: action.payload?.colorAvailable,
      }
    case MMSX_GET_DASHBOARD_WARNING_SUCCESS:
      return {
        ...state,
        notiLoading: false,
        warningList: [
          ...(state.warningList || []),
          ...(action.payload?.items || []),
        ],
        totalWarning: action.payload?.meta?.total,
      }

    case MMSX_GET_DEVICE_STATUS_SUMMARY_FAIL:
    case MMSX_GET_DEVICE_STATUS_DETAIL_DASHBOARD_FAIL:
    case MMSX_GET_DEVICE_LAYOUT_DASHBOARD_FAIL:
      return {
        ...state,
        isLoading: false,
        summaryLoading: false,
      }
    case MMSX_GET_DASHBOARD_WARNING_FAIL:
      return {
        ...state,
        notiLoading: false,
      }
    case MMSX_RESET_DEVICE_DASHBOARD_STATE:
      return {
        ...state,
        detailStatus: null,
      }
    case MMSX_RESET_DEVICE_SUMMARY:
      return {
        ...state,
        statusSummary: null,
      }
    case MMSX_RESET_DEVICE_LAYOUT_DASHBOARD:
      return {
        ...state,
        layoutDashboard: null,
      }

    case MMSX_ADD_WARNING:
      return {
        ...state,
        warningList: [action.payload, ...state.warningList],
      }

    case MMSX_UPDATE_DEVICE_LAYOUT_DASHBOARD:
      return {
        ...state,
        deviceLayoutDesign: action.payload,
      }

    case MMS_DASHBOARD_SINGLE_DEVICE_CHANGE_STATUS:
      const currentStatus = state.deviceLayoutStatuses.get(
        action.payload.deviceId,
      )
      if (
        currentStatus?.currentStatus !== action.payload.currentStatus ||
        currentStatus?.colorId !== action.payload.colorId
      ) {
        return {
          ...state,
          deviceLayoutStatuses: state.deviceLayoutStatuses.set(
            action.payload.deviceId,
            action.payload,
          ),
        }
      }
      return state
    case MMSX_UPDATE_AVAILABLE_COLOR:
      return {
        ...state,
        colorAvailable: action.payload,
      }
    default:
      return state
  }
}
