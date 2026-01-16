import {
  CREATE_DEFINE_SECTION_FAILED,
  CREATE_DEFINE_SECTION_START,
  CREATE_DEFINE_SECTION_SUCCESS,
  DELETE_DEFINE_SECTION_FAILED,
  DELETE_DEFINE_SECTION_START,
  DELETE_DEFINE_SECTION_SUCCESS,
  GET_DETAIL_DEFINE_SECTION_FAILED,
  GET_DETAIL_DEFINE_SECTION_START,
  GET_DETAIL_DEFINE_SECTION_SUCCESS,
  RESET_DEFINE_SECTION_DETAIL_STATE,
  SEARCH_DEFINE_SECTION_FAILED,
  SEARCH_DEFINE_SECTION_START,
  SEARCH_DEFINE_SECTION_SUCCESS,
  UPDATE_DEFINE_SECTION_FAILED,
  UPDATE_DEFINE_SECTION_START,
  UPDATE_DEFINE_SECTION_SUCCESS,
  APPROVE_DEFINE_SECTION_START,
  APPROVE_DEFINE_SECTION_SUCCESS,
  APPROVE_DEFINE_SECTION_FAILED,
  CHANGE_STATUS_DEFINE_SECTION_START,
  CHANGE_STATUS_DEFINE_SECTION_SUCCESS,
  CHANGE_STATUS_DEFINE_SECTION_FAILED,
} from '~/modules/configuration/redux/actions/define-section'

const initialState = {
  isLoading: false,
  list: [],
  details: {},
  total: null,
}

export default function defineSection(state = initialState, action) {
  switch (action.type) {
    case SEARCH_DEFINE_SECTION_START:
    case GET_DETAIL_DEFINE_SECTION_START:
    case CREATE_DEFINE_SECTION_START:
    case UPDATE_DEFINE_SECTION_START:
    case CHANGE_STATUS_DEFINE_SECTION_START:
    case DELETE_DEFINE_SECTION_START:
    case APPROVE_DEFINE_SECTION_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_DEFINE_SECTION_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        isLoading: false,
        total: action.payload.total,
      }
    case SEARCH_DEFINE_SECTION_FAILED:
      return {
        ...state,
        list: [],
        isLoading: false,
      }
    case GET_DETAIL_DEFINE_SECTION_SUCCESS:
      return {
        ...state,
        details: action.payload,
        isLoading: false,
      }
    case GET_DETAIL_DEFINE_SECTION_FAILED:
    case CREATE_DEFINE_SECTION_SUCCESS:
    case CREATE_DEFINE_SECTION_FAILED:
    case UPDATE_DEFINE_SECTION_SUCCESS:
    case UPDATE_DEFINE_SECTION_FAILED:
    case CHANGE_STATUS_DEFINE_SECTION_SUCCESS:
    case CHANGE_STATUS_DEFINE_SECTION_FAILED:
    case APPROVE_DEFINE_SECTION_SUCCESS:
    case APPROVE_DEFINE_SECTION_FAILED:
    case DELETE_DEFINE_SECTION_SUCCESS:
    case DELETE_DEFINE_SECTION_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_DEFINE_SECTION_DETAIL_STATE:
      return {
        ...state,
        details: {},
      }
    default:
      return state
  }
}
