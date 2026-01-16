export const SEARCH_DEPARTMENT_LIST_START =
  'CONFIGURATION_SEARCH_DEPARTMENT_LIST_START'
export const SEARCH_DEPARTMENT_LIST_SUCCESS =
  'CONFIGURATION_SEARCH_DEPARTMENT_LIST_SUCCESS'
export const SEARCH_DEPARTMENT_LIST_FAILED =
  'CONFIGURATION_SEARCH_DEPARTMENT_LIST_FAILED'

export const CREATE_DEPARTMENT_START = 'CONFIGURATION_CREATE_DEPARTMENT_START'
export const CREATE_DEPARTMENT_SUCCESS =
  'CONFIGURATION_CREATE_DEPARTMENT_SUCCESS'
export const CREATE_DEPARTMENT_FAILED = 'CONFIGURATION_CREATE_DEPARTMENT_FAILED'

export const UPDATE_DEPARTMENT_START = 'CONFIGURATION_UPDATE_DEPARTMENT_START'
export const UPDATE_DEPARTMENT_SUCCESS =
  'CONFIGURATION_UPDATE_DEPARTMENT_SUCCESS'
export const UPDATE_DEPARTMENT_FAILED = 'CONFIGURATION_UPDATE_DEPARTMENT_FAILED'

export const GET_DEPARTMENT_DETAILS_START =
  'CONFIGURATION_GET_DEPARTMENT_DETAILS_START'
export const GET_DEPARTMENT_DETAILS_SUCCESS =
  'CONFIGURATION_GET_DEPARTMENT_DETAILS_SUCCESS'
export const GET_DEPARTMENT_DETAILS_FAILED =
  'CONFIGURATION_GET_DEPARTMENT_DETAILS_FAILED'

export const ACTIVE_DEPARTMENT_START = 'CONFIGURATION_ACTIVE_DEPARTMENT_START'
export const ACTIVE_DEPARTMENT_SUCCESS =
  'CONFIGURATION_ACTIVE_DEPARTMENT_SUCCESS'
export const ACTIVE_DEPARTMENT_FAILED = 'CONFIGURATION_ACTIVE_DEPARTMENT_FAILED'

export const DEACTIVE_DEPARTMENT_START =
  'CONFIGURATION_DEACTIVE_DEPARTMENT_START'
export const DEACTIVE_DEPARTMENT_SUCCESS =
  'CONFIGURATION_DEACTIVE_DEPARTMENT_SUCCESS'
export const DEACTIVE_DEPARTMENT_FAILED =
  'CONFIGURATION_DEACTIVE_DEPARTMENT_FAILED'

export const UPDATE_DEPARTMENT_ASSIGN_START =
  'CONFIGURATION_UPDATE_DEPARTMENT_ASSIGN_START'
export const UPDATE_DEPARTMENT_ASSIGN_SUCCESS =
  'CONFIGURATION_UPDATE_DEPARTMENT_ASSIGN_SUCCESS'
export const UPDATE_DEPARTMENT_ASSIGN_FAILED =
  'CONFIGURATION_UPDATE_DEPARTMENT_ASSIGN_FAILED'

export const GET_DEPARTMENT_ASSIGN_DETAILS_START =
  'CONFIGURATION_GET_DEPARTMENT_ASSIGN_DETAILS_START'
export const GET_DEPARTMENT_ASSIGN_DETAILS_SUCCESS =
  'CONFIGURATION_GET_DEPARTMENT_ASSIGN_DETAILS_SUCCESS'
export const GET_DEPARTMENT_ASSIGN_DETAILS_FAILED =
  'CONFIGURATION_GET_DEPARTMENT_ASSIGN_DETAILS_FAILED'

export const RESET_DEPARTMENT_ASSIGN_DETAILS_STATE =
  'CONFIGURATION_RESET_DEPARTMENT_ASSIGN_DETAILS_STATE'

export const RESET_DEPARTMENT_DETAILS_STATE =
  'CONFIGURATION_RESET_DEPARTMENT_DETAILS_STATE'

