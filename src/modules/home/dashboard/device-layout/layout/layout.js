import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'

import { Box, Card } from '@mui/material'
import { isEmpty } from 'lodash'
import { SizeMe } from 'react-sizeme'

import { MAX_STAGE_SIZE } from '~/modules/configuration/feature/device-layout/constants'
import { useDeviceLayoutContext } from '~/modules/configuration/feature/device-layout/provider/hook'
import { getInitDesign } from '~/modules/configuration/feature/device-layout/utils'
import useDeviceDashboard from '~/modules/configuration/redux/hooks/useDeviceDashboard'
import { convertFilterParams } from '~/utils'

import {
  DEVICE_LAYOUT_ACTION,
  MMS_SOCKET_EVENT,
  generateDeviceLayoutEvent,
} from '../../constants'
import DashboardSocketContext from '../../context/dashboard-context'

const DeviceLayoutDashboard = ({ quickFilters }) => {
  const [image, setImage] = useState(null)
  const {
    setHolonDesign,
    setProductionLineDesign,
    setPositionDesign,
    setDoorDesign,
    setBackgroundImage,
    diagramSize,
    imagePreview,
    setDiagramSize,
  } = useDeviceLayoutContext()

  const {
    actions,
    data: { deviceLayoutDesign },
  } = useDeviceDashboard()
  const isMounted = useRef(null)

  const { dashboardSocket = {} } = useContext(DashboardSocketContext)

  const onRefresh = (data) => {
    if (!isEmpty(data)) {
      const {
        holonDesign,
        productionLineDesign,
        positionDesign,
        doorDesign,
        file,
        background,
      } = getInitDesign(data)

      setHolonDesign(holonDesign)
      setProductionLineDesign(productionLineDesign)
      setPositionDesign(positionDesign)
      setDoorDesign(doorDesign)
      setImage(file?.fileUrl ?? null)
      setDiagramSize({
        width: background?.width,
        height: background?.height,
      })
    } else {
      setHolonDesign([])
      setProductionLineDesign([])
      setPositionDesign([])
      setDoorDesign([])
      setImage(null)
    }
  }

  useEffect(() => {
    onRefresh(deviceLayoutDesign)
  }, [deviceLayoutDesign])

  const refreshLayout = (filters, isRefresh = false) => {
    if (!isRefresh) {
      actions.getDeviceLayoutDashboard({
        filter: convertFilterParams(filters),
      })
    } else {
      actions.refreshLayout({
        filter: convertFilterParams(filters),
      })
    }
  }

  const keyRefresh = useMemo(() => {
    return quickFilters?.plant?.id + '_' + quickFilters?.floor?.id
  }, [quickFilters?.plant?.id, quickFilters?.floor?.id])

  const eventListen = useMemo(() => {
    return generateDeviceLayoutEvent(
      quickFilters?.plant?.id,
      quickFilters?.floor?.id,
    )
  }, [keyRefresh])

  useEffect(() => {
    let filters = {}

    if (!quickFilters?.plant?.id) return

    filters = {
      plantId: quickFilters?.plant?.id,
      plantFloorId: quickFilters?.floor?.id,
      // productionLineIds: quickFilters?.productionLine?.map((item) => item.id),
    }

    isMounted.current = filters.plantFloorId
    refreshLayout(filters)

    return () => {
      isMounted.current = false

      actions.resetDeviceLayoutDashboard()
    }
  }, [keyRefresh])

  useEffect(() => {
    if (!dashboardSocket) return

    dashboardSocket?.on?.(eventListen, (data) => {
      switch (data?.action) {
        case DEVICE_LAYOUT_ACTION.UPDATE_LAYOUT:
          onRefresh(data?.payload)
          break
        case DEVICE_LAYOUT_ACTION.DEVICE_CHANGE_STATUS:
          actions.updateSingleDeviceStatus(data?.payload)
          break
        default:
          break
      }
    })

    return () => {
      dashboardSocket?.off?.(eventListen)
    }
  }, [eventListen, actions, dashboardSocket])

  useEffect(() => {
    if (!dashboardSocket) return

    dashboardSocket.on?.(MMS_SOCKET_EVENT.UPDATE_AVAILABLE_COLOR, (data) => {
      if (!isEmpty(data?.payload)) actions.updateAvailableColor(data?.payload)
    })

    return () => {
      dashboardSocket?.off?.(MMS_SOCKET_EVENT.UPDATE_COLOR_AVAILABLE)
    }
  }, [dashboardSocket])

  useEffect(() => {
    if (!dashboardSocket || !keyRefresh) return
    dashboardSocket.on?.(MMS_SOCKET_EVENT.REFRESH_DEVICE_LAYOUT, (data) => {
      if (!isEmpty(data)) {
        const needRefresh = data?.find((item) => {
          return item?.plantId + '_' + item?.plantFloorId === keyRefresh
        })
        if (!!needRefresh) {
          refreshLayout(
            {
              plantId: needRefresh?.plantId,
              plantFloorId: needRefresh?.plantFloorId,
            },
            true,
          )
        }
      }
    })

    return () => {
      dashboardSocket?.off?.(MMS_SOCKET_EVENT.REFRESH_DEVICE_LAYOUT)
    }
  }, [dashboardSocket, keyRefresh])

  // const handleClickViewDevice = (id) => {
  //   window.open(
  //     `${ROUTE.DEVICE_STATUS.DETAIL.PATH.replace(':id', id)}`,
  //     '_blank',
  //     'noopener,noreferrer',
  //   )
  // }

  useEffect(() => {
    if (image) {
      setBackgroundImage(image)
    } else {
      setBackgroundImage(null)
    }
  }, [image])

  // const lineIds = useMemo(
  //   () => quickFilters?.productionLine?.map((item) => item.id),
  //   [quickFilters?.productionLine],
  // )
  return (
    <Box mt={1} pb={2}>
      <SizeMe monitorHeight>
        {({ size }) => {
          let scaleX = 1
          // let scaleY = 1

          if (size.width) {
            scaleX = Math.min(
              size.width / diagramSize?.width ?? MAX_STAGE_SIZE.width,
            )
          }
         
          const height = diagramSize?.height * scaleX ?? MAX_STAGE_SIZE.height
          return (
            <Card
              sx={{
                flex: 1,
                maxWidth: '100%',
                width: '100%',
                position: 'relative',
                height: height + 'px',
                overflow: 'hidden',
                zIndex: 50,
              }}
            >
              <Box id="layoutStage">
                <Box
                  sx={{
                    position: 'absolute',
                    zIndex: 100,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    right: 0,

                    backgroundImage: `url(${imagePreview})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* {isEmpty(lineIds) &&
                    holonDesign?.map((item) => (
                      <Holon
                        key={item.id}
                        attribute={item}
                        scaleX={scaleX}
                        scaleY={scaleX}
                        zoom={scaleX}
                      />
                    ))}
                  {productionLineDesign?.map((item) => {
                    if (!isEmpty(lineIds) && !lineIds.includes(item.id))
                      return null
                    return (
                      <ProductionLine
                        key={item.id}
                        attribute={item}
                        scaleX={scaleX}
                        scaleY={scaleY}
                      />
                    )
                  })}

                  {positionDesign?.map((item) => {
                    if (
                      !isEmpty(lineIds) &&
                      !lineIds.includes(item.productionLine?.id)
                    )
                      return null
                    return (
                      <Position
                        key={item.id}
                        attribute={item}
                        color={item.design?.color}
                        scaleX={scaleX}
                        scaleY={scaleY}
                        onViewClick={() =>
                          handleClickViewDevice(item?.device.id)
                        }
                      />
                    )
                  })} */}
                  {/* {isEmpty(lineIds) &&
                    doorDesign?.map((item) => (
                      <Door
                        key={item.id}
                        attribute={item}
                        scaleX={scaleX}
                        scaleY={scaleY}
                      />
                    ))} */}
                </Box>
              </Box>
            </Card>
          )
        }}
      </SizeMe>
    </Box>
  )
}

export default DeviceLayoutDashboard
