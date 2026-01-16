import {
  SEARCH_ROLE_LIST_START,
  SEARCH_ROLE_LIST_SUCCESS,
  SEARCH_ROLE_LIST_FAILED,
  UPDATE_ROLE_ASSIGN_FAILED,
  UPDATE_ROLE_ASSIGN_START,
  UPDATE_ROLE_ASSIGN_SUCCESS,
  GET_ROLE_ASSIGN_DETAILS_FAILED,
  GET_ROLE_ASSIGN_DETAILS_START,
  GET_ROLE_ASSIGN_DETAILS_SUCCESS,
  RESET_ROLE_ASSIGN_DETAILS_STATE,
  CREATE_ROLE_ASSIGN_START,
  DELETE_ROLE_ASSIGN_START,
  CONFIRM_ROLE_ASSIGN_START,
  REJECT_ROLE_ASSIGN_START,
  CREATE_ROLE_ASSIGN_FAILED,
  CREATE_ROLE_ASSIGN_SUCCESS,
  REJECT_ROLE_ASSIGN_FAILED,
  REJECT_ROLE_ASSIGN_SUCCESS,
  CONFIRM_ROLE_ASSIGN_FAILED,
  CONFIRM_ROLE_ASSIGN_SUCCESS,
  DELETE_ROLE_ASSIGN_FAILED,
  DELETE_ROLE_ASSIGN_SUCCESS,
} from '~/modules/configuration/redux/actions/role-list'

const initialState = {
  isLoading: false,
  roleList: [],
  total: null,
  roleDetail: {},
}

export default function roleManagement(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ROLE_LIST_START:
    case CREATE_ROLE_ASSIGN_START:
    case UPDATE_ROLE_ASSIGN_START:
    case DELETE_ROLE_ASSIGN_START:
    case CONFIRM_ROLE_ASSIGN_START:
    case REJECT_ROLE_ASSIGN_START:
    case GET_ROLE_ASSIGN_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_ROLE_LIST_SUCCESS:
      return {
        ...state,
        roleList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case GET_ROLE_ASSIGN_DETAILS_SUCCESS:
      return {
        ...state,
        roleDetail: action.payload,
        isLoading: false,
      }
    case GET_ROLE_ASSIGN_DETAILS_FAILED:
    case UPDATE_ROLE_ASSIGN_FAILED:
    case UPDATE_ROLE_ASSIGN_SUCCESS:
    case CREATE_ROLE_ASSIGN_FAILED:
    case CREATE_ROLE_ASSIGN_SUCCESS:
    case REJECT_ROLE_ASSIGN_FAILED:
    case REJECT_ROLE_ASSIGN_SUCCESS:
    case CONFIRM_ROLE_ASSIGN_FAILED:
    case CONFIRM_ROLE_ASSIGN_SUCCESS:
    case DELETE_ROLE_ASSIGN_FAILED:
    case DELETE_ROLE_ASSIGN_SUCCESS:
    case SEARCH_ROLE_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_ROLE_ASSIGN_DETAILS_STATE:
      return {
        ...state,
        roleDetail: {},
      }
    default:
      return state
  }
}
