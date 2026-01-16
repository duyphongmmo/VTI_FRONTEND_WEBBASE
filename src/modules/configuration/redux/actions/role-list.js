export const SEARCH_ROLE_LIST_START = 'CONFIGURATION_SEARCH_ROLE_LIST_START'
export const SEARCH_ROLE_LIST_SUCCESS = 'CONFIGURATION_SEARCH_ROLE_LIST_SUCCESS'
export const SEARCH_ROLE_LIST_FAILED = 'CONFIGURATION_SEARCH_ROLE_LIST_FAILED'

export const CREATE_ROLE_ASSIGN_START = 'CONFIGURATION_CREATE_ROLE_ASSIGN_START'
export const CREATE_ROLE_ASSIGN_SUCCESS =
  'CONFIGURATION_CREATE_ROLE_ASSIGN_SUCCESS'
export const CREATE_ROLE_ASSIGN_FAILED =
  'CONFIGURATION_CREATE_ROLE_ASSIGN_FAILED'

export const DELETE_ROLE_ASSIGN_START = 'CONFIGURATION_DELETE_ROLE_ASSIGN_START'
export const DELETE_ROLE_ASSIGN_SUCCESS =
  'CONFIGURATION_DELETE_ROLE_ASSIGN_SUCCESS'
export const DELETE_ROLE_ASSIGN_FAILED =
  'CONFIGURATION_DELETE_ROLE_ASSIGN_FAILED'

export const CONFIRM_ROLE_ASSIGN_START =
  'CONFIGURATION_CONFIRM_ROLE_ASSIGN_START'
export const CONFIRM_ROLE_ASSIGN_SUCCESS =
  'CONFIGURATION_CONFIRM_ROLE_ASSIGN_SUCCESS'
export const CONFIRM_ROLE_ASSIGN_FAILED =
  'CONFIGURATION_CONFIRM_ROLE_ASSIGN_FAILED'

export const REJECT_ROLE_ASSIGN_START = 'CONFIGURATION_REJECT_ROLE_ASSIGN_START'
export const REJECT_ROLE_ASSIGN_SUCCESS =
  'CONFIGURATION_REJECT_ROLE_ASSIGN_SUCCESS'
export const REJECT_ROLE_ASSIGN_FAILED =
  'CONFIGURATION_REJECT_ROLE_ASSIGN_FAILED'

export const UPDATE_ROLE_ASSIGN_START = 'CONFIGURATION_UPDATE_ROLE_ASSIGN_START'
export const UPDATE_ROLE_ASSIGN_SUCCESS =
  'CONFIGURATION_UPDATE_ROLE_ASSIGN_SUCCESS'
export const UPDATE_ROLE_ASSIGN_FAILED =
  'CONFIGURATION_UPDATE_ROLE_ASSIGN_FAILED'

export const GET_ROLE_ASSIGN_DETAILS_START =
  'CONFIGURATION_GET_ROLE_ASSIGN_DETAILS_START'
export const GET_ROLE_ASSIGN_DETAILS_SUCCESS =
  'CONFIGURATION_GET_ROLE_ASSIGN_DETAILS_SUCCESS'
export const GET_ROLE_ASSIGN_DETAILS_FAILED =
  'CONFIGURATION_GET_ROLE_ASSIGN_DETAILS_FAILED'

export const RESET_ROLE_ASSIGN_DETAILS_STATE =
  'CONFIGURATION_RESET_ROLE_ASSIGN_DETAILS_STATE'

export function searchRoleList(payload, onSuccess, onError) {
  return {
    type: SEARCH_ROLE_LIST_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function searchRoleListSuccess(payload) {
  return {
    type: SEARCH_ROLE_LIST_SUCCESS,
    payload: payload,
  }
}

export function searchRoleListFailed() {
  return {
    type: SEARCH_ROLE_LIST_FAILED,
  }
}

export function updateRoleAssign(payload, onSuccess, onError) {
  return {
    type: UPDATE_ROLE_ASSIGN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateRoleAssignSuccess(payload) {
  return {
    type: UPDATE_ROLE_ASSIGN_SUCCESS,
    payload: payload,
  }
}

export function updateRoleAssignFailed() {
  return {
    type: UPDATE_ROLE_ASSIGN_FAILED,
  }
}

export function getRoleAssignDetails(payload, onSuccess, onError) {
  return {
    type: GET_ROLE_ASSIGN_DETAILS_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function getRoleAssignDetailsSuccess(payload) {
  return {
    type: GET_ROLE_ASSIGN_DETAILS_SUCCESS,
    payload: payload,
  }
}

export function getRoleAssignDetailsFailed() {
  return {
    type: GET_ROLE_ASSIGN_DETAILS_FAILED,
  }
}

export function resetRoleAssignDetailsState() {
  return {
    type: RESET_ROLE_ASSIGN_DETAILS_STATE,
  }
}

export function createRoleAssign(payload, onSuccess, onError) {
  return {
    type: CREATE_ROLE_ASSIGN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createRoleAssignSuccess(payload) {
  return {
    type: CREATE_ROLE_ASSIGN_SUCCESS,
    payload: payload,
  }
}

export function createRoleAssignFailed() {
  return {
    type: CREATE_ROLE_ASSIGN_FAILED,
  }
}

export function deleteRoleAssign(payload, onSuccess, onError) {
  return {
    type: DELETE_ROLE_ASSIGN_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteRoleAssignSuccess(payload) {
  return {
    type: DELETE_ROLE_ASSIGN_SUCCESS,
    payload: payload,
  }
}

export function deleteRoleAssignFailed() {
  return {
    type: DELETE_ROLE_ASSIGN_FAILED,
  }
}

export function confirmRoleAssignById(id, onSuccess, onError) {
  return {
    type: CONFIRM_ROLE_ASSIGN_START,
    payload: id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function confirmRoleAssignByIdSuccess(payload) {
  return {
    type: CONFIRM_ROLE_ASSIGN_SUCCESS,
    payload: payload,
  }
}

export function confirmRoleAssignByIdFailed() {
  return {
    type: CONFIRM_ROLE_ASSIGN_FAILED,
  }
}

export function rejectRoleAssignById(id, onSuccess, onError) {
  return {
    type: REJECT_ROLE_ASSIGN_START,
    payload: id,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function rejectRoleAssignByIdSuccess(payload) {
  return {
    type: REJECT_ROLE_ASSIGN_SUCCESS,
    payload: payload,
  }
}

export function rejectRoleAssignByIdFailed() {
  return {
    type: REJECT_ROLE_ASSIGN_FAILED,
  }
}

export default {
  searchRoleList,
  searchRoleListSuccess,
  searchRoleListFailed,
  updateRoleAssign,
  updateRoleAssignSuccess,
  updateRoleAssignFailed,
  getRoleAssignDetails,
  getRoleAssignDetailsSuccess,
  getRoleAssignDetailsFailed,
  resetRoleAssignDetailsState,
  createRoleAssign,
  createRoleAssignSuccess,
  createRoleAssignFailed,
  deleteRoleAssign,
  deleteRoleAssignSuccess,
  deleteRoleAssignFailed,
  confirmRoleAssignById,
  confirmRoleAssignByIdSuccess,
  confirmRoleAssignByIdFailed,
  rejectRoleAssignById,
  rejectRoleAssignByIdFailed,
  rejectRoleAssignByIdSuccess,
}
