export const SEARCH_DEFINE_DIVISION_START =
  'DATABASE_SEARCH_DEFINE_DIVISION_START'
export const SEARCH_DEFINE_DIVISION_SUCCESS =
  'DATABASE_SEARCH_DEFINE_DIVISION_SUCCESS'
export const SEARCH_DEFINE_DIVISION_FAILED =
  'DATABASE_SEARCH_DEFINE_DIVISION_FAILED'

export const CREATE_DEFINE_DIVISION_START =
  'DATABASE_CREATE_DEFINE_DIVISION_START'
export const CREATE_DEFINE_DIVISION_SUCCESS =
  'DATABASE_CREATE_DEFINE_DIVISION_SUCCESS'
export const CREATE_DEFINE_DIVISION_FAILED =
  'DATABASE_CREATE_DEFINE_DIVISION_FAILED'

export const UPDATE_DEFINE_DIVISION_START =
  'DATABASE_UPDATE_DEFINE_DIVISION_START'
export const UPDATE_DEFINE_DIVISION_SUCCESS =
  'DATABASE_UPDATE_DEFINE_DIVISION_SUCCESS'
export const UPDATE_DEFINE_DIVISION_FAILED =
  'DATABASE_UPDATE_DEFINE_DIVISION_FAILED'

export const GET_DETAIL_DEFINE_DIVISION_START =
  'DATABASE_GET_DETAIL_DEFINE_DIVISION_START'
export const GET_DETAIL_DEFINE_DIVISION_SUCCESS =
  'DATABASE_GET_DETAIL_DEFINE_DIVISION_SUCCESS'
export const GET_DETAIL_DEFINE_DIVISION_FAILED =
  'DATABASE_GET_DETAIL_DEFINE_DIVISION_FAILED'

export const CHANGE_STATUS_DEFINE_DIVISION_START =
  'DATABASE_CHANGE_STATUS_DEFINE_DIVISION_START'
export const CHANGE_STATUS_DEFINE_DIVISION_SUCCESS =
  'DATABASE_CHANGE_STATUS_DEFINE_DIVISION_SUCCESS'
export const CHANGE_STATUS_DEFINE_DIVISION_FAILED =
  'DATABASE_CHANGE_STATUS_DEFINE_DIVISION_FAILED'

export const DELETE_DEFINE_DIVISION_START =
  'DATABASE_DELETE_DEFINE_DIVISION_START'
export const DELETE_DEFINE_DIVISION_SUCCESS =
  'DATABASE_DELETE_DEFINE_DIVISION_SUCCESS'
export const DELETE_DEFINE_DIVISION_FAILED =
  'DATABASE_DELETE_DEFINE_DIVISION_FAILED'

export const APPROVE_DEFINE_DIVISION_START =
  'DATABASE_APPROVE_DEFINE_DIVISION_START'
export const APPROVE_DEFINE_DIVISION_SUCCESS =
  'DATABASE_APPROVE_DEFINE_DIVISION_SUCCESS'
export const APPROVE_DEFINE_DIVISION_FAILED =
  'DATABASE_APPROVE_DEFINE_DIVISION_FAILED'

export const RESET_DEFINE_DIVISION_DETAIL_STATE =
  'DATABASE_RESET_DEFINE_DIVISION_DETAIL_STATE'

export function getDefineDivisionDetailById(payload, onSuccess, onError) {
  return {
    type: GET_DETAIL_DEFINE_DIVISION_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDefineDivisionDetailByIdSuccess(payload) {
  return {
    type: GET_DETAIL_DEFINE_DIVISION_SUCCESS,
    payload: payload,
  }
}

export function getDefineDivisionDetailByIdFailed() {
  return {
    type: GET_DETAIL_DEFINE_DIVISION_FAILED,
  }
}

export function searchDefineDivision(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEFINE_DIVISION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchDefineDivisionSuccess(payload) {
  return {
    type: SEARCH_DEFINE_DIVISION_SUCCESS,
    payload: payload,
  }
}

export function searchDefineDivisionFailed() {
  return {
    type: SEARCH_DEFINE_DIVISION_FAILED,
  }
}

export function createDefineDivision(payload, onSuccess, onError) {
  return {
    type: CREATE_DEFINE_DIVISION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createDefineDivisionSuccess(payload) {
  return {
    type: CREATE_DEFINE_DIVISION_SUCCESS,
    payload: payload,
  }
}

export function createDefineDivisionFailed() {
  return {
    type: CREATE_DEFINE_DIVISION_FAILED,
  }
}

export function updateDefineDivision(payload, onSuccess, onError) {
  return {
    type: UPDATE_DEFINE_DIVISION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateDefineDivisionSuccess(payload) {
  return {
    type: UPDATE_DEFINE_DIVISION_SUCCESS,
    payload: payload,
  }
}

export function updateDefineDivisionFailed() {
  return {
    type: UPDATE_DEFINE_DIVISION_FAILED,
  }
}

export function changeStatusDefineDivision(payload, onSuccess, onError) {
  return {
    type: CHANGE_STATUS_DEFINE_DIVISION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function changeStatusDefineDivisionSuccess(payload) {
  return {
    type: CHANGE_STATUS_DEFINE_DIVISION_SUCCESS,
    payload: payload,
  }
}

export function changeStatusDefineDivisionFailed() {
  return {
    type: CHANGE_STATUS_DEFINE_DIVISION_FAILED,
  }
}

export function deleteDefineDivision(payload, onSuccess, onError) {
  return {
    type: DELETE_DEFINE_DIVISION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteDefineDivisionSuccess(payload) {
  return {
    type: DELETE_DEFINE_DIVISION_SUCCESS,
    payload: payload,
  }
}

export function deleteDefineDivisionFailed() {
  return {
    type: DELETE_DEFINE_DIVISION_FAILED,
  }
}

export function approveDefineDivision(payload, onSuccess, onError) {
  return {
    type: APPROVE_DEFINE_DIVISION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function approveDefineDivisionSuccess(payload) {
  return {
    type: APPROVE_DEFINE_DIVISION_SUCCESS,
    payload: payload,
  }
}

export function approveDefineDivisionFailed() {
  return {
    type: APPROVE_DEFINE_DIVISION_FAILED,
  }
}

export function resetDefineDivisionDetailState() {
  return {
    type: RESET_DEFINE_DIVISION_DETAIL_STATE,
  }
}

export default {
  getDefineDivisionDetailById,
  getDefineDivisionDetailByIdSuccess,
  getDefineDivisionDetailByIdFailed,
  searchDefineDivision,
  searchDefineDivisionSuccess,
  searchDefineDivisionFailed,
  createDefineDivision,
  createDefineDivisionSuccess,
  createDefineDivisionFailed,
  updateDefineDivision,
  updateDefineDivisionSuccess,
  updateDefineDivisionFailed,
  changeStatusDefineDivision,
  changeStatusDefineDivisionSuccess,
  changeStatusDefineDivisionFailed,
  deleteDefineDivision,
  deleteDefineDivisionSuccess,
  deleteDefineDivisionFailed,
  approveDefineDivision,
  approveDefineDivisionSuccess,
  approveDefineDivisionFailed,
  resetDefineDivisionDetailState,
}
