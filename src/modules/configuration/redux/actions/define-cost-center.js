export const SEARCH_COST_CENTER_START = 'CONFIGURATION_SEARCH_COST_CENTER_START'
export const SEARCH_COST_CENTER_SUCCESS =
  'CONFIGURATION_SEARCH_COST_CENTER_SUCCESS'
export const SEARCH_COST_CENTER_FAILED =
  'CONFIGURATION_SEARCH_COST_CENTER_FAILED'

export const GET_COST_CENTER_DETAILS_START =
  'CONFIGURATION_GET_COST_CENTER_DETAILS_START'
export const GET_COST_CENTER_DETAILS_SUCCESS =
  'CONFIGURATION_GET_COST_CENTER_DETAILS_SUCCESS'
export const GET_COST_CENTER_DETAILS_FAILED =
  'CONFIGURATION_GET_COST_CENTER_DETAILS_FAILED'

export const CREATE_COST_CENTER_START = 'CONFIGURATION_CREATE_COST_CENTER_START'
export const CREATE_COST_CENTER_SUCCESS =
  'CONFIGURATION_CREATE_COST_CENTER_SUCCESS'
export const CREATE_COST_CENTER_FAILED =
  'CONFIGURATION_CREATE_COST_CENTER_FAILED'

export const UPDATE_COST_CENTER_START = 'CONFIGURATION_UPDATE_COST_CENTER_START'
export const UPDATE_COST_CENTER_SUCCESS =
  'CONFIGURATION_UPDATE_COST_CENTER_SUCCESS'
export const UPDATE_COST_CENTER_FAILED =
  'CONFIGURATION_UPDATE_COST_CENTER_FAILED'

export const CHANGE_STATUS_COST_CENTER_START =
  'CONFIGURATION_CHANGE_STATUS_COST_CENTER_START'
export const CHANGE_STATUS_COST_CENTER_SUCCESS =
  'CONFIGURATION_CHANGE_STATUS_COST_CENTER_SUCCESS'
export const CHANGE_STATUS_COST_CENTER_FAILED =
  'CONFIGURATION_CHANGE_STATUS_COST_CENTER_FAILED'

export const DELETE_COST_CENTER_START = 'CONFIGURATION_DELETE_COST_CENTER_START'
export const DELETE_COST_CENTER_SUCCESS =
  'CONFIGURATION_DELETE_COST_CENTER_SUCCESS'
export const DELETE_COST_CENTER_FAILED =
  'CONFIGURATION_DELETE_COST_CENTER_FAILED'

export const APPROVE_COST_CENTER_START =
  'CONFIGURATION_APPROVE_COST_CENTER_START'
export const APPROVE_COST_CENTER_SUCCESS =
  'CONFIGURATION_APPROVE_COST_CENTER_SUCCESS'
export const APPROVE_COST_CENTER_FAILED =
  'CONFIGURATION_APPROVE_COST_CENTER_FAILED'

export const RESET_COST_CENTER_DETAILS_STATE =
  'CONFIGURATION_RESET_COST_CENTER_DETAILS_STATE'

export function searchCostCenters(payload, onSuccess, onError) {
  return {
    type: SEARCH_COST_CENTER_START,
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
export function searchCostCentersSuccess(payload) {
  return {
    type: SEARCH_COST_CENTER_SUCCESS,
    payload: payload,
  }
}

/**
 * Search warehouse failed action
 * @returns {object}
 */
export function searchCostCentersFailed() {
  return {
    type: SEARCH_COST_CENTER_FAILED,
  }
}

export function getCostCenterDetailsById(warehouseId, onSuccess, onError) {
  return {
    type: GET_COST_CENTER_DETAILS_START,
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
export function getCostCenterDetailsByIdSuccess(payload) {
  return {
    type: GET_COST_CENTER_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get warehouse details by id failed action
 * @returns {object}
 */
export function getCostCenterDetailsByIdFailed() {
  return {
    type: GET_COST_CENTER_DETAILS_FAILED,
  }
}

export function createCostCenter(payload, onSuccess, onError) {
  return {
    type: CREATE_COST_CENTER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function createCostCenterSuccess(payload) {
  return {
    type: CREATE_COST_CENTER_SUCCESS,
    payload: payload,
  }
}

export function createCostCenterFailed() {
  return {
    type: CREATE_COST_CENTER_FAILED,
  }
}

export function updateCostCenter(payload, onSuccess, onError) {
  return {
    type: UPDATE_COST_CENTER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function updateCostCenterSuccess(payload) {
  return {
    type: UPDATE_COST_CENTER_SUCCESS,
    payload: payload,
  }
}

export function updateCostCenterFailed() {
  return {
    type: UPDATE_COST_CENTER_FAILED,
  }
}

export function changeStatusCostCenter(payload, onSuccess, onError) {
  return {
    type: CHANGE_STATUS_COST_CENTER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function changeStatusCostCenterSuccess(payload) {
  return {
    type: CHANGE_STATUS_COST_CENTER_SUCCESS,
    payload: payload,
  }
}

export function changeStatusCostCenterFailed() {
  return {
    type: CHANGE_STATUS_COST_CENTER_FAILED,
  }
}

export function deleteCostCenter(payload, onSuccess, onError) {
  return {
    type: DELETE_COST_CENTER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function deleteCostCenterSuccess(payload) {
  return {
    type: DELETE_COST_CENTER_SUCCESS,
    payload: payload,
  }
}

export function deleteCostCenterFailed() {
  return {
    type: DELETE_COST_CENTER_FAILED,
  }
}

export function approveCostCenter(payload, onSuccess, onError) {
  return {
    type: APPROVE_COST_CENTER_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

export function approveCostCenterSuccess(payload) {
  return {
    type: APPROVE_COST_CENTER_SUCCESS,
    payload: payload,
  }
}

export function approveCostCenterFailed() {
  return {
    type: APPROVE_COST_CENTER_FAILED,
  }
}

export function resetCostCenterDetailsState() {
  return {
    type: RESET_COST_CENTER_DETAILS_STATE,
  }
}

export default {
  searchCostCenters,
  searchCostCentersSuccess,
  searchCostCentersFailed,
  getCostCenterDetailsById,
  getCostCenterDetailsByIdFailed,
  getCostCenterDetailsByIdSuccess,
  createCostCenter,
  createCostCenterSuccess,
  createCostCenterFailed,
  updateCostCenter,
  updateCostCenterSuccess,
  updateCostCenterFailed,
  changeStatusCostCenter,
  changeStatusCostCenterSuccess,
  changeStatusCostCenterFailed,
  deleteCostCenter,
  deleteCostCenterSuccess,
  deleteCostCenterFailed,
  approveCostCenter,
  approveCostCenterSuccess,
  approveCostCenterFailed,
  resetCostCenterDetailsState,
}
