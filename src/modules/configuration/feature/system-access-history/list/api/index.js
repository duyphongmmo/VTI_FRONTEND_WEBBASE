import useSWR from "swr"

import { HTTP_STATUS_CODE } from "~/common/constants"
import { api } from "~/services/api"

const fetcher = ([url, params]) => api.get(url, params)


export const useGetSystemAccessHistory = (params) => {
  const uri = 'v1/datasync/auth-logs'
  const response = useSWR([uri, params], fetcher)

  let list = []
  let total = 0

  if (response.data?.statusCode === HTTP_STATUS_CODE.SUCCESS) {
    list = response.data?.data?.items || []
    total = response.data?.data?.meta?.total || 0
  }

  return { ...response, list, total }
}