import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { HTTP_STATUS_CODE, NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const useActiveMaintenanceStatus = () => {
  const uri = `v1/users/maintenance-system/active`
  const fetcher = (url, { arg }) => api.put(url, arg)
  return useSWRMutation(uri, fetcher, {
    onError: (err) => {
      addNotification(err, NOTIFICATION_TYPE.ERROR)
    },
  })
}

export const useInactiveMaintenanceStatus = () => {
  const uri = `v1/users/maintenance-system/inactive`
  const fetcher = (url, { arg }) => api.put(url, arg)
  return useSWRMutation(uri, fetcher, {
    onError: (err) => {
      addNotification(err, NOTIFICATION_TYPE.ERROR)
    },
  })
}

export const useGetMaintenanceStatus = () => {
  const fetcher = ([url]) => api.get(url)
  const uri = `v1/users/maintenance-system`
  const response = useSWR([uri], fetcher)

  let data

  if (response.data?.statusCode === HTTP_STATUS_CODE.SUCCESS) {
    data = response.data?.data
  }

  return { ...response, data }
}