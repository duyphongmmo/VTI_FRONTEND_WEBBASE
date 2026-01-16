import React, { useEffect, useMemo, useCallback } from 'react'

import { Delete } from '@mui/icons-material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Typography } from '@mui/material'
import IconButtonHover from '@mui/material/IconButton'
import { PropTypes } from 'prop-types'
import Draggable from 'react-draggable'
import TruncateMarkup from 'react-truncate-markup'

import { ENTITY_TYPE, gridSize } from '../../../constants'
import { useDeviceLayoutContext } from '../../../provider/hook'

const ProductionLine = ({
  attribute,
  onViewClick,
  onDelete,
  scaleX = 1,
  scaleY = 1,
  zoom = 1,
}) => {
  const design = attribute.design
  const [pos, setPos] = React.useState({
    x: !!design?.x ? design?.x : 0,
    y: !!design?.y ? design?.y : 0,
    defaultX: !!design?.x ? design?.x : 0,
    defaultY: !!design?.y ? design?.y : 0,
  })
  const [canUpdate, setCanUpdate] = React.useState(true)
  const [size, setSize] = React.useState(
    !!design?.size
      ? {
          width: design?.size?.width,
          height: design?.size?.height,
          defaultWidth: design?.size?.width,
          defaultHeight: design?.size?.height,
        }
      : {
          width: 90,
          height: 60,
          defaultWidth: 90,
          defaultHeight: 60,
        },
  )
  const [resizePoint, setResizePoint] = React.useState({
    x: 0,
    y: 0,
    defaultX: 0,
    defaultY: 0,
  })

  const productionLineId = useMemo(() => {
    return attribute?.id
  }, [attribute?.id])

  const {
    focusing,
    setFocusing,
    setProductionLineDesign,
    isView,
    isDashBoard,
  } = useDeviceLayoutContext()

  const isFocus = useMemo(
    () =>
      focusing?.id === productionLineId &&
      focusing?.type === ENTITY_TYPE.PRODUCTION_LINE,
    [focusing, productionLineId],
  )

  const prRef = React.useRef(null)

  const setIsFocus = useCallback(
    (focus) => {
      if (focus) {
        if (isFocus) return
        setFocusing({
          id: productionLineId,
          type: ENTITY_TYPE.PRODUCTION_LINE,
        })
      } else {
        if (!isFocus) return
        setFocusing(null)
      }
    },
    [productionLineId, isFocus, setFocusing],
  )
  const handleClickOutside = useCallback(
    (event) => {
      const toolbar = document.querySelector('.layout-toolbar')
      const resizePoint = document.querySelector(
        '#resize-point-pr' + productionLineId,
      )
      if (
        toolbar?.contains(event.target) ||
        resizePoint?.contains(event.target)
      ) {
        return
      }
      if (prRef?.current && !prRef?.current?.contains(event.target)) {
        setIsFocus(false)
      }
    },
    [prRef?.current, setIsFocus, productionLineId],
  )

  const onDragEnd = useCallback(
    (e, ui) => {
      //auto fit with grid size
      // const newX = Math.round(ui.x / gridSize.width) * gridSize.width
      // const newY = Math.round(ui.y / gridSize.height) * gridSize.height

      setPos({ x: ui.x, y: ui.y, defaultX: ui.x, defaultY: ui.y })
      setCanUpdate(true)
    },
    [size, design?.title, setCanUpdate],
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

    onDelete(productionLineId, ENTITY_TYPE.PRODUCTION_LINE)
  }, [productionLineId, onDelete, isView])

  const handleUpdateProductionLineDesign = useCallback(() => {
    setProductionLineDesign((prev) => {
      const newProductionLine = prev?.map((item) => {
        if (item.id === productionLineId) {
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
      return [...newProductionLine]
    })
  }, [pos, size, productionLineId])

  useEffect(() => {
    if (!canUpdate) return
    handleUpdateProductionLineDesign()
    setResizePoint({ x: pos.x + size.width, y: pos.y + size.height })
  }, [pos, size, canUpdate, handleUpdateProductionLineDesign])

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
          setCanUpdate(false)
          setIsFocus(true)
        }}
        disabled={isView || isDashBoard}
      >
        <Box
          sx={{
            position: 'absolute',
            width: isDashBoard ? design?.size?.width * scaleX : size.width,
            height: isDashBoard ? design?.size?.height * scaleY : size.height,
            backgroundColor: 'transparent',
            border: isFocus ? '2px dotted  #0761AD' : '2px dashed #222',
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            cursor: 'pointer',
            borderRadius: 1,
            zIndex: !isView && !isDashBoard ? 2 : 2,
          }}
          ref={prRef}
          onClick={() => {
            setIsFocus(true)
          }}
          onKeyDown={onKeyDown}
          tabIndex="0"
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: 0,
              right: 0,
              cursor: 'pointer',
              padding: '2px 4px',
              margin: '0 auto',
              textAlign: 'center',
              zIndex: 2,
              maxWidth: '100%',
            }}
          >
            <TruncateMarkup lines={1} ellipsis={() => '...'}>
              <Typography
                variant="body"
                sx={{
                  color: isFocus ? 'primary.main' : 'text.primary',
                  fontWeight: isFocus ? 'bold' : 'normal',
                }}
              >
                {design?.title}
              </Typography>
            </TruncateMarkup>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: 1,
              right: -30,
              display: isFocus ? 'flex' : 'none',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'column',
              zIndex: 2,
            }}
            className="layout-toolbar"
          >
            {!!onViewClick && (
              <IconButtonHover
                size="small"
                shape="circle"
                onClick={() => {
                  onViewClick(productionLineId, ENTITY_TYPE.PRODUCTION_LINE)
                }}
              >
                <VisibilityIcon
                  fontSize="small"
                  sx={{
                    fontSize: '1rem',
                  }}
                />
              </IconButtonHover>
            )}

            {/* {!isView && (
              <IconButtonHover
                size="small"
                shape="circle"
                onClick={(e) => {
                  onClickEdit(e)
                }}
              >
                <Edit
                  fontSize="small"
                  sx={{
                    fontSize: '1rem',
                  }}
                />
              </IconButtonHover>
            )} */}

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
                    fontSize: '1rem',
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
          id={'resize-point-pr' + productionLineId}
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

ProductionLine.defaultProps = {
  children: null,
  scale: 1,
}

ProductionLine.propTypes = {
  children: PropTypes.node,
  onViewClick: PropTypes.func,
  onDelete: PropTypes.func,
  scale: PropTypes.number,
}

export default ProductionLine
