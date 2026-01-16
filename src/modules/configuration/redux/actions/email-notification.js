export const SEARCH_EMAIL_NOTIFICATION_START =
  'CONFIGURATION_EMAIL_NOTIFICATION_START'
export const SEARCH_EMAIL_NOTIFICATION_SUCCESS =
  'CONFIGURATION_EMAIL_NOTIFICATION_SUCCESS'
export const SEARCH_EMAIL_NOTIFICATION_FAILED =
  'CONFIGURATION_EMAIL_NOTIFICATION_FAILED'

export const CREATE_EMAIL_NOTIFICATION_START =
  'CONFIGURATION_CREATE_EMAIL_NOTIFICATION_START'
export const CREATE_EMAIL_NOTIFICATION_SUCCESS =
  'CONFIGURATION_CREATE_EMAIL_NOTIFICATION_SUCCESS'
export const CREATE_EMAIL_NOTIFICATION_FAILED =
  'CONFIGURATION_CREATE_EMAIL_NOTIFICATION_FAILED'

export const UPDATE_EMAIL_NOTIFICATION_START =
  'CONFIGURATION_UPDATE_EMAIL_NOTIFICATION_START'
export const UPDATE_EMAIL_NOTIFICATION_SUCCESS =
  'CONFIGURATION_UPDATE_EMAIL_NOTIFICATION_SUCCESS'
export const UPDATE_EMAIL_NOTIFICATION_FAILED =
  'CONFIGURATION_UPDATE_EMAIL_NOTIFICATION_FAILED'

export const DELETE_EMAIL_NOTIFICATION_START =
  'CONFIGURATION_DELETE_EMAIL_NOTIFICATION_START'
export const DELETE_EMAIL_NOTIFICATION_SUCCESS =
  'CONFIGURATION_DELETE_EMAIL_NOTIFICATION_SUCCESS'
export const DELETE_EMAIL_NOTIFICATION_FAILED =
  'CONFIGURATION_DELETE_EMAIL_NOTIFICATION_FAILED'

export const GET_EMAIL_NOTIFICATION_DETAILS_START =
  'CONFIGURATION_GET_EMAIL_NOTIFICATION_DETAILS_START'
export const GET_EMAIL_NOTIFICATION_DETAILS_SUCCESS =
  'CONFIGURATION_GET_EMAIL_NOTIFICATION_DETAILS_SUCCESS'
export const GET_EMAIL_NOTIFICATION_DETAILS_FAILED =
  'CONFIGURATION_GET_EMAIL_NOTIFICATION_DETAILS_FAILED'

export const RESET_EMAIL_NOTIFICATION_DETAIL_STATE =
  'CONFIGURATION_RESET_EMAIL_NOTIFICATION_DETAIL_STATE'

export function searchEmailNotification(payload, onSuccess, onError) {
  return {
    type: SEARCH_EMAIL_NOTIFICATION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Search EMAIL_NOTIFICATION success action
 * @param {*} payload
 * @returns {object}
 */
export function searchEmailNotificationSuccess(payload) {
  return {
    type: SEARCH_EMAIL_NOTIFICATION_SUCCESS,
    payload: payload,
  }
}

/**
 * Search EMAIL_NOTIFICATION failed action
 * @returns {object}
 */
export function searchEmailNotificationFailed() {
  return {
    type: SEARCH_EMAIL_NOTIFICATION_FAILED,
  }
}

/**
 * Create EMAIL_NOTIFICATION
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function createEmailNotification(payload, onSuccess, onError) {
  return {
    type: CREATE_EMAIL_NOTIFICATION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Create EMAIL_NOTIFICATION success action
 * @param {*} payload
 * @returns {object}
 */
export function createEmailNotificationSuccess(payload) {
  return {
    type: CREATE_EMAIL_NOTIFICATION_SUCCESS,
    payload: payload,
  }
}

/**
 * Create EMAIL_NOTIFICATION failed action
 * @returns {object}
 */
export function createEmailNotificationFailed() {
  return {
    type: CREATE_EMAIL_NOTIFICATION_FAILED,
  }
}

/**
 * Update EMAIL_NOTIFICATION
 * @param {object} payload
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function updateEmailNotification(payload, onSuccess, onError) {
  return {
    type: UPDATE_EMAIL_NOTIFICATION_START,
    payload: payload,
    onSuccess: onSuccess,
    onError: onError,
  }
}
/**
 * Update EMAIL_NOTIFICATION success action
 * @param {*} payload
 * @returns {object}
 */
export function updateEmailNotificationSuccess(payload) {
  return {
    type: UPDATE_EMAIL_NOTIFICATION_SUCCESS,
    payload: payload,
  }
}

/**
 * Update EMAIL_NOTIFICATION failed action
 * @returns {object}
 */
export function updateEmailNotificationFailed() {
  return {
    type: UPDATE_EMAIL_NOTIFICATION_FAILED,
  }
}
/**
 * Delete EMAIL_NOTIFICATION
 * @param {int} EMAIL_NOTIFICATIONId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function deleteEmailNotification(MOId, onSuccess, onError) {
  return {
    type: DELETE_EMAIL_NOTIFICATION_START,
    payload: MOId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Delete EMAIL_NOTIFICATION success action
 * @param {*} payload
 * @returns {object}
 */
export function deleteEmailNotificationSuccess(payload) {
  return {
    type: DELETE_EMAIL_NOTIFICATION_SUCCESS,
    payload: payload,
  }
}

/**
 * Delete EMAIL_NOTIFICATION failed action
 * @returns {object}
 */
export function deleteEmailNotificationFailed() {
  return {
    type: DELETE_EMAIL_NOTIFICATION_FAILED,
  }
}

/**
 * Get EMAIL_NOTIFICATION details
 * @param {int} EMAIL_NOTIFICATIONId
 * @param {function=} onSuccess Callback function on success
 * @param {function=} onError Callback function on error
 * @returns {object}
 */
export function getEmailNotificationDetailsById(MOId, onSuccess, onError) {
  return {
    type: GET_EMAIL_NOTIFICATION_DETAILS_START,
    payload: MOId,
    onSuccess: onSuccess,
    onError: onError,
  }
}

/**
 * Get EMAIL_NOTIFICATION details by id success action
 * @param {*} payload
 * @returns {object}
 */
export function getEmailNotificationDetailsByIdSuccess(payload) {
  return {
    type: GET_EMAIL_NOTIFICATION_DETAILS_SUCCESS,
    payload: payload,
  }
}

/**
 * Get EMAIL_NOTIFICATION details by id failed action
 * @returns {object}
 */
export function getEmailNotificationDetailsByIdFailed() {
  return {
    type: GET_EMAIL_NOTIFICATION_DETAILS_FAILED,
  }
}

export function resetEmailNotificationDetail() {
  return {
    type: RESET_EMAIL_NOTIFICATION_DETAIL_STATE,
  }
}

export default {
  createEmailNotification,
  createEmailNotificationSuccess,
  createEmailNotificationFailed,
  updateEmailNotification,
  updateEmailNotificationSuccess,
  updateEmailNotificationFailed,
  searchEmailNotification,
  searchEmailNotificationSuccess,
  searchEmailNotificationFailed,
  getEmailNotificationDetailsById,
  getEmailNotificationDetailsByIdSuccess,
  getEmailNotificationDetailsByIdFailed,
  deleteEmailNotification,
  deleteEmailNotificationSuccess,
  deleteEmailNotificationFailed,
  resetEmailNotificationDetail,
}
