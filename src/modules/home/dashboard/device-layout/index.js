import React, { useEffect, useMemo } from 'react'

import { Box, Card, Grid } from '@mui/material'

import { useQueryState } from '~/common/hooks'
import useDeviceDashboard from '~/modules/configuration/redux/hooks/useDeviceDashboard'
import { convertFilterParams } from '~/utils'

import {
  MMS_SOCKET_EVENT,
  MMS_SOCKET_ROOM_PREFIX,
  STATUS_FILTER_TYPE,
} from '../constants'
import { useDashboardSocket } from '../context/dashboard-context'
import DeviceStatusLayout from './layout'
import SummaryLayoutChart from './layout/sidebar-layout/summary-layout'
import WarningNotification from './layout/sidebar-layout/warning-notification/index'
import QuickFilter from './quick-filter'
import StatusDashboard from './status-filter-dashboard'

const DEFAULT_FILTERS = {
  factory: null,
  plant: null,
  floor: null,
  productionLine: [],
}

const DeviceLayoutDashboard = () => {
  const { quickFilters, setQuickFilters } = useQueryState({
    quickFilters: DEFAULT_FILTERS,
  })

  const { dashboardSocket } = useDashboardSocket()
  const { actions } = useDeviceDashboard()

  const payload = useMemo(() => {
    let filters = null
    let type = null
    if (quickFilters?.floor?.id) return

    if (quickFilters?.plant?.id && !filters) {
      filters = {
        plantId: quickFilters?.plant?.id,
        refreshKey: STATUS_FILTER_TYPE.PLANT_FLOOR + quickFilters?.plant?.id,
      }
      type = STATUS_FILTER_TYPE.PLANT_FLOOR
    }
    if (quickFilters?.factory?.id && !filters) {
      filters = {
        factoryId: quickFilters?.factory?.id,
      }
      type = STATUS_FILTER_TYPE.PLANT
    }
    if (!filters) {
      type = STATUS_FILTER_TYPE.FACTORY
    }
    return {
      filter: filters ? convertFilterParams(filters) : null,
      type,
      rawFilter: filters,
    }
  }, [quickFilters])

  useEffect(() => {
    if (!payload) return
    actions.getDeviceStatusDetailDashboard({
      filter: payload?.filter,
      type: payload?.type,
    })

    return () => {
      actions.resetDeviceDashboardState()
    }
  }, [payload])

  useEffect(() => {
    if (!dashboardSocket) return

    if (roomId) {
      dashboardSocket?.emit?.(MMS_SOCKET_EVENT.JOIN_ROOM, roomId)
      dashboardSocket.on?.(roomId, (data) => {
        actions.getDeviceStatusDetailDashboardSuccess(data)
      })

      dashboardSocket?.io?.on?.(MMS_SOCKET_EVENT.RECONNECT, () => {
        dashboardSocket?.emit?.(MMS_SOCKET_EVENT.JOIN_ROOM, roomId)
      })
    }

    return () => {
      dashboardSocket?.off?.(roomId)
      dashboardSocket?.emit?.(MMS_SOCKET_EVENT.LEAVE_ROOM, roomId)
      dashboardSocket?.io?.off?.(MMS_SOCKET_EVENT.RECONNECT)
    }
  }, [dashboardSocket, payload])

  const roomId = useMemo(() => {
    switch (payload?.type) {
      case STATUS_FILTER_TYPE.FACTORY:
        return MMS_SOCKET_ROOM_PREFIX.DASHBOARD_ALL_FACTORY
      case STATUS_FILTER_TYPE.PLANT:
        return (
          MMS_SOCKET_ROOM_PREFIX.DASHBOARD_FACTORY +
          '-' +
          payload.rawFilter.factoryId
        )
      case STATUS_FILTER_TYPE.PLANT_FLOOR:
        return (
          MMS_SOCKET_ROOM_PREFIX.DASHBOARD_PLANT +
          '-' +
          payload.rawFilter.plantId
        )
      default:
        return null
    }
  }, [payload])

  return (
    <>
      {quickFilters?.floor?.id && (
        <Grid container justifyContent="center" spacing={0.5} mb={1}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                pr: 1,
              }}
            >
              <SummaryLayoutChart />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                height: '100%',
              }}
            >
              <WarningNotification />
            </Card>
          </Grid>
        </Grid>
      )}

      <Card
        sx={{
          padding: 2,
        }}
      >
        <QuickFilter
          quickFilters={quickFilters}
          setQuickFilters={setQuickFilters}
        />
      </Card>

      {!quickFilters.floor?.id && (
        <Box
          sx={{
            pb: 1,
            mt: 1,
            width: '100%',
          }}
        >
          <StatusDashboard
            quickFilters={quickFilters}
            setQuickFilters={setQuickFilters}
            type={payload?.type}
          />
        </Box>
      )}

      {quickFilters?.floor?.id && (
        <Grid container justifyContent="center" spacing={0.5}>
          <Grid item xs={12}>
            <DeviceStatusLayout quickFilters={quickFilters} />
          </Grid>

          {/* <Grid xs={12} mt={2}>
            <Box
              sx={{
                ml: 1,
              }}
            >
              <StatusLayoutBar />
            </Box>
          </Grid> */}
        </Grid>
      )}
    </>
  )
}

export default DeviceLayoutDashboard
