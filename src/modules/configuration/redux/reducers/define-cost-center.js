import {
  CREATE_COST_CENTER_FAILED,
  CREATE_COST_CENTER_START,
  CREATE_COST_CENTER_SUCCESS,
  DELETE_COST_CENTER_FAILED,
  DELETE_COST_CENTER_START,
  DELETE_COST_CENTER_SUCCESS,
  GET_COST_CENTER_DETAILS_START,
  GET_COST_CENTER_DETAILS_SUCCESS,
  GET_COST_CENTER_DETAILS_FAILED,
  CHANGE_STATUS_COST_CENTER_START,
  CHANGE_STATUS_COST_CENTER_SUCCESS,
  RESET_COST_CENTER_DETAILS_STATE,
  SEARCH_COST_CENTER_FAILED,
  SEARCH_COST_CENTER_START,
  SEARCH_COST_CENTER_SUCCESS,
  UPDATE_COST_CENTER_FAILED,
  UPDATE_COST_CENTER_START,
  UPDATE_COST_CENTER_SUCCESS,
  APPROVE_COST_CENTER_START,
  APPROVE_COST_CENTER_SUCCESS,
  APPROVE_COST_CENTER_FAILED,
  CHANGE_STATUS_COST_CENTER_FAILED,
} from '~/modules/configuration/redux/actions/define-cost-center'

const initialState = {
  isLoading: false,
  list: [],
  details: {},
  total: null,
}

export default function defineCostCenter(state = initialState, action) {
  switch (action.type) {
    case SEARCH_COST_CENTER_START:
    case GET_COST_CENTER_DETAILS_START:
    case CREATE_COST_CENTER_START:
    case UPDATE_COST_CENTER_START:
    case CHANGE_STATUS_COST_CENTER_START:
    case DELETE_COST_CENTER_START:
    case APPROVE_COST_CENTER_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_COST_CENTER_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_COST_CENTER_FAILED:
      return {
        ...state,
        list: [],
        isLoading: false,
      }
    case GET_COST_CENTER_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.payload,
        isLoading: false,
      }
    case CREATE_COST_CENTER_SUCCESS:
    case CREATE_COST_CENTER_FAILED:
    case UPDATE_COST_CENTER_SUCCESS:
    case UPDATE_COST_CENTER_FAILED:
    case GET_COST_CENTER_DETAILS_FAILED:
    case CHANGE_STATUS_COST_CENTER_SUCCESS:
    case CHANGE_STATUS_COST_CENTER_FAILED:
    case APPROVE_COST_CENTER_SUCCESS:
    case APPROVE_COST_CENTER_FAILED:
    case DELETE_COST_CENTER_SUCCESS:
    case DELETE_COST_CENTER_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_COST_CENTER_DETAILS_STATE:
      return {
        ...state,
        details: {},
      }
    default:
      return state
  }
}
