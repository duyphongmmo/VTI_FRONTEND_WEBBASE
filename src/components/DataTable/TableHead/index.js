import React, {
  createRef,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Typography, Tooltip } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box } from '@mui/system'
import clsx from 'clsx'

import { ORDER_DIRECTION } from '~/common/constants'
import { useTable } from '~/common/hooks/useTable'
import Checkbox from '~/components/Checkbox'
import {
  DEFAULT_MIN_COLUMN_WIDTH,
  DEFAULT_MAX_COLUMN_WIDTH,
  RESIZE_LINE_WIDTH,
} from '~/contexts/TableContext'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { useClasses } from '~/themes'

import Truncate from '../../Truncate'
import style from './style'

/**
 *
 * @param {*} props
 * @returns
 */
const TableHead = ({ onSortChange: _onSortChange }) => {
  const {
    rows,
    uniqKey,
    pageSize,
    sort,
    onSortChange,
    containerRef,
    visibleColumns,
    selected,
    isTableResizable,
    checkboxSelection,
    reorderable,
    onSelectionChange,
    setting,
    updateSetting,
    isVisible,
    visibleColumnKeys,
    selectSingle,
    maxThLines,
    noBorder,
  } = useTable()

  const { order, orderBy } = sort || {}

  const classes = useClasses(style, noBorder)
  const calculatedRef = useRef(false)

  const {
    data: { isLoading: isLoadingUserInfo },
  } = useUserInfo()

  const columnRefs = visibleColumns.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.field]: createRef(),
    }),
    {},
  )

  const isResizing = useRef('')

  const isReadyToGrowUp = (col = {}) =>
    col.resizable !== false && col.growUp !== false

  const autoAdjustWidth = () => {
    const actualWidth = visibleColumns.reduce((acc, cur) => {
      return acc + cur.width
    }, 0)

    const containerWidth = containerRef?.current?.clientWidth || 0
    const shortageWidth =
      containerWidth -
      (actualWidth + (checkboxSelection ? 50 : 0) + (reorderable ? 50 : 0))

    if (shortageWidth === 0) return
    if (shortageWidth > 0) {
      const qty =
        visibleColumns.filter((col) => isReadyToGrowUp(col))?.length || 1
      const growWidth = Math.floor(shortageWidth / qty)

      setting.forEach((col) => {
        const newWidth =
          col.width + (isVisible(col) && isReadyToGrowUp(col) ? growWidth : 0)

        if (columnRefs[col.field]?.current?.parentElement) {
          columnRefs[col.field].current.parentElement.style.width =
            newWidth + 'px'
        }
      })
    } else {
      setting.forEach((col) => {
        if (columnRefs[col.field]?.current?.parentElement) {
          columnRefs[col.field].current.parentElement.style.width =
            col.width + 'px'
        }
      })
    }
  }

  const manualAdjustWidth = (field, width) => {
    if (columnRefs[field]?.current?.parentElement) {
      const column = setting.find((col) => col.field === field)
      const minWidth = column?.minWidth ?? DEFAULT_MIN_COLUMN_WIDTH
      const maxWidth = column?.maxWidth ?? DEFAULT_MAX_COLUMN_WIDTH
      const getNewWidth = () => {
        if (width > maxWidth) return maxWidth
        if (width < minWidth) return minWidth
        return width
      }

      // const actualWidth = setting.reduce((acc, cur) => {
      //   if (cur.field === field) return acc + getNewWidth()
      //   if (isVisible(cur)) return acc + cur.width
      //   return acc
      // }, 0)

      // const containerWidth = containerRef?.current?.clientWidth || 0
      // const shortageWidth =
      //   containerWidth -
      //   (actualWidth + (checkboxSelection ? 50 : 0) + (reorderable ? 50 : 0))

      // if (shortageWidth > 0) return
      columnRefs[field].current.parentElement.style.width = getNewWidth() + 'px'
    }
  }

  const setCursorDocument = (isResizing) => {
    document.body.style.cursor = isResizing ? 'col-resize' : 'auto'
  }

  const handleMouseMove = useCallback(
    (e) => {
      if (!isResizing.current) return

      const newWidth =
        e.clientX -
        columnRefs[
          isResizing.current
        ]?.current?.parentElement?.getBoundingClientRect().left +
        RESIZE_LINE_WIDTH

      manualAdjustWidth(isResizing.current, Math.floor(newWidth || 0))
    },
    [isResizing.current, columnRefs],
  )

  const handleMouseUp = useCallback(() => {
    setCursorDocument(false)
    if (!isResizing.current) return
    isResizing.current = ''

    const st = setting?.map((s) => ({
      ...s,
      width:
        columnRefs[s.field]?.current?.parentElement?.offsetWidth || s.width,
    }))

    updateSetting(st)
  }, [isResizing.current, columnRefs, visibleColumns, setting])

  const startResize = (field) => {
    isResizing.current = field
    setCursorDocument(true)
  }

  useEffect(() => {
    if (isTableResizable) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [handleMouseMove, handleMouseUp, isTableResizable])

  useEffect(() => {
    if (!isTableResizable) return
    autoAdjustWidth()
  }, [checkboxSelection, reorderable, isTableResizable, visibleColumnKeys])

  const onClickSort = (field) => {
    let newSort

    if (field !== orderBy) {
      newSort = {
        orderBy: field,
        order: ORDER_DIRECTION.ASC,
      }
    } else if (order === ORDER_DIRECTION.ASC) {
      newSort = {
        orderBy: field,
        order: ORDER_DIRECTION.DESC,
      }
    }

    if (typeof _onSortChange === 'function') {
      _onSortChange(newSort)
    } else {
      onSortChange(newSort)
    }
  }

  /**
   * Check if field is sorted
   * @param {string} field
   * @returns
   */
  const isSorted = (field) => {
    return orderBy === field
  }

  /**
   * Handle select all
   * @param {*} event
   */
  const onSelectAllClick = (event) => {
    if (!checkboxSelection) return
    if (event.target.checked) {
      const concatSelected = [...selected, ...rows]
      const uniqueIndexValues = [
        ...new Set(concatSelected.map((item) => item[uniqKey])),
      ]
      const newSelected = uniqueIndexValues.map((indexValue) =>
        concatSelected.find((item) => item[uniqKey] === indexValue),
      )
      onSelectionChange(newSelected)
    } else {
      const newSelected = selected.filter(
        (item) => !rows.find((e) => e[uniqKey] === item[uniqKey]),
      )
      onSelectionChange(newSelected)
    }
  }

  /**
   * Check if current page is selected all
   * @returns {bool}
   */
  const isSelectedAllCurrentPage = () => {
    return (
      rows.length > 0 &&
      rows.every((item) =>
        selected?.some(
          (selectedItem) => selectedItem[uniqKey] === item[uniqKey],
        ),
      )
    )
  }

  /**
   * Check if current page is checked some rows
   * @returns {bool}
   */
  const isSelectedSomeCurrentPage = () => {
    const currentPageSelectedRows = rows.filter((item) =>
      selected?.some((selectedItem) => selectedItem[uniqKey] === item[uniqKey]),
    )
    return (
      rows.length > 0 &&
      currentPageSelectedRows.length > 0 &&
      currentPageSelectedRows.length <
        (pageSize === rows.length ? pageSize : rows.length)
    )
  }

  const parseColumnsByLevel = (cols = []) => {
    const childCols = cols?.reduce((acc, cur) => {
      if (Array.isArray(cur?.columns))
        return [...acc, ...cur?.columns?.filter((c) => isVisible(c))]
      return acc
    }, [])

    if (childCols?.length) {
      return [cols, ...parseColumnsByLevel(childCols)]
    }

    return [cols]
  }

  const getColSpan = (col) => {
    let x = 1

    if (Array.isArray(col?.columns) && col?.columns?.length) {
      col?.columns?.forEach((c) => {
        if (c && !c?.hide) {
          x += getColSpan(c)
        }
      })

      return x - 1
    }
    return x
  }

  const headRows = parseColumnsByLevel(visibleColumns)
  const depth = headRows.length

  const rowRefs = useMemo(
    () => [...new Array(depth)].map(() => createRef()),
    [depth],
  )

  const calculateTopPositions = () => {
    if (rowRefs.some((r) => !r?.current)) return
    calculatedRef.current = true

    const h = rowRefs.reduce((acc, cur) => {
      const tr = cur?.current
      if (tr) tr.style.top = acc + 'px'
      return acc + (tr?.offsetHeight || 0)
    }, 0)

    if (depth > 1 && h - 2 > 0) {
      Object.values(columnRefs)?.forEach((col) => {
        const resizeLineEl = col?.current
        if (resizeLineEl) resizeLineEl.style.height = h - 2 + 'px'
      })
    }
  }

  const channel = new MessageChannel()

  window.requestAnimationFrame(() => {
    if (calculatedRef.current) return
    channel.port2.postMessage(undefined)
  })

  channel.port1.onmessage = () => {
    calculateTopPositions()
  }

  if (isLoadingUserInfo) return null
  if (visibleColumns.every((col) => !col.headerName)) return null

  return (
    <MuiTableHead className={classes.tableHead}>
      {headRows.map((trColumns, trIndex) => (
        <TableRow
          key={trIndex}
          sx={{
            zIndex: depth - trIndex,
          }}
          ref={rowRefs[trIndex]}
        >
          {trIndex === 0 && reorderable && (
            <TableCell
              className={clsx(classes.headerCell, classes.headerCellReorder)}
              rowSpan={depth}
              sx={{ zIndex: 30, top: 0, left: 0 }}
            />
          )}

          {trIndex === 0 && checkboxSelection && (
            <TableCell
              className={clsx(classes.headerCell, classes.headerCellCheckbox)}
              rowSpan={depth}
              sx={{ zIndex: 30, top: 0, left: reorderable ? 50 : 0 }}
            >
              {!selectSingle && (
                <Checkbox
                  indeterminate={isSelectedSomeCurrentPage()}
                  checked={isSelectedAllCurrentPage()}
                  onChange={onSelectAllClick}
                  className={classes.checkbox}
                />
              )}
            </TableCell>
          )}

          {trColumns.map((column) => {
            const {
              headerAlign,
              align,
              field,
              headerName,
              headerTooltip,
              width,
              minWidth,
              sortable,
              resizable,
              sticky,
              aliasName,
              required,
              headerColor,
            } = column
            const sorted = isSorted(field)

            let colWidth = width || minWidth
            let colMinWidth = minWidth || width || DEFAULT_MIN_COLUMN_WIDTH
            let colHeaderName = aliasName || headerName
            let colStickyLeft =
              (reorderable ? 50 : 0) + (checkboxSelection ? 50 : 0)
            let colStickyRight = 0

            for (let c of visibleColumns || []) {
              if (c?.field === field) break

              if (c?.sticky === 'left' && isVisible(c)) {
                colStickyLeft +=
                  c?.width || c?.minWidth || DEFAULT_MIN_COLUMN_WIDTH
              }
            }

            for (let c of [...(visibleColumns || [])].reverse()) {
              if (c?.field === field) break

              if (c?.sticky === 'right' && isVisible(c)) {
                colStickyRight +=
                  c?.width || c?.minWidth || DEFAULT_MIN_COLUMN_WIDTH
              }
            }

            const renderHeaderContent = () => (
              <>
                {typeof headerName === 'function' ? (
                  headerName()
                ) : (
                  <Typography variant="h5">
                    <Truncate
                      value={colHeaderName}
                      asterisk={required}
                      onTruncate={calculateTopPositions}
                      lines={maxThLines}
                      align={headerAlign || align}
                    />
                  </Typography>
                )}
                {headerTooltip && (
                  <Box
                    component="span"
                    sx={{
                      ml: 0.5,
                      position: 'relative',
                      top: 2,
                    }}
                  >
                    <Tooltip title={headerTooltip} arrow placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                    </Tooltip>
                  </Box>
                )}
              </>
            )
            return (
              <TableCell
                key={field}
                className={clsx(classes.headerCell, {
                  [classes[`headerCellAlign${headerAlign || align}`]]:
                    headerAlign || align,
                  [classes.firstStickyRight]:
                    sticky === 'right' &&
                    visibleColumns?.find((item) => item?.sticky === 'right')
                      ?.field === field,
                })}
                sx={{
                  width: colWidth,
                  minWidth: colMinWidth,
                  ...(headerColor
                    ? { background: `${headerColor} !important` }
                    : {}),
                  zIndex: trIndex === 0 ? 20 : 19,
                  ...(sticky
                    ? {
                        [sticky]:
                          sticky === 'left' ? colStickyLeft : colStickyRight,
                        zIndex: 30,
                      }
                    : {}),
                }}
                {...(column?.columns
                  ? { colSpan: getColSpan(column) }
                  : { rowSpan: depth - trIndex })}
              >
                {sortable ? (
                  <button
                    onClick={() => onClickSort(field)}
                    className={classes.headerNameContainer}
                    style={{ cursor: 'pointer' }}
                  >
                    {renderHeaderContent()}

                    <span
                      className={clsx(classes.sortIcon, {
                        [classes.sortIconAsc]:
                          sorted && order === ORDER_DIRECTION.ASC,
                        [classes.sortIconDesc]:
                          sorted && order === ORDER_DIRECTION.DESC,
                      })}
                    ></span>
                  </button>
                ) : (
                  <Box className={classes.headerNameContainer}>
                    {renderHeaderContent()}
                  </Box>
                )}

                {trIndex === 0 && isTableResizable && resizable !== false && (
                  <Box
                    onMouseDown={() => startResize(field)}
                    ref={columnRefs[field]}
                    className={classes.resizeLine}
                    sx={{
                      height: '100%', // fallback for miscalculation
                      width: RESIZE_LINE_WIDTH,
                    }}
                  />
                )}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </MuiTableHead>
  )
}

export default TableHead
