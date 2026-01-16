import React from 'react'


import { LAYOUT_MODE } from '~/modules/configuration/feature/device-layout/constants'
import DeviceProvider from '~/modules/configuration/feature/device-layout/provider'

import DeviceLayoutDashboard from './layout'

const DeviceStatusLayout = ({ quickFilters }) => {
  return (
    <DeviceProvider defaultMode={LAYOUT_MODE.DASHBOARD}>
      <DeviceLayoutDashboard quickFilters={quickFilters} />
    </DeviceProvider>
  )
}

export default DeviceStatusLayout
