import useSWRMutation from 'swr/mutation'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'


export const useActiveUser = () => {
  const getUri = (id) => `v1/users/${id}/active`
  const fetcher = (url, { arg }) => api.put(getUri(arg?.id), arg)
  return useSWRMutation(getUri(), fetcher, {
    onError: (err) => {
      addNotification(err, NOTIFICATION_TYPE.ERROR)
    },
  })
}

export const useInActiveUser = () => {
  const getUri = (id) => `v1/users/${id}/inactive`
  const fetcher = (url, { arg }) => {
    return api.put(getUri(arg.id), arg.body || {})
  }
  return useSWRMutation(getUri(), fetcher, {
    onError: (err) => {
      addNotification(err, NOTIFICATION_TYPE.ERROR)
    },
  })
}