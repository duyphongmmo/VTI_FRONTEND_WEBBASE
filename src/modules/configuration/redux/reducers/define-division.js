import {
  CREATE_DEFINE_DIVISION_FAILED,
  CREATE_DEFINE_DIVISION_START,
  CREATE_DEFINE_DIVISION_SUCCESS,
  DELETE_DEFINE_DIVISION_FAILED,
  DELETE_DEFINE_DIVISION_START,
  DELETE_DEFINE_DIVISION_SUCCESS,
  GET_DETAIL_DEFINE_DIVISION_FAILED,
  GET_DETAIL_DEFINE_DIVISION_START,
  GET_DETAIL_DEFINE_DIVISION_SUCCESS,
  CHANGE_STATUS_DEFINE_DIVISION_FAILED,
  CHANGE_STATUS_DEFINE_DIVISION_START,
  CHANGE_STATUS_DEFINE_DIVISION_SUCCESS,
  RESET_DEFINE_DIVISION_DETAIL_STATE,
  SEARCH_DEFINE_DIVISION_FAILED,
  SEARCH_DEFINE_DIVISION_START,
  SEARCH_DEFINE_DIVISION_SUCCESS,
  UPDATE_DEFINE_DIVISION_FAILED,
  UPDATE_DEFINE_DIVISION_START,
  UPDATE_DEFINE_DIVISION_SUCCESS,
  APPROVE_DEFINE_DIVISION_START,
  APPROVE_DEFINE_DIVISION_SUCCESS,
  APPROVE_DEFINE_DIVISION_FAILED,
} from '~/modules/configuration/redux/actions/define-division'

const initialState = {
  isLoading: false,
  list: [],
  details: {},
  total: null,
}

export default function defineDivision(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DEFINE_DIVISION_START:
    case GET_DETAIL_DEFINE_DIVISION_START:
    case CREATE_DEFINE_DIVISION_START:
    case UPDATE_DEFINE_DIVISION_START:
    case CHANGE_STATUS_DEFINE_DIVISION_START:
    case DELETE_DEFINE_DIVISION_START:
    case APPROVE_DEFINE_DIVISION_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_DEFINE_DIVISION_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_DEFINE_DIVISION_FAILED:
      return {
        ...state,
        list: [],
        isLoading: false,
      }
    case GET_DETAIL_DEFINE_DIVISION_SUCCESS:
      return {
        ...state,
        details: action.payload,
        isLoading: false,
      }
    case GET_DETAIL_DEFINE_DIVISION_FAILED:
    case CREATE_DEFINE_DIVISION_SUCCESS:
    case CREATE_DEFINE_DIVISION_FAILED:
    case UPDATE_DEFINE_DIVISION_SUCCESS:
    case UPDATE_DEFINE_DIVISION_FAILED:
    case CHANGE_STATUS_DEFINE_DIVISION_FAILED:
    case CHANGE_STATUS_DEFINE_DIVISION_SUCCESS:
    case APPROVE_DEFINE_DIVISION_SUCCESS:
    case APPROVE_DEFINE_DIVISION_FAILED:
    case DELETE_DEFINE_DIVISION_SUCCESS:
    case DELETE_DEFINE_DIVISION_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_DEFINE_DIVISION_DETAIL_STATE:
      return {
        ...state,
        details: {},
      }
    default:
      return state
  }
}
