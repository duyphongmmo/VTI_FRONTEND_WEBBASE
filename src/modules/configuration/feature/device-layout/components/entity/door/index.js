import React, { useEffect, useMemo, useCallback } from 'react'

import { Delete } from '@mui/icons-material'
import { Box } from '@mui/material'
import IconButtonHover from '@mui/material/IconButton'
import Draggable from 'react-draggable'

import doorImage from '../../../../../../../assets/images/door.png'
// import doorImage from '../../../../../../../assets/images/sample/door.svg'
import './style.scss'
import { ENTITY_TYPE, MAX_STAGE_SIZE, gridSize } from '../../../constants'
import { useDeviceLayoutContext } from '../../../provider/hook'
const Door = ({ attribute, scaleX = 1, scaleY = 1 }) => {
  const design = attribute.design
  const [pos, setPos] = React.useState(design)
  const [size, setSize] = React.useState(
    design?.size ?? {
      width: 90,
      height: 90,
    },
  )

  const [resizePoint, setResizePoint] = React.useState({
    x: 0,
    y: 0,
  })

  const doorId = useMemo(() => {
    return attribute.id
  }, [attribute?.id])

  const {
    focusing,
    setFocusing,
    doorDesign,
    setDoorDesign,
    isView,
    isDashBoard,
  } = useDeviceLayoutContext()

  const isFocus = useMemo(
    () => focusing?.id === doorId && focusing?.type === ENTITY_TYPE.DOOR,
    [focusing, doorId],
  )

  const holonRef = React.useRef(null)

  const setIsFocus = useCallback(
    (focus) => {
      if (focus) {
        if (isFocus) return
        setFocusing({
          id: doorId,
          type: ENTITY_TYPE.DOOR,
        })
      } else {
        if (!isFocus) return
        setFocusing(null)
      }
    },
    [isFocus, doorId, setFocusing],
  )
  const handleClickOutside = useCallback(
    (event) => {
      const doorToolbar = document.querySelector('.layout-toolbar')
      const resizePoint = document.querySelector('#resize-point-door' + doorId)
      if (
        doorToolbar?.contains(event.target) ||
        resizePoint?.contains(event.target)
      ) {
        return
      }

      if (!!holonRef?.current && !holonRef?.current?.contains(event.target)) {
        setIsFocus(false)
      }
    },
    [doorId, holonRef?.current, setIsFocus],
  )

  const onDragEnd = useCallback((e, ui) => {
    //auto fit with grid size
    const newX = Math.round(ui.x / gridSize.width) * gridSize.width
    const newY = Math.round(ui.y / gridSize.height) * gridSize.height

    setPos({ x: newX, y: newY })
  }, [])

  const onResize = useCallback(
    (e, ui) => {
      setIsFocus(true)
      let newWidth = Math.abs(ui.x - pos.x)
      let newHeight = Math.abs(ui.y - pos.y)

      if (newWidth < gridSize.width || newHeight < gridSize.height) return
      setSize({
        width: newWidth,
        height: newHeight,
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
      newWidth = Math.round(newWidth / gridSize.width) * gridSize.width
      newHeight = Math.round(newHeight / gridSize.height) * gridSize.height
      if (size.width === newWidth && size.height === newHeight) return
      setSize({
        width: newWidth,
        height: newHeight,
      })
    },
    [setIsFocus, pos.x, pos.y, size.width, size.height],
  )

  const onClickDelete = useCallback(
    (e) => {
      if (isView) return
      e.preventDefault()
      setDoorDesign((prev) => [...prev].filter((item) => item.id !== doorId))
    },
    [doorDesign, doorId, setDoorDesign, isView],
  )

  const handleUpdateDoorDesign = useCallback(() => {
    setDoorDesign((prev) => {
      const newDoor = prev.map((item) => {
        if (item.id === doorId) {
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
      return [...newDoor]
    })
  }, [pos, size, doorId, setDoorDesign])

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [handleClickOutside])

  useEffect(() => {
    handleUpdateDoorDesign()
    setResizePoint({ x: pos.x + size.width, y: pos.y + size.height })
  }, [pos, size, handleUpdateDoorDesign])

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

  const imageRotate = useMemo(() => {
    return pos.x === 0
      ? 'rotate-90'
      : pos.y === 0
      ? 'rotate-180'
      : MAX_STAGE_SIZE.width - pos.x - 90 <= 0
      ? 'rotate-270'
      : ''
  }, [pos])

  return (
    <>
      <Draggable
        bounds="parent"
        position={{
          x: (isDashBoard ? design?.x : pos.x) * scaleX,
          y: (isDashBoard ? design?.y : pos.y) * scaleY,
        }}
        onStop={onDragEnd}
        onDrag={() => {
          setIsFocus(true)
        }}
        disabled={isView || isDashBoard}
      >
        <Box
          sx={{
            position: 'absolute',
            width: (isDashBoard ? design?.size?.width : size.width) * scaleX,
            height: (isDashBoard ? design?.size?.height : size.height) * scaleY,
            // backgroundColor: '#fff',
            border: isFocus ? '2px dashed #0761AD' : 'none',
            cursor: 'pointer',
            zIndex: !isView && !isDashBoard ? (isFocus ? 50 : 1) : 10,
          }}
          ref={holonRef}
          onClick={() => {
            setIsFocus(true)
          }}
          onKeyDown={onKeyDown}
          tabIndex={0}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
          }}
        >
          <img
            className={imageRotate}
            draggable={false}
            src={doorImage}
            alt="doorImage"
            style={{
              width: '100%',
              height: '100%',
            }}
          />

          {/* <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: 0,
              right: 0,
              cursor: 'pointer',
              padding: '2px 4px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <Typography
              variant="body"
              sx={{
                color: isFocus ? 'primary.main' : 'text.primary',
                fontWeight: isFocus ? 'bold' : 'normal',
              }}
            >
              {design?.name}
            </Typography>
          </Box> */}

          <Box
            sx={{
              position: 'absolute',
              top: 1,
              right: -30,
              display: isFocus ? 'flex' : 'none',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'column',
              zIndex: 1,
            }}
            className="layout-toolbar"
          >
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
        disabled={true}
        onStop={onResizeEnd}
      >
        <Box
          id={'resize-point-door' + doorId}
          sx={{
            position: 'absolute',
            width: 10,
            height: 10,
            // cursor: 'crosshair',
            zIndex: 100,
          }}
        ></Box>
      </Draggable>
    </>
  )
}

export default Door
