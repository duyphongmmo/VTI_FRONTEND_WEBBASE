import useSWRMutation from 'swr/mutation'

import { api } from '~/services/api'

const fetcher = (url, { arg }) =>
  api.patch(`${url}/${arg?.id}`, arg?.convertData)

const uri = '/v1/master-data/locations'

export const useUpdateLocation = () => useSWRMutation(uri, fetcher)
