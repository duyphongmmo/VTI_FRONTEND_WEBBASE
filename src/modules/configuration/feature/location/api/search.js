import useSWR from 'swr'

import { HTTP_STATUS_CODE } from '~/common/constants'
import { api } from '~/services/api'

const fetcher = ([url, params]) => api.get(url, params)

const uri = `/v1/master-data/locations`

export const useSearchLocation = (params) => {
  const response = useSWR([uri, params], fetcher)
  let list = []
  let total = 0

  if (response.data?.statusCode === HTTP_STATUS_CODE.SUCCESS) {
    list = response.data?.data?.items
    total = response.data?.data?.meta?.total
  }

  return { ...response, list, total }
}

export const searchLocationApi = (params) => {
  return api.get(uri, params)
}
