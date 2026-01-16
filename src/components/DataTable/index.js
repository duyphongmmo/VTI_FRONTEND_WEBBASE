import React, { useMemo } from 'react'

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import { Box, IconButton } from '@mui/material'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { useTable } from '~/common/hooks/useTable'
import Checkbox from '~/components/Checkbox'
import {
  TableProvider,
  DEFAULT_MIN_COLUMN_WIDTH,
} from '~/contexts/TableContext'
import { useClasses } from '~/themes'

import Truncate from '../Truncate'
import Pagination from './Pagination'
import TableBody from './TableBody'
import TableHead from './TableHead'
import TableRow from './TableRow'
import TopBar from './TopBar'
import style from './style'

/**
 * Data Table
 */
const DataTable = () => {
  const { t } = useTranslation()
  const {
    rows,
    visibleColumns,
    maxHeight,
    selected,
    onSelectionChange,
    rowSpanMatrix,
    rowGrayMatrix,
    containerRef,
    uniqKey,
    isTableResizable,
    checkboxSelection,
    reorderable,
    isVisible,
    highlights,
    selectSingle,
    striped,
    selectionByColumn,
    maxTdLines,
    onClickedRow,
    noBorder,
    footerColumns,
    footerColors,
    hover,
    onToggle,
    keyRow,
  } = useTable()
  const classes = useClasses(style, noBorder)

  /**
   * Handle select or deselect row
   * @param {*} indexValue
   * @returns
   */
  const handleSelectOrDeselectRow = (indexValue) => {
    if (!checkboxSelection) return
    const selectedIndex = selected.findIndex(
      (item) => item[uniqKey] === indexValue,
    )
    let newSelected = []

    const newValueData = rows.find((item) => item[uniqKey] === indexValue)

    if (selectSingle) {
      if (selected?.[0]?.[uniqKey] === indexValue) {
        newSelected = []
      } else {
        newSelected = [newValueData]
      }

      onSelectionChange(newSelected)
      return
    }

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, newValueData)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    onSelectionChange(newSelected)
  }

  /**
   * Check if row is selected
   * @param {*} uniqKeyValue
   * @returns
   */
  const isSelected = (uniqKeyValue) => {
    return selected.findIndex((item) => item[uniqKey] === uniqKeyValue) !== -1
  }

  const getColumnsInBottomTree = (cols = []) => {
    const childCols = cols?.reduce((acc, cur) => {
      if (
        Array.isArray(cur?.columns) &&
        cur?.columns?.some((c) => isVisible(c))
      ) {
        return [...acc, ...cur?.columns?.filter((c) => isVisible(c))]
      }
      return [...acc, cur]
    }, [])

    if (childCols?.some((x) => x?.columns)) {
      return getColumnsInBottomTree(childCols)
    }

    return childCols
  }

  const bodyColumns = useMemo(
    () => getColumnsInBottomTree(visibleColumns),
    [visibleColumns],
  )

  const visibleFooterColumns = useMemo(() => {
    if (!isEmpty(footerColumns)) {
      return footerColumns?.map((footerCol) =>
        visibleColumns?.map((vc) =>
          footerCol?.find((col) => col?.field === vc?.field),
        ),
      )
    }
  }, [visibleColumns])

  const hasStickyCol = useMemo(
    () => visibleColumns.some((c) => c?.sticky),
    [visibleColumns],
  )

  const visibleRows = useMemo(
    () => rows.filter((r) => !r?.rowInvisible),
    [rows],
  )

  return (
    <>
      <TopBar />

      <TableContainer
        ref={containerRef}
        className={classes.tableContainer}
        sx={{
          // maxHeight: maxHeight || 'calc(100vh - 160px)',
          maxHeight: maxHeight,

          '.MuiDialog-container &': {
            maxHeight: maxHeight || 'calc(100vh - 280px)',
          },
        }}
      >
        <Table
          stickyHeader
          className={classes.table}
          sx={
            isTableResizable || hasStickyCol
              ? { tableLayout: 'fixed', width: '100%' }
              : {}
          }
        >
          <TableHead />

          <TableBody>
            {visibleRows?.length > 0 &&
              visibleRows.map((row = {}, index) => {
                const isItemSelected = isSelected(row[uniqKey])
                const key = keyRow === true ? index : row?.[keyRow]
                const isExpanded = visibleRows.some(
                  (r) => r?.rowParentId === row[uniqKey],
                )

                return (
                  <TableRow
                    key={key || row[uniqKey] || index}
                    draggableId={row[uniqKey]?.toString()}
                    index={index}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    className={clsx(
                      classes.tableRow,
                      classes.tableRowBorderGrid,
                      {
                        [classes.tableRowStriped]: striped && !rowGrayMatrix,
                        // [classes.tableRowBorder]: !striped,
                        [classes.tableRowHover]:
                          hover && !rowGrayMatrix?.length,
                        [classes.tableRowGray]: rowGrayMatrix?.[index],
                        tableRowExpandable: row.rowExpandable,
                      },
                    )}
                    classes={classes}
                    {...(onClickedRow
                      ? {
                          onClick: () => onClickedRow(row),
                        }
                      : {})}
                  >
                    {checkboxSelection &&
                      (() => {
                        const rowSpan =
                          rowSpanMatrix?.[index]?.[selectionByColumn]

                        if (rowSpan === -1) return null // remove td

                        return (
                          <TableCell
                            className={clsx(
                              classes.tableCell,
                              classes.tableCellCheckbox,
                              {
                                [classes.tableCellHighlight]:
                                  highlights?.includes(row[uniqKey]),
                              },
                            )}
                            sx={{
                              position: 'sticky',
                              left: reorderable ? 50 : 0,
                              zIndex: 10,
                            }}
                            {...(rowSpan > 1 ? { rowSpan } : {})}
                          >
                            <Checkbox
                              checked={isItemSelected}
                              onChange={() =>
                                handleSelectOrDeselectRow(row[uniqKey])
                              }
                            />
                          </TableCell>
                        )
                      })()}
                    {bodyColumns.map((column, i) => {
                      const {
                        field,
                        align,
                        renderCell,
                        width,
                        minWidth,
                        cellStyle = {},
                        sticky,
                      } = column
                      const cellValue = renderCell
                        ? renderCell({ row }, index)
                        : row[field]

                      let colWidth = width || minWidth
                      let colMinWidth =
                        minWidth || width || DEFAULT_MIN_COLUMN_WIDTH
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

                      const rowSpan = rowSpanMatrix?.[index]?.[i]

                      if (rowSpan === -1) return null // remove td

                      return (
                        <TableCell
                          className={clsx(classes.tableCell, {
                            [classes[`tableCellAlign${align}`]]: align,

                            [classes.firstStickyRight]:
                              sticky === 'right' &&
                              visibleColumns?.find((s) => s?.sticky === 'right')
                                ?.field === field,
                            [classes.tableCellHighlight]: highlights?.includes(
                              row[uniqKey],
                            ),
                            [classes.tableCellBold]: row.rowExpandable,
                          })}
                          key={`data-table-${field}-${i}`}
                          id={`data-table-${field}-${i}`}
                          sx={{
                            width: colWidth,
                            minWidth: colMinWidth,
                            verticalAlign: 'middle',
                            ...(sticky
                              ? {
                                  position: 'sticky',
                                  [sticky]:
                                    sticky === 'left'
                                      ? colStickyLeft
                                      : colStickyRight,
                                  zIndex: 10,
                                }
                              : {}),
                            ...cellStyle,
                          }}
                          {...(rowSpan > 1 ? { rowSpan } : {})}
                        >
                          {i === 0 &&
                          row.rowExpandable &&
                          typeof onToggle === 'function' ? (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                pl: `${(row.rowIndent || 0) * 28}px`,
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() => onToggle?.(row, !isExpanded)}
                                sx={{
                                  marginLeft: '-5px',
                                }}
                              >
                                {isExpanded ? (
                                  <IndeterminateCheckBoxOutlinedIcon />
                                ) : (
                                  <AddBoxOutlinedIcon />
                                )}
                              </IconButton>

                              <Truncate
                                value={cellValue}
                                lines={maxTdLines}
                                align={align}
                              />
                            </Box>
                          ) : (
                            <Truncate
                              value={cellValue}
                              lines={maxTdLines}
                              align={align}
                            />
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            {rows?.length > 0 &&
              !isEmpty(visibleFooterColumns) &&
              visibleFooterColumns?.map((column, columnIndex) => (
                <TableRow
                  className={clsx(classes.tableRow, classes.tableRowBorderGrid)}
                  classes={classes}
                >
                  {checkboxSelection && <TableCell />}
                  {column
                    ?.filter((c) => !c?.visible)
                    ?.map((column, i) => {
                      const {
                        field,
                        align,
                        renderCell,
                        width,
                        minWidth,
                        cellStyle = {},
                        sticky,
                        noColor,
                        colSpan = 1,
                      } = column
                      const cellValue = renderCell
                        ? renderCell(
                            { ...footerColumns[columnIndex] },
                            columnIndex,
                            rows,
                          )
                        : footerColumns[columnIndex][field]

                      let colWidth = width || minWidth
                      let colMinWidth =
                        minWidth || width || DEFAULT_MIN_COLUMN_WIDTH
                      let colStickyLeft = reorderable ? 50 : 0
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

                      if (colSpan === -1) {
                        return null
                      }
                      return (
                        <TableCell
                          className={clsx(classes.tableCell, {
                            [classes[`tableCellAlign${align}`]]: align,

                            [classes.firstStickyRight]:
                              sticky === 'right' &&
                              visibleColumns?.find((s) => s?.sticky === 'right')
                                ?.field === field,
                          })}
                          key={`data-table-${field}-${i}`}
                          id={`data-table-${field}-${i}`}
                          colSpan={colSpan}
                          sx={{
                            width: colWidth,
                            minWidth: colMinWidth,
                            verticalAlign: 'middle',
                            ...(sticky
                              ? {
                                  position: 'sticky',
                                  [sticky]:
                                    sticky === 'left'
                                      ? colStickyLeft
                                      : colStickyRight,
                                  zIndex: 10,
                                }
                              : {}),
                            ...cellStyle,
                            ...(noColor
                              ? {}
                              : {
                                  backgroundColor: `${footerColors[columnIndex]} !important`,
                                }),
                          }}
                        >
                          <Truncate
                            value={cellValue}
                            lines={maxTdLines}
                            align={align}
                          />
                        </TableCell>
                      )
                    })}
                </TableRow>
              ))}

            {!visibleRows?.length && (
              <TableRow>
                <TableCell
                  className={classes.tableCell}
                  colSpan={visibleColumns.length + (checkboxSelection ? 1 : 0)}
                  sx={(theme) => ({
                    textAlign: 'center !important',
                    color: theme.palette.subText.main,
                  })}
                >
                  {t('dataTable.noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination />
    </>
  )
}

export default (props) => (
  <TableProvider {...props}>
    <DataTable />
  </TableProvider>
)
