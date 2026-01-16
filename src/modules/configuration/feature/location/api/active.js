import useSWRMutation from 'swr/mutation'

import { api } from '~/services/api'

const fetcher = (url, { arg }) => {
  return api.patch(`${url}/${arg?.id}/active`)
}

export const useActiveLocation = () => {
  const uri = `v1/master-data/locations`
  return useSWRMutation(uri, fetcher)
}
