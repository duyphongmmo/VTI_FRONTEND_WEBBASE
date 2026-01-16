import React, { Fragment, memo, useCallback, useEffect, useMemo } from 'react'

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import { Box, Table, TableCell, TableContainer } from '@mui/material'
import clsx from 'clsx'
import { TableVirtuoso } from 'react-virtuoso'

import { useTable } from '~/common/hooks/useTable'
import Checkbox from '~/components/Checkbox'
import IconButton from '~/components/IconButton'
import Truncate from '~/components/Truncate'
import {
  DEFAULT_MIN_COLUMN_WIDTH,
  TableProvider,
} from '~/contexts/TableContext'
import theme, { useClasses } from '~/themes'

import Pagination from '../Pagination'
import TableHead from '../TableHead'
import TableRow from '../TableRow'
import TopBar from '../TopBar'
import style from '../style'

/**
 * Data Table
 */

const DataTable = () => {
  // const { t } = useTranslation()
  const {
    rows,
    visibleColumns,
    maxHeight,
    selected,
    onSelectionChange,
    rowSpanMatrix,
    // rowGrayMatrix,
    containerRef,
    uniqKey,
    isTableResizable,
    checkboxSelection,
    reorderable,
    isVisible,
    highlights,
    selectSingle,
    // striped,
    selectionByColumn,
    maxTdLines,
    // onClickedRow,
    noBorder,
    // footerColumns,
    // footerColors,
    // hover,
    onToggle,
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

  // const visibleFooterColumns = useMemo(() => {
  //   if (!isEmpty(footerColumns)) {
  //     return footerColumns?.map((footerCol) =>
  //       visibleColumns?.map((vc) =>
  //         footerCol?.find((col) => col?.field === vc?.field),
  //       ),
  //     )
  //   }
  // }, [visibleColumns])

  const hasStickyCol = useMemo(
    () => visibleColumns.some((c) => c?.sticky),
    [visibleColumns],
  )
  const visibleRows = useMemo(
    () => rows.filter((r) => !r?.rowInvisible),
    [rows?.length],
  )
  // const TableComponents = {
  //   Table: (props) => {
  //     return (
  //       <TableContainer
  //         ref={containerRef}
  //         className={classes.tableContainer}
  //         sx={{
  //           // maxHeight: maxHeight || 'calc(100vh - 160px)',
  //           maxHeight: maxHeight,

  //           '.MuiDialog-container &': {
  //             maxHeight: maxHeight || 'calc(100vh - 280px)',
  //           },
  //         }}
  //       >
  //         <Table
  //           {...props}
  //           stickyHeader
  //           className={classes.table}
  //           sx={
  //             isTableResizable || hasStickyCol
  //               ? { tableLayout: 'fixed', width: '100%' }
  //               : {}
  //           }
  //         />
  //       </TableContainer>
  //     )
  //   },
  //   TableHead: TableHead,
  //   TableRow: (props) => {
  //     return (
  //       <TableRow
  //         {...props}
  //         className={clsx(classes.tableRow, classes.tableRowBorderGrid, {
  //           [classes.tableRowStriped]: striped && !rowGrayMatrix,
  //           // [classes.tableRowBorder]: !striped,
  //           [classes.tableRowHover]: hover && !rowGrayMatrix?.length,
  //         })}
  //         classes={classes}
  //         {...(onClickedRow
  //           ? {
  //               onClick: () => onClickedRow(props?.item),
  //             }
  //           : {})}
  //       />
  //     )
  //   },
  //   TableBody: React.forwardRef((props, ref) => (
  //     <TableBody {...props} ref={ref} />
  //   )),
  // }

  const renderContent = useCallback(
    (index, row) => {
      // if (isEmpty(visibleRows)) {
      //   return (
      //     <TableCell
      //       // className={classes.tableCell}
      //       className={clsx(
      //         classes.tableCell,
      //         classes.tableRow,
      //         classes.tableRowBorderGrid,
      //         {
      //           [classes.tableRowStriped]: striped && !rowGrayMatrix,
      //           [classes.tableRowBorder]: !striped,
      //           [classes.tableRowHover]: hover && !rowGrayMatrix?.length,
      //         },
      //       )}
      //       classes={classes}
      //       colSpan={visibleColumns.length + (checkboxSelection ? 1 : 0)}
      //       sx={(theme) => ({
      //         textAlign: 'center !important',
      //         color: theme.palette.subText.main,
      //         ...(isTableResizable || hasStickyCol
      //           ? { tableLayout: 'fixed', width: '100%' }
      //           : {}),
      //       })}
      //     >
      //       {t('dataTable.noData')}
      //     </TableCell>
      //   )
      // }
      const isItemSelected = isSelected(row[uniqKey])
      const isExpanded = visibleRows.some(
        (r) => r?.rowParentId === row[uniqKey],
      )
      return (
        <Fragment key={row?.id}>
          {checkboxSelection &&
            (() => {
              const rowSpan = rowSpanMatrix?.[index]?.[selectionByColumn]

              if (rowSpan === -1) return null // remove td

              return (
                <TableCell
                  className={clsx(
                    classes.tableCell,
                    classes.tableCellCheckbox,
                    classes.tableRow,
                    classes.tableRowBorderGrid,
                    {
                      [classes.tableCellHighlight]: highlights?.includes(
                        row[uniqKey],
                      ),
                    },
                  )}
                  key={`data-check-box-${row?.id}`}
                  sx={{
                    position: 'sticky',
                    left: reorderable ? 50 : 0,
                    zIndex: 10,
                    verticalAlign: 'middle',
                  }}
                  {...(rowSpan > 1 ? { rowSpan } : {})}
                >
                  <Checkbox
                    checked={isItemSelected}
                    onChange={() => handleSelectOrDeselectRow(row[uniqKey])}
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
            let colMinWidth = minWidth || width || DEFAULT_MIN_COLUMN_WIDTH
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
                className={clsx(
                  classes.tableCell,
                  classes.tableRow,
                  classes.tableRowBorderGrid,
                  {
                    [classes[`tableCellAlign${align}`]]: align,

                    [classes.firstStickyRight]:
                      sticky === 'right' &&
                      visibleColumns?.find((s) => s?.sticky === 'right')
                        ?.field === field,
                    [classes.tableCellHighlight]: highlights?.includes(
                      row[uniqKey],
                    ),
                    [classes.tableCellBold]: row.rowExpandable,
                  },
                )}
                key={`data-table-${field}-${row?.id}`}
                id={`data-table-${field}-${row?.id}`}
                sx={{
                  width: colWidth,
                  minWidth: colMinWidth,
                  verticalAlign: 'middle !important',
                  color: theme.palette.text.primary,
                  ...(sticky
                    ? {
                        position: 'sticky',
                        [sticky]:
                          sticky === 'left' ? colStickyLeft : colStickyRight,
                        zIndex: 10,
                      }
                    : {}),
                  ...cellStyle,
                  ...(noBorder
                    ? {}
                    : {
                        borderRight: `1px solid ${theme.palette.grayF4.main}`,
                        borderBottom: `1px solid ${theme.palette.grayF4.main}`,
                        borderLeft: 'none',
                        borderTop: 'none',
                      }),
                  ...(noBorder
                    ? {}
                    : { borderBottomColor: theme.palette.grayF4.main }),
                }}
                // {...(rowSpan > 1 ? { rowSpan } : {})}
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
        </Fragment>
      )
    },
    [rows?.length, bodyColumns],
  )

  const TableWrapper = useCallback((props) => {
    return (
      <Table
        {...props}
        stickyHeader
        className={classes.table}
        sx={
          isTableResizable || hasStickyCol
            ? { tableLayout: 'fixed', width: '100%' }
            : {}
        }
        key="table"
      />
    )
  }, [])
  useEffect(() => {
    //set height table TableVirtuoso
    if (!containerRef.current) return
    const tableRef = containerRef.current.querySelector('table')
    const containerTableRef = containerRef.current.querySelector(
      'div[data-testid="virtuoso-scroller"]',
    )
    if (!tableRef || !containerTableRef) return
    const updateHeight = () => {
      const heightTable = tableRef.offsetHeight || 0
      if (!heightTable) return
      containerTableRef.style.height = `${heightTable + 10}px`
    }
    const observer = new ResizeObserver(updateHeight)
    observer.observe(tableRef)
    updateHeight()
    return () => observer.disconnect()
  }, [])
  return (
    <>
      <TopBar />
      <TableContainer
        ref={containerRef}
        className={classes.tableContainer}
        sx={{
          // maxHeight: maxHeight || 'calc(100vh - 160px)',
          maxHeight: maxHeight,
          ...(isTableResizable || hasStickyCol
            ? { tableLayout: 'fixed', width: '100%' }
            : {}),
          '.MuiDialog-container &': {
            maxHeight: 'calc(100vh - 200px)',
          },
        }}
      >
        <TableVirtuoso
          id="table-virtuoso"
          style={{
            height: 100,
            maxHeight: 700,
            ...(isTableResizable || hasStickyCol
              ? { tableLayout: 'fixed', width: '100%' }
              : {}),
          }}
          data={visibleRows}
          components={{
            Table: TableWrapper,
            TableHead: TableHead,
          }}
          fixedHeaderContent={() => (
            <TableRow>
              {visibleColumns?.map((col) => (
                <TableCell key={`data-header-${col?.field}`}>
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          )}
          itemContent={renderContent}
        />
      </TableContainer>
      <Pagination />
    </>
  )
}

export default memo(
  (props) => (
    <TableProvider {...props}>
      <DataTable />
    </TableProvider>
  ),
  () => false,
)
