import React, {
  useEffect,
  createContext,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react'

import { isEmpty } from 'lodash'

import { SUPER_ADMIN_CODE } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { isAuth } from '~/utils'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState('')
  const [isBottomActionBarExisted, setIsBottomActionBarExisted] =
    useState(false)
  const pageRootRef = useRef()
  const pageTopRef = useRef()
  const pageBottomRef = useRef()


  const {
    data: { userInfo },
    actions,
  } = useUserInfo()

  const isAuthenticated = isAuth()

  useEffect(() => {
    if (isAuthenticated) {
      actions.getUserInfo()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (userInfo?.statusNotification) {
    }
  }, [userInfo?.statusNotification])

  const canAccess = useCallback(
    (code) => {
      const userPermissions = userInfo?.userPermissions || []

      if (!code) return true
      let groupCode = []
      if (code instanceof Array) {
        groupCode = [...code]
      } else {
        groupCode = [code]
      }
      if (isEmpty(groupCode)) return true
      return userPermissions.some((item) => {
        return groupCode.includes(item?.code)
      })
    },
    [userInfo?.userPermissions],
  )

  const scrollToTop = useCallback(
    (options = {}) => {
      pageTopRef?.current?.scrollIntoView({ behavior: 'smooth', ...options })
    },
    [pageTopRef.current],
  )

  const scrollToBottom = ({ immediately = false, ...options } = {}) => {
    if (immediately) {
      pageBottomRef?.current?.scrollIntoView({
        behavior: 'smooth',
        ...options,
      })
    } else {
      setTimeout(() => {
        pageBottomRef?.current?.scrollIntoView({
          behavior: 'smooth',
          ...options,
        })
      }, 0)
    }
  }

  const isAdmin = useMemo(() => {
    const userPermissions = userInfo?.userPermissions || []
    return (
      userPermissions.includes(FUNCTION_CODE.ADMIN_ROLE_ADMIN) ||
      userInfo?.code === SUPER_ADMIN_CODE
    )
  }, [userInfo?.userPermissions])

  const value = {
    refreshKey,
    setRefreshKey,
    clearRefreshKey: () => setRefreshKey(''),
    canAccess,
    isAdmin,
    pageRootRef,
    pageTopRef,
    pageBottomRef,
    scrollToTop,
    scrollToBottom,
    isBottomActionBarExisted,
    setIsBottomActionBarExisted,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext
