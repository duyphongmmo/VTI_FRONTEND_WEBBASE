import React, { useEffect, createContext, useCallback, useState } from 'react'

import { useRouteMatch } from 'react-router-dom'

import storage from '~/utils/storage'

export const DashboardContext = createContext({})

export const DashboardProvider = ({ children, ...props }) => {
  const { prefix = '', chartOptions = [] } = props
  const route = useRouteMatch()

  const storageKey = `${prefix}${route.path.replace(/\/|:|-|_/g, '')}_dashboard`

  const [setting, setSetting] = useState()

  const updateSetting = useCallback(
    (st) => {
      storage.setSessionItem(storageKey, st)

      setSetting(st)
    },
    [storageKey],
  )

  const initSetting = useCallback(() => {
    const storageSetting = storage.getSessionItem(storageKey)

    if (!chartOptions.length) return
    if (Array.isArray(storageSetting)) return

    updateSetting(chartOptions.map((c) => c?.id))
  }, [chartOptions, setting, storageKey])

  useEffect(() => {
    initSetting()
  }, [initSetting])

  const visibleCharts = setting ?? storage.getSessionItem(storageKey) ?? []

  const isVisibleChart = (id) => visibleCharts.includes(id)

  const value = {
    chartOptions,
    visibleCharts: visibleCharts,
    setVisibleCharts: updateSetting,
    isVisibleChart,
  }

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export const DashboardConsumer = DashboardContext.Consumer

export default DashboardContext
