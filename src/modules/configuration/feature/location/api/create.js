import useSWRMutation from 'swr/mutation'

import { api } from '~/services/api'

const fetcher = (url, { arg }) => api.post(url, arg)

const uri = `/v1/master-data/locations`

export const useCreateLocation = () => useSWRMutation(uri, fetcher)
