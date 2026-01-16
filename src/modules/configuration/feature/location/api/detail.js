import useSWR from 'swr'

import { HTTP_STATUS_CODE } from '~/common/constants'
import { api } from '~/services/api'

const fetcher = (url) => api.get(url)

const uri = `/v1/master-data/locations`

export const useGetLocationDetail = (id) => {
  const response = useSWR(id ? `${uri}/${id}` : null, fetcher)

  let itemDetail

  if (response.data?.statusCode === HTTP_STATUS_CODE.SUCCESS) {
    itemDetail = response.data?.data
  }

  return { ...response, itemDetail }
}
