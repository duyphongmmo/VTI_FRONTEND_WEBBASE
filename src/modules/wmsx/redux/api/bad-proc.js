import { api } from "~/services/api";

export const getBadProcApi = async (params) => {
  return await api.get("/v1/dashboard/get-bad-proc", params);
};

export const getBadProcByNameApi = async (params) => {
  return await api.get("/v1/dashboard/get-bad-by-name", params);
};
