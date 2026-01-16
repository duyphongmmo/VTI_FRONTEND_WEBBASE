import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { isNumber } from 'lodash'
import { useTranslation } from 'react-i18next'
import { uuid } from 'uuidv4'

import Page from '~/components/Page'

import useDeviceLayout from '../../redux/hooks/useDeviceLayout'
// import KGrid from './components/entity/grid'
import { ROUTE } from '../../routes/config'
import DialogPosition from './components/dialogs/dialog-position'
import DialogView from './components/dialogs/dialog-view'
import Door from './components/entity/door'
import Holon from './components/entity/holon'
import Position from './components/entity/position'
import ProductionLine from './components/entity/production-line'
import Menu from './components/menu'
import { ENTITY_TYPE } from './constants'
import { useDeviceLayoutContext } from './provider/hook'
import { getDataDropTransfer, getInitDesign } from './utils'
import {
  validateDropPosition,
  validateDropProductionLine,
} from './utils/validation'

const DEFAULT_FILTERS = {
  plant: null,
  floor: null,
}
const DeviceLayout = () => {
  const { t } = useTranslation('mmsx')
  const [quickFilters, setQuickFilters] = useState(DEFAULT_FILTERS)

  const {
    holonDesign,
    setHolonDesign,
    productionLineDesign,
    setProductionLineDesign,
    positionDesign,
    setPositionDesign,
    setFocusing,
    setDoorDesign,
    doorDesign,
    setMode,
    diagramSize,
    imagePreview,
    setBackgroundImage,
    setDiagramSize,
    // zoom,
  } = useDeviceLayoutContext()

  const {
    data: { isLoading },
    actions,
  } = useDeviceLayout()

  const layoutStageRef = useRef(null)

  const [isShowDialogPosition, setIsShowDialogPosition] = useState(false)
  const [isShowDialogView, setIsShowDialogView] = useState(false)
  const [tempData, setTempData] = useState({})

  const handleDropHolon = useCallback(
    (e) => {
      e.preventDefault()
      const { layerX, layerY } = e.nativeEvent

      const { holon, id, costCenter } = getDataDropTransfer(e)
      const size = { width: 180, height: 180 }

      const newHolon = [
        ...holonDesign,
        {
          uid: id + '-' + uuid(),
          id: id,
          name: holon,
          code: holon,
          costCenter,
          design: {
            id,
            title: holon,
            x: layerX >= 90 ? layerX - 90 : 0,
            y: layerY >= 90 ? layerY - 90 : 0,
            size,
          },
        },
      ]

      setHolonDesign(newHolon)
      setFocusing({
        id: id,
        type: ENTITY_TYPE.HOLON,
      })
    },
    [holonDesign, setHolonDesign, setFocusing, setHolonDesign, setFocusing],
  )

  const handleDropProductionLine = useCallback(
    (e) => {
      e.preventDefault()
      const { layerX, layerY } = e.nativeEvent
      const { name, id, code, costCenter } = getDataDropTransfer(e)
      const size = { width: 90, height: 60 }
      const isValid = validateDropProductionLine(
        holonDesign,
        {
          x: layerX,
          y: layerY,
          size,
          name: name,
          costCenter,
        },
        t,
      )
      if (!isValid) return

      const newProductionLine = [
        ...productionLineDesign,
        {
          id: id,
          name: name,
          code: code,
          costCenter: null,
          prDepartment: costCenter,
          design: {
            id,
            title: name,
            x: layerX >= 45 ? layerX - 45 : 0,
            y: layerY >= 45 ? layerY - 45 : 0,
            size,
          },
        },
      ]

      setProductionLineDesign(newProductionLine)
      setFocusing({
        id: id,
        type: ENTITY_TYPE.PRODUCTION_LINE,
      })
    },
    [
      productionLineDesign,
      setProductionLineDesign,
      setFocusing,
      setHolonDesign,
      holonDesign,
    ],
  )

  const handleDropPosition = (e) => {
    e.preventDefault()

    const { layerX, layerY } = e.nativeEvent

    const { name, id, device, code } = getDataDropTransfer(e)
    const size = { width: 60, height: 60 }

    const { holon: targetHolon, productionLine: targetProductionLine } =
      validateDropPosition(
        {
          holonDesign,
          productionLineDesign,
        },
        {
          x: layerX,
          y: layerY,
        },
        t,
      )
    if (!targetHolon || !targetProductionLine) return

    let newDevice = device
    let responsibleUser = device?.responsibleUser
    if (targetHolon && targetHolon.id !== device?.costCenter?.id) {
      newDevice = {
        ...device,
        ...targetHolon?.device,
      }
      responsibleUser = null
    }
    setTempData({
      id: id,
      name: name,
      code: code,
      device: newDevice,
      productionLine: targetProductionLine,
      costCenter: targetHolon?.costCenter,
      prCostCenter: targetHolon?.costCenter,
      responsibleUser: responsibleUser,
      prResponsibleUser: responsibleUser,
      design: {
        id,
        title: name,
        x: layerX >= 60 ? layerX - 60 : 0,
        y: layerY >= 60 ? layerY - 60 : 0,
        size,
      },
    })
    setFocusing({})
    setIsShowDialogPosition(true)
  }
  const handleDropDoor = useCallback(
    (e) => {
      e.preventDefault()
      const { layerX, layerY } = e.nativeEvent
      const { name, id, code } = getDataDropTransfer(e)
      const size = { width: 60, height: 60 }
      const newDoor = [
        ...doorDesign,
        {
          id: id,
          name: name,
          code: code,
          design: {
            id,
            x: layerX >= 30 ? layerX - 30 : 0,
            y: layerY >= 30 ? layerY - 30 : 0,
            name: name,
            size,
          },
        },
      ]

      setDoorDesign(newDoor)
      setFocusing({
        id: id,
        type: ENTITY_TYPE.DOOR,
      })
    },
    [doorDesign, setDoorDesign, setFocusing],
  )
  const handleDropElement = useCallback(
    (e) => {
      const type = getDataDropTransfer(e)?.type
      switch (type) {
        case ENTITY_TYPE.HOLON:
          handleDropHolon(e)
          break
        case ENTITY_TYPE.PRODUCTION_LINE:
          handleDropProductionLine(e)
          break
        case ENTITY_TYPE.POSITION:
          handleDropPosition(e)
          break
        case ENTITY_TYPE.DOOR:
          handleDropDoor(e)
          break
        default:
          break
      }
    },
    [
      handleDropHolon,
      handleDropProductionLine,
      handleDropPosition,
      handleDropDoor,
    ],
  )

  const handleDeleteElement = useCallback(
    (id, type) => {
      switch (type) {
        case ENTITY_TYPE.HOLON:
          setHolonDesign((prev) =>
            prev.filter((item, index) =>
              isNumber(id) ? index !== id : item?.id !== id,
            ),
          )
          break
        case ENTITY_TYPE.PRODUCTION_LINE:
          setProductionLineDesign((prev) =>
            prev.filter((item) => item.id !== id),
          )
          break
        case ENTITY_TYPE.POSITION:
          setPositionDesign((prev) => prev.filter((item) => item.id !== id))
          break
        case ENTITY_TYPE.DOOR:
          setDoorDesign((prev) => prev.filter((item) => item.id !== id))
          break
        default:
          break
      }
    },
    [setHolonDesign, setProductionLineDesign, setPositionDesign],
  )
  const refreshData = () => {
    setBackgroundImage(null)
    if (!quickFilters.plant?.id || !quickFilters?.floor?.id) return

    actions.getDeviceLayoutDetail(
      {
        plantId: quickFilters.plant?.id,
        plantFloorId: quickFilters.floor?.id,
      },
      (data) => {
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
        setBackgroundImage(file)
        setDiagramSize((prev) => ({
          ...prev,
          width: background?.width,
          height: background?.height,
        }))
      },
    )
  }
  useEffect(() => {
    refreshData()

    return () => {
      actions.resetDeviceLayout()
      setHolonDesign([])
      setProductionLineDesign([])
      setPositionDesign([])
      setDoorDesign([])
    }
  }, [quickFilters])

  const onEditPositionClick = useCallback(
    (e, id) => {
      e.preventDefault()
      const position = positionDesign.find((item) => item.id === id)
      setTempData(position)
      setIsShowDialogPosition(true)
      setFocusing({})
    },
    [setIsShowDialogPosition, setTempData, setFocusing, positionDesign],
  )

  const onSubmitNewPosition = (values) => {
    const { code, responsibleUser } = values
    const id = tempData?.id
    // const validate = validatePositionCode(positionDesign, code, id, t)
    // if (!validate) {
    //   return
    // }
    const checkExist = positionDesign.find((item) => item.id === id)
    let newPos = []
    if (checkExist) {
      newPos = positionDesign.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            code: code,
            costCenter: tempData.costCenter,
            responsibleUser,
            design: {
              ...item.design,
              title: code,
            },
          }
        }
        return item
      })
    } else {
      newPos = [
        ...positionDesign,
        {
          ...tempData,
          code: code,
          responsibleUser,
          design: {
            ...tempData.design,
            title: code,
          },
        },
      ]
    }
    setIsShowDialogPosition(false)
    setPositionDesign(newPos)
    setFocusing({
      id: id,
      type: ENTITY_TYPE.POSITION,
    })
  }

  const onViewClick = useCallback(
    (id, type) => {
      switch (type) {
        case ENTITY_TYPE.HOLON:
          setTempData({
            ...holonDesign.find(
              (item, index) =>
                item.id === id || id === item?.costCenter?.id || index === id,
            ),
            type,
          })
          break
        case ENTITY_TYPE.PRODUCTION_LINE:
          setTempData({
            ...productionLineDesign.find((item) => item.id === id),
            type,
          })
          break
        case ENTITY_TYPE.POSITION:
          setTempData({
            ...positionDesign.find((item) => item.id === id),
            type,
          })
          break
        default:
          break
      }
      setFocusing({})
      setIsShowDialogView(true)
    },
    [
      setIsShowDialogView,
      setTempData,
      setFocusing,
      holonDesign,
      productionLineDesign,
      positionDesign,
    ],
  )
  const breadcrumbs = [
    {
      title: ROUTE.DEVICE_MANAGEMENT.TITLE,
    },
    {
      route: ROUTE.DEVICE_LAYOUT.PATH,
      title: ROUTE.DEVICE_LAYOUT.TITLE,
    },
  ]
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t(`menu.${ROUTE.DEVICE_LAYOUT.TITLE}`)}
      loading={isLoading}
      fitScreen
      freeSolo
    >
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          mx: -2,
          mt: -2,
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Grid item xs={2}>
            <Box sx={{ p: 1 }}>
              <Menu
                quickFilters={quickFilters}
                onEditClickPosition={onEditPositionClick}
                onViewClick={onViewClick}
                onDelete={handleDeleteElement}
                setQuickFilters={setQuickFilters}
                setMode={setMode}
              />
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box
              sx={{
                margin: '0 auto',
                overflow: 'hidden',
                height: '100%',
              }}
            >
              <Box
                className="editor-main"
                sx={{
                  height: '100%',
                  width: '100%',
                  bgcolor: '#c2c2c2',
                  overflow: 'auto',
                  margin: '0 auto',
                }}
              >
                <Box
                  className="editor-view"
                  sx={{
                    width: diagramSize?.width + 200,
                    height: '100%',
                    margin: '0 auto',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 2,
                    pb: 2,
                  }}
                >
                  <Box
                    className="editor-diagram"
                    sx={{
                      width: diagramSize?.width,
                      height: diagramSize?.height,
                      margin: '0 auto',
                      bgcolor: !imagePreview ? '#fff' : 'transparent',

                      backgroundImage: `url(${imagePreview})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      position: 'absolute',
                    }}
                    ref={layoutStageRef}
                    id="layoutStage"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDropElement}
                  >
                    {holonDesign?.map((item, index) => (
                      <Holon
                        key={item.id + '-' + index}
                        attribute={item}
                        onViewClick={onViewClick}
                        onDelete={handleDeleteElement}
                        index={index}
                        // zoom={zoom}
                      />
                    ))}
                    {productionLineDesign?.map((item, index) => (
                      <ProductionLine
                        key={item.id + '-' + index}
                        attribute={item}
                        onViewClick={onViewClick}
                        onDelete={handleDeleteElement}
                        index={index}
                        // zoom={zoom}
                      />
                    ))}

                    {positionDesign?.map((item, index) => (
                      <Position
                        key={item.id + '-' + index}
                        onEditClick={onEditPositionClick}
                        attribute={item}
                        onViewClick={onViewClick}
                        onDelete={handleDeleteElement}
                        // zoom={zoom}
                      />
                    ))}
                    {doorDesign?.map((item) => (
                      <Door
                        key={item.id}
                        attribute={item}
                        onDelete={handleDeleteElement}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {isShowDialogPosition && (
          <DialogPosition
            open={isShowDialogPosition}
            onCancel={() => setIsShowDialogPosition(false)}
            onSubmit={onSubmitNewPosition}
            tempData={tempData}
          />
        )}
        {isShowDialogView && (
          <DialogView
            open={isShowDialogView}
            tempData={tempData}
            onCancel={() => setIsShowDialogView(false)}
          />
        )}
      </Box>
    </Page>
  )
}

export default DeviceLayout
