import React from 'react'

import DeviceLayout from './layout'
import DeviceLayoutProvider from './provider'

const DeviceLayoutPage = () => {
  return (
    <DeviceLayoutProvider>
      <DeviceLayout />
    </DeviceLayoutProvider>
  )
}

export default DeviceLayoutPage
