import {
  CREATE_HOLON_FAILED,
  CREATE_HOLON_START,
  CREATE_HOLON_SUCCESS,
  DELETE_HOLON_FAILED,
  DELETE_HOLON_START,
  DELETE_HOLON_SUCCESS,
  GET_HOLON_DETAILS_START,
  GET_HOLON_DETAILS_SUCCESS,
  GET_HOLON_DETAILS_FAILED,
  CHANGE_STATUS_HOLON_START,
  CHANGE_STATUS_HOLON_SUCCESS,
  RESET_HOLON_DETAILS_STATE,
  SEARCH_HOLON_FAILED,
  SEARCH_HOLON_START,
  SEARCH_HOLON_SUCCESS,
  UPDATE_HOLON_FAILED,
  UPDATE_HOLON_START,
  UPDATE_HOLON_SUCCESS,
  APPROVE_HOLON_START,
  APPROVE_HOLON_SUCCESS,
  APPROVE_HOLON_FAILED,
  CHANGE_STATUS_HOLON_FAILED,
} from '~/modules/configuration/redux/actions/holon'

const initialState = {
  isLoading: false,
  holonList: [],
  holonDetail: {},
  total: null,
}

export default function holon(state = initialState, action) {
  switch (action.type) {
    case SEARCH_HOLON_START:
    case GET_HOLON_DETAILS_START:
    case CREATE_HOLON_START:
    case UPDATE_HOLON_START:
    case CHANGE_STATUS_HOLON_START:
    case DELETE_HOLON_START:
    case APPROVE_HOLON_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_HOLON_SUCCESS:
      return {
        ...state,
        holonList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_HOLON_FAILED:
      return {
        ...state,
        holonList: [],
        isLoading: false,
      }
    case GET_HOLON_DETAILS_SUCCESS:
      return {
        ...state,
        holonDetail: action.payload,
        isLoading: false,
      }
    case CREATE_HOLON_SUCCESS:
    case CREATE_HOLON_FAILED:
    case UPDATE_HOLON_SUCCESS:
    case UPDATE_HOLON_FAILED:
    case GET_HOLON_DETAILS_FAILED:
    case CHANGE_STATUS_HOLON_SUCCESS:
    case CHANGE_STATUS_HOLON_FAILED:
    case APPROVE_HOLON_SUCCESS:
    case APPROVE_HOLON_FAILED:
    case DELETE_HOLON_SUCCESS:
    case DELETE_HOLON_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_HOLON_DETAILS_STATE:
      return {
        ...state,
        holonDetail: {},
      }
    default:
      return state
  }
}
