import React, { useMemo } from 'react'

import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import Guard from '~/components/Guard'
import Page from '~/components/Page'
import useDeviceDashboard from '~/modules/configuration/redux/hooks/useDeviceDashboard'

import { DashboardSocketProvider } from './context/dashboard-context'
import DeviceLayoutDashboard from './device-layout'
import DeviceSummary from './device-summary'

function Dashboard() {
  const { t } = useTranslation(['home'])
  const {
    data: { isLoading, summaryLoading },
  } = useDeviceDashboard()
  const { quickFilters } = useQueryState()
  const isShowDeviceSummary = useMemo(
    () => !quickFilters?.floor?.id,
    [quickFilters?.floor?.id],
  )
  return (
    <DashboardSocketProvider>
      <Page
        title={t('dashboard.title')}
        loading={isLoading || summaryLoading}
        freeSolo
      >
        <Guard code={FUNCTION_CODE.DEVICE_STATUS_DASHBOARD}>
          {isShowDeviceSummary && (
            <Box>
              <DeviceSummary />
            </Box>
          )}
          <Box mt={1}>
            <DeviceLayoutDashboard />
          </Box>
        </Guard>
      </Page>
    </DashboardSocketProvider>
  )
}

export default Dashboard
