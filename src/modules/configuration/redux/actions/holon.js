export const SEARCH_HOLON_START = 'CONFIGURATION_SEARCH_HOLON_START'
export const SEARCH_HOLON_SUCCESS = 'CONFIGURATION_SEARCH_HOLON_SUCCESS'
export const SEARCH_HOLON_FAILED = 'CONFIGURATION_SEARCH_HOLON_FAILED'

export const GET_HOLON_DETAILS_START = 'CONFIGURATION_GET_HOLON_DETAILS_START'
export const GET_HOLON_DETAILS_SUCCESS =
  'CONFIGURATION_GET_HOLON_DETAILS_SUCCESS'
export const GET_HOLON_DETAILS_FAILED = 'CONFIGURATION_GET_HOLON_DETAILS_FAILED'

export const CREATE_HOLON_START = 'CONFIGURATION_CREATE_HOLON_START'
export const CREATE_HOLON_SUCCESS = 'CONFIGURATION_CREATE_HOLON_SUCCESS'
export const CREATE_HOLON_FAILED = 'CONFIGURATION_CREATE_HOLON_FAILED'

export const UPDATE_HOLON_START = 'CONFIGURATION_UPDATE_HOLON_START'
export const UPDATE_HOLON_SUCCESS = 'CONFIGURATION_UPDATE_HOLON_SUCCESS'
export const UPDATE_HOLON_FAILED = 'CONFIGURATION_UPDATE_HOLON_FAILED'

export const CHANGE_STATUS_HOLON_START =
  'CONFIGURATION_CHANGE_STATUS_HOLON_START'
export const CHANGE_STATUS_HOLON_SUCCESS =
  'CONFIGURATION_CHANGE_STATUS_HOLON_SUCCESS'
export const CHANGE_STATUS_HOLON_FAILED =
  'CONFIGURATION_CHANGE_STATUS_HOLON_FAILED'

export const DELETE_HOLON_START = 'CONFIGURATION_DELETE_HOLON_START'
export const DELETE_HOLON_SUCCESS = 'CONFIGURATION_DELETE_HOLON_SUCCESS'
export const DELETE_HOLON_FAILED = 'CONFIGURATION_DELETE_HOLON_FAILED'

export const APPROVE_HOLON_START = 'CONFIGURATION_APPROVE_HOLON_START'
export const APPROVE_HOLON_SUCCESS = 'CONFIGURATION_APPROVE_HOLON_SUCCESS'
export const APPROVE_HOLON_FAILED = 'CONFIGURATION_APPROVE_HOLON_FAILED'

export const RESET_HOLON_DETAILS_STATE =
  'CONFIGURATION_RESET_HOLON_DETAILS_STATE'

export function searchHolons(payload, onSuccess, onError) {
  return {
    type: SEARCH_HOLON_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search warehouse success action
 * @param {*} payload
 * @returns {object}
 */
export function searchHolonsSuccess(payload) {
  return {
    type: SEARCH_HOLON_SUCCESS,
    payload: payload,
  }
}

/**
 * Search warehouse failed action
 * @returns {object}
 */
export function searchHolonsFailed() {
  return {
    type: SEARCH_HOLON_FAILED,
  }
}

export function getHolonDetailsById(warehouseId, onSuccess, onError) {
  return {
    type: GET_HOLON_DETAILS_START,
    payload: warehouseId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get warehouse details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getHolonDetailsByIdSuccess(payload) {
  return {
    type: GET_HOLON_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouse details by id failed action
 * @returns {object}
 */
export function getHolonDetailsByIdFailed() {
  return {
    type: GET_HOLON_DETAILS_FAILED,
  }
}

export function createHolon(payload, onSuccess, onError) {
  return {
    type: CREATE_HOLON_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createHolonSuccess(payload) {
  return {
    type: CREATE_HOLON_SUCCESS,
    payload: payload,
  }
}

export function createHolonFailed() {
  return {
    type: CREATE_HOLON_FAILED,
  }
}

export function updateHolon(payload, onSuccess, onError) {
  return {
    type: UPDATE_HOLON_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateHolonSuccess(payload) {
  return {
    type: UPDATE_HOLON_SUCCESS,
    payload: payload,
  }
}

export function updateHolonFailed() {
  return {
    type: UPDATE_HOLON_FAILED,
  }
}

export function changeStatusHolon(payload, onSuccess, onError) {
  return {
    type: CHANGE_STATUS_HOLON_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function changeStatusHolonSuccess(payload) {
  return {
    type: CHANGE_STATUS_HOLON_SUCCESS,
    payload: payload,
  }
}

export function changeStatusHolonFailed() {
  return {
    type: CHANGE_STATUS_HOLON_FAILED,
  }
}

export function deleteHolon(payload, onSuccess, onError) {
  return {
    type: DELETE_HOLON_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteHolonSuccess(payload) {
  return {
    type: DELETE_HOLON_SUCCESS,
    payload: payload,
  }
}

export function deleteHolonFailed() {
  return {
    type: DELETE_HOLON_FAILED,
  }
}

export function approveHolon(payload, onSuccess, onError) {
  return {
    type: APPROVE_HOLON_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function approveHolonSuccess(payload) {
  return {
    type: APPROVE_HOLON_SUCCESS,
    payload: payload,
  }
}

export function approveHolonFailed() {
  return {
    type: APPROVE_HOLON_FAILED,
  }
}

export function resetHolonDetailsState() {
  return {
    type: RESET_HOLON_DETAILS_STATE,
  }
}

export default {
  searchHolons,
  searchHolonsSuccess,
  searchHolonsFailed,
  getHolonDetailsById,
  getHolonDetailsByIdFailed,
  getHolonDetailsByIdSuccess,
  createHolon,
  createHolonSuccess,
  createHolonFailed,
  updateHolon,
  updateHolonSuccess,
  updateHolonFailed,
  changeStatusHolon,
  changeStatusHolonSuccess,
  changeStatusHolonFailed,
  deleteHolon,
  deleteHolonSuccess,
  deleteHolonFailed,
  approveHolon,
  approveHolonSuccess,
  approveHolonFailed,
  resetHolonDetailsState,
}
