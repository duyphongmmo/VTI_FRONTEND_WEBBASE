import React, { createContext, useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { useApp } from '~/common/hooks/useApp'
import storage from '~/utils/storage'

export const SidebarContext = createContext({})

export const SidebarProvider = ({ children }) => {
  const { pathname } = useLocation()
  const { canAccess } = useApp()
  const [isMinimal, setIsMinimal] = useState(
    storage.getSessionItem('isMinimal') || false,
  )
  const [isOpenModuleList, setIsOpenModuleList] = useState(false)

  const isActive = (path = '') =>
    pathname === path ||
    pathname === `${path}/` ||
    (path.split('/').length > 2 && pathname.includes(`${path}/`))

  const isActiveChildren = (subs = []) =>
    subs.some((m) => isActive(m.path) || isActiveChildren(m?.subMenu))

  const getVisibleSubMenu = (route) =>
    route?.subMenu?.filter(
      (item) => item?.isInSidebar && canAccess(item?.code),
    ) || []

  useEffect(() => {
    storage.setSessionItem('isMinimal', isMinimal)
  }, [isMinimal])

  const value = {
    isMinimal,
    setIsMinimal,
    isActive,
    isActiveChildren,
    getVisibleSubMenu,
    isOpenModuleList,
    setIsOpenModuleList,
  }
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

export default SidebarContext
