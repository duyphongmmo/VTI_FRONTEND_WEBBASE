export const SEARCH_DEFINE_SECTION_START =
  'DATABASE_SEARCH_DEFINE_SECTION_START'
export const SEARCH_DEFINE_SECTION_SUCCESS =
  'DATABASE_SEARCH_DEFINE_SECTION_SUCCESS'
export const SEARCH_DEFINE_SECTION_FAILED =
  'DATABASE_SEARCH_DEFINE_SECTION_FAILED'

export const CREATE_DEFINE_SECTION_START =
  'DATABASE_CREATE_DEFINE_SECTION_START'
export const CREATE_DEFINE_SECTION_SUCCESS =
  'DATABASE_CREATE_DEFINE_SECTION_SUCCESS'
export const CREATE_DEFINE_SECTION_FAILED =
  'DATABASE_CREATE_DEFINE_SECTION_FAILED'

export const UPDATE_DEFINE_SECTION_START =
  'DATABASE_UPDATE_DEFINE_SECTION_START'
export const UPDATE_DEFINE_SECTION_SUCCESS =
  'DATABASE_UPDATE_DEFINE_SECTION_SUCCESS'
export const UPDATE_DEFINE_SECTION_FAILED =
  'DATABASE_UPDATE_DEFINE_SECTION_FAILED'

export const GET_DETAIL_DEFINE_SECTION_START =
  'DATABASE_GET_DETAIL_DEFINE_SECTION_START'
export const GET_DETAIL_DEFINE_SECTION_SUCCESS =
  'DATABASE_GET_DETAIL_DEFINE_SECTION_SUCCESS'
export const GET_DETAIL_DEFINE_SECTION_FAILED =
  'DATABASE_GET_DETAIL_DEFINE_SECTION_FAILED'

export const CHANGE_STATUS_DEFINE_SECTION_START =
  'DATABASE_CHANGE_STATUS_DEFINE_SECTION_START'
export const CHANGE_STATUS_DEFINE_SECTION_SUCCESS =
  'DATABASE_CHANGE_STATUS_DEFINE_SECTION_SUCCESS'
export const CHANGE_STATUS_DEFINE_SECTION_FAILED =
  'DATABASE_CHANGE_STATUS_DEFINE_SECTION_FAILED'

export const DELETE_DEFINE_SECTION_START =
  'DATABASE_DELETE_DEFINE_SECTION_START'
export const DELETE_DEFINE_SECTION_SUCCESS =
  'DATABASE_DELETE_DEFINE_SECTION_SUCCESS'
export const DELETE_DEFINE_SECTION_FAILED =
  'DATABASE_DELETE_DEFINE_SECTION_FAILED'

export const APPROVE_DEFINE_SECTION_START =
  'DATABASE_APPROVE_DEFINE_SECTION_START'
export const APPROVE_DEFINE_SECTION_SUCCESS =
  'DATABASE_APPROVE_DEFINE_SECTION_SUCCESS'
export const APPROVE_DEFINE_SECTION_FAILED =
  'DATABASE_APPROVE_DEFINE_SECTION_FAILED'

export const RESET_DEFINE_SECTION_DETAIL_STATE =
  'DATABASE_RESET_DEFINE_SECTION_DETAIL_STATE'

export function getDefineSectionDetailById(payload, onSuccess, onError) {
  return {
    type: GET_DETAIL_DEFINE_SECTION_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function getDefineSectionDetailByIdSuccess(payload) {
  return {
    type: GET_DETAIL_DEFINE_SECTION_SUCCESS,
    payload: payload,
  }
}

export function getDefineSectionDetailByIdFailed() {
  return {
    type: GET_DETAIL_DEFINE_SECTION_FAILED,
  }
}

export function searchDefineSection(payload, onSuccess, onError) {
  return {
    type: SEARCH_DEFINE_SECTION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function searchDefineSectionSuccess(payload) {
  return {
    type: SEARCH_DEFINE_SECTION_SUCCESS,
    payload: payload,
  }
}

export function searchDefineSectionFailed() {
  return {
    type: SEARCH_DEFINE_SECTION_FAILED,
  }
}

export function createDefineSection(payload, onSuccess, onError) {
  return {
    type: CREATE_DEFINE_SECTION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createDefineSectionSuccess(payload) {
  return {
    type: CREATE_DEFINE_SECTION_SUCCESS,
    payload: payload,
  }
}

export function createDefineSectionFailed() {
  return {
    type: CREATE_DEFINE_SECTION_FAILED,
  }
}

export function updateDefineSection(payload, onSuccess, onError) {
  return {
    type: UPDATE_DEFINE_SECTION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateDefineSectionSuccess(payload) {
  return {
    type: UPDATE_DEFINE_SECTION_SUCCESS,
    payload: payload,
  }
}

export function updateDefineSectionFailed() {
  return {
    type: UPDATE_DEFINE_SECTION_FAILED,
  }
}

export function changeStatusDefineSection(payload, onSuccess, onError) {
  return {
    type: CHANGE_STATUS_DEFINE_SECTION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function changeStatusDefineSectionSuccess(payload) {
  return {
    type: CHANGE_STATUS_DEFINE_SECTION_SUCCESS,
    payload: payload,
  }
}

export function changeStatusDefineSectionFailed() {
  return {
    type: CHANGE_STATUS_DEFINE_SECTION_FAILED,
  }
}

export function deleteDefineSection(payload, onSuccess, onError) {
  return {
    type: DELETE_DEFINE_SECTION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteDefineSectionSuccess(payload) {
  return {
    type: DELETE_DEFINE_SECTION_SUCCESS,
    payload: payload,
  }
}

export function deleteDefineSectionFailed() {
  return {
    type: DELETE_DEFINE_SECTION_FAILED,
  }
}

export function approveDefineSection(payload, onSuccess, onError) {
  return {
    type: APPROVE_DEFINE_SECTION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function approveDefineSectionSuccess(payload) {
  return {
    type: APPROVE_DEFINE_SECTION_SUCCESS,
    payload: payload,
  }
}

export function approveDefineSectionFailed() {
  return {
    type: APPROVE_DEFINE_SECTION_FAILED,
  }
}

export function resetDefineSectionDetailState() {
  return {
    type: RESET_DEFINE_SECTION_DETAIL_STATE,
  }
}

export default {
  getDefineSectionDetailById,
  getDefineSectionDetailByIdSuccess,
  getDefineSectionDetailByIdFailed,
  searchDefineSection,
  searchDefineSectionSuccess,
  searchDefineSectionFailed,
  createDefineSection,
  createDefineSectionSuccess,
  createDefineSectionFailed,
  updateDefineSection,
  updateDefineSectionSuccess,
  updateDefineSectionFailed,
  changeStatusDefineSection,
  changeStatusDefineSectionSuccess,
  changeStatusDefineSectionFailed,
  deleteDefineSection,
  deleteDefineSectionSuccess,
  deleteDefineSectionFailed,
  approveDefineSection,
  approveDefineSectionSuccess,
  approveDefineSectionFailed,
  resetDefineSectionDetailState,
}
