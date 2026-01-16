import React, { useEffect, useMemo, useCallback } from 'react'

import { Delete, Edit } from '@mui/icons-material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Tooltip, Typography } from '@mui/material'
import IconButtonHover from '@mui/material/IconButton'
import { PropTypes } from 'prop-types'
import Draggable from 'react-draggable'
import TruncateMarkup from 'react-truncate-markup'

import { ReactComponent as DeviceSVG } from '~/assets/images/device.svg'
import useDeviceDashboard from '~/modules/mmsx/redux/hooks/useDeviceDashboard'

import { ENTITY_TYPE, gridSize } from '../../../constants'
import { useDeviceLayoutContext } from '../../../provider/hook'
import { getHolonWithPositionByCoordinates } from '../../../utils'

const Position = ({
  onEditClick,
  attribute,
  onViewClick,
  onDelete,
  scaleX = 1,
  scaleY = 1,
  zoom = 1,
}) => {
  const design = attribute.design
  const [canUpdate, setCanUpdate] = React.useState(true)
  const [pos, setPos] = React.useState({
    x: !!design?.x ? design?.x : 0,
    y: !!design?.y ? design?.y : 0,
    defaultX: !!design?.x ? design?.x : 0,
    defaultY: !!design?.y ? design?.y : 0,
  })
  const [size, setSize] = React.useState(
    !!design?.size
      ? {
          width: design?.size?.width,
          height: design?.size?.height,
          defaultWidth: design?.size?.width,
          defaultHeight: design?.size?.height,
        }
      : {
          width: 30,
          height: 30,
          defaultWidth: 30,
          defaultHeight: 30,
        },
  )
  const [resizePoint, setResizePoint] = React.useState({
    x: 0,
    y: 0,
    defaultX: 0,
    defaultY: 0,
  })

  const {
    data: { deviceLayoutStatuses, colorAvailable },
  } = useDeviceDashboard()

  const positionId = useMemo(() => {
    return attribute?.id
  }, [attribute?.id])

  const {
    focusing,
    setFocusing,
    setPositionDesign,
    isView,
    holonDesign,
    isDashBoard,
  } = useDeviceLayoutContext()

  const isFocus = useMemo(
    () =>
      focusing?.id === positionId && focusing?.type === ENTITY_TYPE.POSITION,
    [focusing, positionId],
  )

  const color = useMemo(() => {
    if (!isDashBoard) return '#ddd'

    const status = deviceLayoutStatuses?.get(attribute?.device?.id)
    const color = colorAvailable?.find((item) => item?.id === status?.colorId)
    return color?.color ?? '#ddd'
  }, [
    attribute?.device?.id,
    colorAvailable,
    deviceLayoutStatuses?.get(attribute?.device?.id),
    isDashBoard,
  ])

  const posRef = React.useRef(null)

  const setIsFocus = useCallback(
    (focus) => {
      if (focus) {
        if (isFocus) return
        setFocusing({
          id: positionId,
          type: ENTITY_TYPE.POSITION,
        })
      } else {
        if (!isFocus) return
        setFocusing(null)
      }
    },
    [positionId, isFocus, setFocusing],
  )

  const handleClickOutside = useCallback(
    (event) => {
      const toolBar = document.querySelector('.layout-toolbar')
      const resizePoint = document.querySelector(
        '#resize-point-ps' + positionId,
      )

      if (
        resizePoint?.contains(event.target) ||
        toolBar?.contains(event.target)
      ) {
        return
      }

      if (!!posRef?.current && !posRef?.current?.contains(event.target)) {
        setIsFocus(false)
      }
    },
    [posRef?.current, setIsFocus, positionId],
  )

  const validate = useCallback(
    (x, y, size) => {
      setPositionDesign((prev) => {
        const holon = getHolonWithPositionByCoordinates(holonDesign, {
          x: x,
          y: y,
          size,
        })
        const clearUser = prev?.map((item) => {
          if (item?.id === positionId) {
            return {
              ...item,
              responsibleUser: null,
            }
          }
          return item
        })

        const curPos = prev?.find((item) => item?.id === positionId)

        if (!holon) {
          return clearUser
        } else {
          if (
            !!curPos?.responsibleUser &&
            curPos?.costCenter?.id !== holon?.id
          ) {
            return clearUser
          }
        }

        return prev
      })
    },
    [holonDesign, positionId, setPositionDesign],
  )

  const onDragEnd = useCallback(
    (e, ui) => {
      setIsFocus(true)
      //auto fit with grid size
      // const newX = Math.round(ui.x / gridSize.width) * gridSize.width
      // const newY = Math.round(ui.y / gridSize.height) * gridSize.height

      setPos({ x: ui.x, y: ui.y, defaultX: ui.x, defaultY: ui.y })
      setCanUpdate(true)
      validate(ui.x, ui.y, size)
    },
    [setIsFocus, setCanUpdate, setPos, size],
  )

  const onResize = useCallback(
    (e, ui) => {
      setIsFocus(true)
      let newWidth = Math.abs(ui.x - pos.x)
      let newHeight = Math.abs(ui.y - pos.y)

      if (newWidth < gridSize.width || newHeight < gridSize.height) return
      setSize({
        width: newWidth,
        height: newHeight,
        defaultHeight: newHeight,
        defaultWidth: newWidth,
      })
    },
    [pos.x, pos.y, setIsFocus],
  )

  const onResizeEnd = useCallback(
    (e, ui) => {
      setIsFocus(true)
      let newWidth = Math.abs(ui.x - pos.x)
      let newHeight = Math.abs(ui.y - pos.y)

      //auto fit with grid size
      // newWidth = Math.round(newWidth / gridSize.width) * gridSize.width
      // newHeight = Math.round(newHeight / gridSize.height) * gridSize.height
      if (size.width === newWidth && size.height === newHeight) {
        setCanUpdate(true)
        return
      }
      setSize({
        width: newWidth,
        height: newHeight,
        defaultHeight: newHeight,
        defaultWidth: newWidth,
      })
      setCanUpdate(true)

      // validate(pos.x, pos.y, {
      //   width: newWidth,
      //   height: newHeight,
      // })
    },
    [setIsFocus, pos.x, pos.y, size.width, size.height],
  )

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [handleClickOutside])

  const onClickDelete = useCallback(() => {
    if (isView) return

    onDelete(positionId, ENTITY_TYPE.POSITION)
  }, [positionId, onDelete, isView])

  const handleUpdatePositionDesign = useCallback(() => {
    setPositionDesign((prev) => {
      const newPosition = prev.map((item) => {
        if (item?.id === positionId) {
          return {
            ...item,
            design: {
              ...item.design,
              ...pos,
              size,
            },
          }
        }
        return item
      })
      return newPosition
    })
  }, [positionId, pos, size, setPositionDesign])

  useEffect(() => {
    if (!canUpdate || isDashBoard) return
    handleUpdatePositionDesign()
    setResizePoint({ x: pos.x + size.width, y: pos.y + size.height })
  }, [pos, size, canUpdate, handleUpdatePositionDesign, isDashBoard])

  const onKeyDown = useCallback(
    (e) => {
      switch (e.keyCode) {
        case 46:
          onClickDelete(e)
          break
        default:
          break
      }
    },
    [onClickDelete],
  )

  const ellipsisLength = useMemo(() => {
    if (size.height >= 240) {
      return 2
    }
    return 1
  }, [size])

  useEffect(() => {
    setPos((prev) => ({
      ...prev,

      x: prev?.defaultX * zoom,
      y: prev?.defaultY * zoom,
    }))
    setResizePoint((prev) => ({
      ...prev,

      x: prev?.defaultX * zoom,
      y: prev?.defaultY * zoom,
    }))

    setSize((prev) => ({
      ...prev,
      width: prev?.defaultWidth * zoom,
      height: prev?.defaultHeight * zoom,
    }))
  }, [zoom])
  return (
    <>
      <Draggable
        bounds="parent"
        position={
          isDashBoard
            ? {
                x: design?.x * scaleX,
                y: design?.y * scaleY,
              }
            : {
                x: pos.x,
                y: pos.y,
              }
        }
        onStop={onDragEnd}
        onDrag={() => {
          setIsFocus(true)
        }}
        onStart={() => {
          setCanUpdate(false)
        }}
        disabled={isView || isDashBoard}
      >
        <Box
          sx={{
            position: 'absolute',
            width: isDashBoard ? design?.size?.width * scaleX : size.width,
            height: isDashBoard ? design?.size?.height * scaleY : size.height,
            backgroundColor: '#fff',
            border: isFocus ? '2px solid #0761AD' : '1px solid #ccc',
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            cursor: 'pointer',
            borderRadius: 2,
            zIndex: !isView && !isDashBoard ? 3 : 3,
            // zIndex: 3,
          }}
          ref={posRef}
          onClick={() => {
            setIsFocus(true)
          }}
          onKeyDown={onKeyDown}
          tabIndex={0}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
          }}
          onDoubleClick={() => {
            onViewClick(positionId, ENTITY_TYPE.POSITION)
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DeviceSVG width={'95%'} height={'95%'} fill={color} />
          </Box>

          <Tooltip title={design?.title} arrow placement="bottom">
            <Box
              sx={{
                position: 'absolute',
                bottom: '-18px',
                right: 0,
                left: 0,
                cursor: 'pointer',
                textAlign: 'center',
                zIndex: 3,
                maxWidth: '100%',
              }}
            >
              <TruncateMarkup lines={ellipsisLength} ellipsis={() => '...'}>
                <Typography
                  variant="body"
                  sx={{
                    color: isFocus ? 'primary.main' : 'text.primary',
                    fontWeight: isFocus ? 'bold' : 'normal',
                    fontSize: '0.7rem',
                  }}
                >
                  {design?.title}
                </Typography>
              </TruncateMarkup>
            </Box>
          </Tooltip>

          <Box
            sx={{
              position: 'absolute',
              top: 1,
              right: -30,
              display: isFocus ? 'flex' : 'none',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'column',
              zIndex: 100,
            }}
            className="layout-toolbar"
          >
            {onViewClick && (
              <IconButtonHover
                size="small"
                shape="circle"
                onClick={() => {
                  onViewClick(positionId, ENTITY_TYPE.POSITION)
                }}
              >
                <VisibilityIcon
                  fontSize="small"
                  sx={{
                    fontSize: '0.9rem',
                  }}
                />
              </IconButtonHover>
            )}

            {!isView && !!onEditClick && (
              <IconButtonHover
                size="small"
                shape="circle"
                onClick={(e) => {
                  onEditClick(e, attribute?.id)
                }}
              >
                <Edit
                  fontSize="small"
                  sx={{
                    fontSize: '0.9rem',
                  }}
                />
              </IconButtonHover>
            )}

            {!isView && !isDashBoard && (
              <IconButtonHover
                size="small"
                shape="circle"
                onClick={(e) => {
                  onClickDelete(e)
                }}
              >
                <Delete
                  fontSize="small"
                  sx={{
                    fontSize: '0.9rem',
                  }}
                />
              </IconButtonHover>
            )}
          </Box>
        </Box>
      </Draggable>

      <Draggable
        bounds="parent"
        position={resizePoint}
        onDrag={onResize}
        onStop={onResizeEnd}
        disabled={!isFocus || isView}
        onStart={() => {
          setCanUpdate(false)
        }}
      >
        <Box
          id={'resize-point-ps' + positionId}
          sx={{
            position: 'absolute',
            width: 10,
            height: 10,
            cursor: 'crosshair',
            zIndex: 100,
          }}
        ></Box>
      </Draggable>
    </>
  )
}

Position.defaultProps = {
  children: null,
  color: '#ddd',
  scale: 1,
}

Position.propTypes = {
  children: PropTypes.node,
  onViewClick: PropTypes.func,
  onDelete: PropTypes.func,
  color: PropTypes.string,
  scale: PropTypes.number,
}

export default Position
