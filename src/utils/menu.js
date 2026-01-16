import { map } from 'lodash'

import { appRoutesObj, flatten } from '../routes'

export const getCurrentModule = (locationPathName = '') => {
  const firstParam = locationPathName.split('/')?.[1]
  if (appRoutesObj[firstParam] !== undefined) return firstParam
  return ''
}

export const getFirstAccessibleMenuPath = ({ routes = [], userInfo }) => {
  const firstAccessibleMenu = flatten(routes)?.find(
    (menu) =>
      menu?.isInSidebar &&
      (!menu?.code ||
        (menu?.code &&
          map(userInfo?.userPermissions, 'code')?.includes(menu?.code))),
  )
  return firstAccessibleMenu?.path
}
