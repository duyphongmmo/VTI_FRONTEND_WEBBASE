import {
  SEARCH_DEPARTMENT_LIST_START,
  SEARCH_DEPARTMENT_LIST_SUCCESS,
  SEARCH_DEPARTMENT_LIST_FAILED,
  UPDATE_DEPARTMENT_ASSIGN_FAILED,
  UPDATE_DEPARTMENT_ASSIGN_START,
  UPDATE_DEPARTMENT_ASSIGN_SUCCESS,
  GET_DEPARTMENT_ASSIGN_DETAILS_FAILED,
  GET_DEPARTMENT_ASSIGN_DETAILS_START,
  GET_DEPARTMENT_ASSIGN_DETAILS_SUCCESS,
  RESET_DEPARTMENT_ASSIGN_DETAILS_STATE,
  CREATE_DEPARTMENT_START,
  UPDATE_DEPARTMENT_START,
  GET_DEPARTMENT_DETAILS_START,
  ACTIVE_DEPARTMENT_START,
  DEACTIVE_DEPARTMENT_START,
  CREATE_DEPARTMENT_FAILED,
  CREATE_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_FAILED,
  ACTIVE_DEPARTMENT_SUCCESS,
  ACTIVE_DEPARTMENT_FAILED,
  DEACTIVE_DEPARTMENT_SUCCESS,
  DEACTIVE_DEPARTMENT_FAILED,
  GET_DEPARTMENT_DETAILS_FAILED,
  GET_DEPARTMENT_DETAILS_SUCCESS,
  RESET_DEPARTMENT_DETAILS_STATE,
} from '~/modules/configuration/redux/actions/department-list'

const initialState = {
  isLoading: false,
  departmentList: [],
  total: null,
  departmentDetail: {},
  departmentAssign: {},
}

export default function departmentList(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DEPARTMENT_LIST_START:
    case CREATE_DEPARTMENT_START:
    case UPDATE_DEPARTMENT_START:
    case GET_DEPARTMENT_DETAILS_START:
    case ACTIVE_DEPARTMENT_START:
    case DEACTIVE_DEPARTMENT_START:
    case GET_DEPARTMENT_ASSIGN_DETAILS_START:
    case UPDATE_DEPARTMENT_ASSIGN_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_DEPARTMENT_LIST_SUCCESS:
      return {
        ...state,
        departmentList: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }

    case SEARCH_DEPARTMENT_LIST_FAILED:
    case CREATE_DEPARTMENT_FAILED:
    case CREATE_DEPARTMENT_SUCCESS:
    case UPDATE_DEPARTMENT_SUCCESS:
    case UPDATE_DEPARTMENT_FAILED:
    case ACTIVE_DEPARTMENT_SUCCESS:
    case ACTIVE_DEPARTMENT_FAILED:
    case DEACTIVE_DEPARTMENT_SUCCESS:
    case DEACTIVE_DEPARTMENT_FAILED:
    case GET_DEPARTMENT_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_DEPARTMENT_DETAILS_SUCCESS:
      return {
        ...state,
        departmentDetail: action.payload,
        isLoading: false,
      }
    case GET_DEPARTMENT_ASSIGN_DETAILS_SUCCESS:
      return {
        ...state,
        departmentAssign: action.payload,
        total: action.payload.meta.total,
        isLoading: false,
      }
    case GET_DEPARTMENT_ASSIGN_DETAILS_FAILED:
    case UPDATE_DEPARTMENT_ASSIGN_SUCCESS:
    case UPDATE_DEPARTMENT_ASSIGN_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_DEPARTMENT_ASSIGN_DETAILS_STATE:
      return {
        ...state,
        departmentAssign: {},
      }
    case RESET_DEPARTMENT_DETAILS_STATE:
      return {
        ...state,
        departmentDetail: {},
      }
    default:
      return state
  }
}
