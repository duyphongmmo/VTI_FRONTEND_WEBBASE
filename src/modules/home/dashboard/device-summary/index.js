import React, { useContext, useEffect, useMemo } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Summary from '~/components/Summary'
import useDeviceDashboard from '~/modules/configuration/redux/hooks/useDeviceDashboard'

import {
  MMS_SOCKET_EVENT,
  MMS_SOCKET_ROOM_PREFIX,
  STATUS_FILTER_TYPE,
} from '../constants'
import DashboardSocketContext from '../context/dashboard-context'

const DeviceSummary = () => {
  const { t } = useTranslation(['home'])
  const {
    data: { statusSummary },
    actions,
  } = useDeviceDashboard()

  const { dashboardSocket = {} } = useContext(DashboardSocketContext)

  useEffect(() => {
    if (!dashboardSocket) return

    dashboardSocket?.emit?.(
      MMS_SOCKET_EVENT.JOIN_ROOM,
      MMS_SOCKET_ROOM_PREFIX.DASHBOARD_SYNTHESIS,
    )

    dashboardSocket?.on?.(
      MMS_SOCKET_ROOM_PREFIX.DASHBOARD_SYNTHESIS,
      (data) => {
        actions.getDeviceStatusSummarySuccess(data)
      },
    )

    dashboardSocket?.io?.on?.(MMS_SOCKET_EVENT.RECONNECT, () => {
      dashboardSocket?.emit?.(
        MMS_SOCKET_EVENT.JOIN_ROOM,
        MMS_SOCKET_ROOM_PREFIX.DASHBOARD_SYNTHESIS,
      )
    })

    return () => {
      dashboardSocket?.emit?.(
        MMS_SOCKET_EVENT.LEAVE_ROOM,
        MMS_SOCKET_ROOM_PREFIX.DASHBOARD_SYNTHESIS,
      )
      dashboardSocket?.off?.(MMS_SOCKET_ROOM_PREFIX.DASHBOARD_SYNTHESIS)
      dashboardSocket?.io?.off?.(MMS_SOCKET_EVENT.RECONNECT)
    }
  }, [dashboardSocket])

  useEffect(() => {
    actions.getDeviceStatusSummary({
      type: STATUS_FILTER_TYPE.SYNTHESIS,
    })
    return () => {}
  }, [])

  const total = useMemo(() => {
    return statusSummary?.[0]?.totalDevice ?? 0
  }, [statusSummary])

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={4}
        md={4}
        lg={12 / (statusSummary?.[0]?.statusCount?.length + 1)}
      >
        <Summary label={t('dashboard.deviceForManufacturing')} value={total} />
      </Grid>
      {statusSummary?.[0]?.statusCount?.map((item) => (
        <Grid
          item
          xs={4}
          md={4}
          lg={12 / (statusSummary?.[0]?.statusCount?.length + 1)}
        >
          <Summary
            titleColor={item?.color?.color}
            value={item?.count}
            label={item?.color?.status}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default DeviceSummary
