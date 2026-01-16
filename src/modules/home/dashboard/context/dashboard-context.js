import React, { createContext, useContext, useEffect, useState } from 'react'

import io from 'socket.io-client'

export const DashboardSocketContext = createContext({})

const host =
  process.env.REACT_APP_SOCKET_NOTIFICATION_HOST ||
  process.env.REACT_APP_SOCKET_HOST

export const DashboardSocketProvider = ({ children }) => {
  const [dashboardSocket, setDashboardSocket] = useState(null)
  useEffect(() => {
    const dashboardSk = io(`${host}/dashboard-mms`, {
      transports: ['websocket'],
    })

    dashboardSk.connect()

    setDashboardSocket(dashboardSk)

    return () => {
      dashboardSk?.disconnect()
    }
  }, [])

  const value = {
    dashboardSocket: dashboardSocket || {},
  }

  return (
    <DashboardSocketContext.Provider value={value}>
      {children}
    </DashboardSocketContext.Provider>
  )
}
export const useDashboardSocket = () => useContext(DashboardSocketContext)

export default DashboardSocketContext