export function searchDepartmentList(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEPARTMENT_LIST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchDepartmentListSuccess(payload) {
  return {
    type: SEARCH_DEPARTMENT_LIST_SUCCESS,
    payload: payload,
  }
}

export function searchDepartmentListFailed() {
  return {
    type: SEARCH_DEPARTMENT_LIST_FAILED,
  }
}

export function createDepartment(payload, onSuccess, onError) {
  return {
    type: CREATE_DEPARTMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createDepartmentSuccess(payload) {
  return {
    type: CREATE_DEPARTMENT_SUCCESS,
    payload: payload,
  }
}

export function createDepartmentFailed() {
  return {
    type: CREATE_DEPARTMENT_FAILED,
  }
}

export function updateDepartment(payload, onSuccess, onError) {
  return {
    type: UPDATE_DEPARTMENT_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateDepartmentSuccess(payload) {
  return {
    type: UPDATE_DEPARTMENT_SUCCESS,
    payload: payload,
  }
}

export function updateDepartmentFailed() {
  return {
    type: UPDATE_DEPARTMENT_FAILED,
  }
}

export function getDepartmentDetailsById(routingId, onSuccess, onError) {
  return {
    type: GET_DEPARTMENT_DETAILS_START,
    payload: routingId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDepartmentDetailsByIdSuccess(payload) {
  return {
    type: GET_DEPARTMENT_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getDepartmentDetailsByIdFailed() {
  return {
    type: GET_DEPARTMENT_DETAILS_FAILED,
  }
}

export function activeDepartmentById(Id, onSuccess, onError) {
  return {
    type: ACTIVE_DEPARTMENT_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function activeDepartmentByIdSuccess(payload) {
  return {
    type: ACTIVE_DEPARTMENT_SUCCESS,
    payload: payload,
  }
}

export function activeDepartmentByIdFailed() {
  return {
    type: ACTIVE_DEPARTMENT_FAILED,
  }
}

export function deactiveDepartmentById(Id, onSuccess, onError) {
  return {
    type: DEACTIVE_DEPARTMENT_START,
    payload: Id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deactiveDepartmentByIdSuccess(payload) {
  return {
    type: DEACTIVE_DEPARTMENT_SUCCESS,
    payload: payload,
  }
}

export function deactiveDepartmentByIdFailed() {
  return {
    type: DEACTIVE_DEPARTMENT_FAILED,
  }
}

export function updateDepartmentAssign(payload, onSuccess, onError) {
  return {
    type: UPDATE_DEPARTMENT_ASSIGN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateDepartmentAssignSuccess(payload) {
  return {
    type: UPDATE_DEPARTMENT_ASSIGN_SUCCESS,
    payload: payload,
  }
}

export function updateDepartmentAssignFailed() {
  return {
    type: UPDATE_DEPARTMENT_ASSIGN_FAILED,
  }
}

export function getDepartmentAssignDetails(payload, onSuccess, onError) {
  return {
    type: GET_DEPARTMENT_ASSIGN_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getDepartmentAssignDetailsSuccess(payload) {
  return {
    type: GET_DEPARTMENT_ASSIGN_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getDepartmentAssignDetailsFailed() {
  return {
    type: GET_DEPARTMENT_ASSIGN_DETAILS_FAILED,
  }
}

export function resetDepartmentAssignDetailsState() {
  return {
    type: RESET_DEPARTMENT_ASSIGN_DETAILS_STATE,
  }
}

export function resetDepartmentDetailsState() {
  return {
    type: RESET_DEPARTMENT_DETAILS_STATE,
  }
}

export default {
  searchDepartmentList,
  searchDepartmentListSuccess,
  searchDepartmentListFailed,
  updateDepartmentAssign,
  updateDepartmentAssignSuccess,
  updateDepartmentAssignFailed,
  getDepartmentAssignDetails,
  getDepartmentAssignDetailsSuccess,
  getDepartmentAssignDetailsFailed,
  resetDepartmentAssignDetailsState,
  createDepartment,
  createDepartmentSuccess,
  createDepartmentFailed,
  updateDepartment,
  updateDepartmentSuccess,
  updateDepartmentFailed,
  getDepartmentDetailsById,
  getDepartmentDetailsByIdSuccess,
  getDepartmentDetailsByIdFailed,
  activeDepartmentById,
  activeDepartmentByIdSuccess,
  activeDepartmentByIdFailed,
  deactiveDepartmentById,
  deactiveDepartmentByIdSuccess,
  deactiveDepartmentByIdFailed,
  resetDepartmentDetailsState,
}
