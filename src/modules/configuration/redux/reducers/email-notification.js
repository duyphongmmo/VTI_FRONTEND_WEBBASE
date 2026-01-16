import {
  CREATE_EMAIL_NOTIFICATION_FAILED,
  CREATE_EMAIL_NOTIFICATION_START,
  CREATE_EMAIL_NOTIFICATION_SUCCESS,
  DELETE_EMAIL_NOTIFICATION_FAILED,
  DELETE_EMAIL_NOTIFICATION_START,
  DELETE_EMAIL_NOTIFICATION_SUCCESS,
  GET_EMAIL_NOTIFICATION_DETAILS_FAILED,
  GET_EMAIL_NOTIFICATION_DETAILS_START,
  GET_EMAIL_NOTIFICATION_DETAILS_SUCCESS,
  SEARCH_EMAIL_NOTIFICATION_FAILED,
  SEARCH_EMAIL_NOTIFICATION_START,
  SEARCH_EMAIL_NOTIFICATION_SUCCESS,
  UPDATE_EMAIL_NOTIFICATION_FAILED,
  UPDATE_EMAIL_NOTIFICATION_START,
  UPDATE_EMAIL_NOTIFICATION_SUCCESS,
  RESET_EMAIL_NOTIFICATION_DETAIL_STATE,
} from '~/modules/configuration/redux/actions/email-notification'

const initialState = {
  isLoading: false,
  list: [],
  detail: {},
  total: null,
}

export default function emailNotification(state = initialState, action) {
  switch (action.type) {
    case SEARCH_EMAIL_NOTIFICATION_START:
    case CREATE_EMAIL_NOTIFICATION_START:
    case UPDATE_EMAIL_NOTIFICATION_START:
    case DELETE_EMAIL_NOTIFICATION_START:
    case GET_EMAIL_NOTIFICATION_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_EMAIL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_EMAIL_NOTIFICATION_FAILED:
      return {
        ...state,
        list: [],
        isLoading: false,
        total: 0,
      }
    case CREATE_EMAIL_NOTIFICATION_FAILED:
    case CREATE_EMAIL_NOTIFICATION_SUCCESS:
    case UPDATE_EMAIL_NOTIFICATION_SUCCESS:
    case UPDATE_EMAIL_NOTIFICATION_FAILED:
    case DELETE_EMAIL_NOTIFICATION_SUCCESS:
    case DELETE_EMAIL_NOTIFICATION_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_EMAIL_NOTIFICATION_DETAILS_SUCCESS:
      return {
        ...state,
        detail: action.payload,
        isLoading: false,
      }
    case GET_EMAIL_NOTIFICATION_DETAILS_FAILED:
      return {
        ...state,
        detail: {},
        isLoading: false,
      }
    case RESET_EMAIL_NOTIFICATION_DETAIL_STATE:
      return {
        ...state,
        detail: {},
      }
    default:
      return state
  }
}
