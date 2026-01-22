import {
  GET_BAD_PROC_BY_NAME_FAILED,
  GET_BAD_PROC_BY_NAME_SUCCESS,
  GET_BAD_PROC_FAILED,
  GET_BAD_PROC_SUCCESS,
} from "../actions/bad-proc";

const initialState = {
  isLoading: false,
  procItems: [],
  badItems: [],
  badModelItems: [],
  badCategoryItems: [],
  top5WostItems: [],
};

export default function badProc(state = initialState, action) {
  switch (action.type) {
    case GET_BAD_PROC_SUCCESS:
      return {
        ...state,
        procItems: action.payload,
      };
    case GET_BAD_PROC_BY_NAME_SUCCESS:
      return {
        ...state,
        badItems: action.payload,
      };
    case GET_BAD_PROC_FAILED:
      return {
        ...state,
        procItems: [],
      };
    case GET_BAD_PROC_BY_NAME_FAILED:
      return {
        ...state,
        badItems: [],
      };

    default:
      return state;
  }
}
