export const GET_BAD_PROC = "GET_BAD_PROC";
export const GET_BAD_PROC_SUCCESS = "GET_BAD_PROC_SUCCESS";
export const GET_BAD_PROC_FAILED = "GET_BAD_PROC_FAILED";

export const GET_BAD_PROC_BY_NAME = "GET_BAD_PROC_BY_NAME";
export const GET_BAD_PROC_BY_NAME_SUCCESS = "GET_BAD_PROC_BY_NAME_SUCCESS";
export const GET_BAD_PROC_BY_NAME_FAILED = "GET_BAD_PROC_BY_NAME_FAILED";

export const getBadProc = (payload, onSuccess, onError) => ({
  type: GET_BAD_PROC,
  payload,
  onError,
  onSuccess,
});

export const getBadProcSuccess = (payload) => ({
  type: GET_BAD_PROC_SUCCESS,
  payload,
});

export const getBadProcFailed = (payload) => ({
  type: GET_BAD_PROC_FAILED,
  payload,
});

export const getBadProcByName = (payload, onSuccess, onError) => ({
  type: GET_BAD_PROC_BY_NAME,
  payload,
  onError,
  onSuccess,
});

export const getBadProcByNameSuccess = (payload) => ({
  type: GET_BAD_PROC_BY_NAME_SUCCESS,
  payload,
});

export const getBadProcByNameFailed = (payload) => ({
  type: GET_BAD_PROC_BY_NAME_FAILED,
  payload,
});

export default {
  getBadProc,
  getBadProcSuccess,
  getBadProcFailed,
  getBadProcByName,
  getBadProcByNameSuccess,
  getBadProcByNameFailed,
};
