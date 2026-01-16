import useSWRMutation from 'swr/mutation'

import { api } from '~/services/api'

const fetcher = (url, { arg }) => api.delete(`${url}/${arg.id}`)

const uri = `/v1/master-data/locations`
export const useDeleteLocation = () => {
  return useSWRMutation(uri, fetcher)
}
