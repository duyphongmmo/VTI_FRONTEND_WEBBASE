import React from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Pagination as MuiPagination,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import { useTable } from '~/common/hooks/useTable'
import HotKeys from '~/components/HotKeys'

/**
 * Pagination component
 */
const Pagination = (props) => {
  const { t } = useTranslation()
  let _total,
    pageSize,
    page,
    onPageChange,
    onPageSizeChange,
    hideFooter,
    hidePageSize

  const {
    total: total_,
    pageSize: pageSize_,
    page: page_,
    onPageChange: onPageChange_,
    onPageSizeChange: onPageSizeChange_,
    hideFooter: hideFooter_,
    hidePageSize: hidePageSize_,
  } = useTable()

  if (props?.isAgGrid) {
    const {
      total: total_,
      pageSize: pageSize_,
      page: page_,
      onPageChange: onPageChange_,
      onPageSizeChange: onPageSizeChange_,
      hideFooter: hideFooter_,
      hidePageSize: hidePageSize_,
    } = props || {}
    _total = total_
    pageSize = pageSize_
    page = page_
    onPageChange = onPageChange_
    onPageSizeChange = onPageSizeChange_
    hideFooter = hideFooter_
    hidePageSize = hidePageSize_
  } else {
    _total = total_
    pageSize = pageSize_
    page = page_
    onPageChange = onPageChange_
    onPageSizeChange = onPageSizeChange_
    hideFooter = hideFooter_
    hidePageSize = hidePageSize_
  }

  const total = parseInt(_total) || 0
  const pageSizeOptions = ROWS_PER_PAGE_OPTIONS
  const numberOfPages = Math.ceil(total / pageSize) || 1
  const start = total ? pageSize * (page - 1) + 1 : 0
  const end = total ? Math.min(pageSize * page, total) : 0

  if (hideFooter) return null
  if (total < 0) return null

  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        gap: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      {!hidePageSize && (
        <Select
          displayEmpty
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(e.target.value)
          }}
          variant="standard"
          autoWidth
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(val) => (
            <Box>
              <Typography component="span" variant="body2" sx={{ mr: 1 }}>
                {t('pagination.rowsPerPage')}
              </Typography>
              <Typography component="span">{val}</Typography>
            </Box>
          )}
          sx={{
            '&:before, &:after': { display: 'none' },
            '.MuiSelect-select': {
              bgcolor: 'grayF4.main',
              p: '2px 20px 2px 8px !important',
              borderRadius: 1,
            },
            '.MuiSelect-icon': {
              top: 4,
              right: 4,
              width: 18,
              height: 18,
              color: 'subText.main',
            },
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          }}
        >
          {pageSizeOptions.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      )}
      <HotKeys
        handlers={{
          onNextPage: () => {
            if (page < numberOfPages) onPageChange(page + 1)
          },
          onPrevPage: () => {
            if (page > 1) onPageChange(page - 1)
          },
        }}
      />
      <Box sx={{ ml: 'auto' }}>
        {t('pagination.startEndRows', { start, end, rows: total ?? 0 })}
      </Box>
      <MuiPagination
        count={numberOfPages}
        page={page}
        onChange={(_, newPage) => onPageChange(newPage)}
        variant="outlined"
        shape="rounded"
        sx={{
          '.MuiPagination-ul': {
            m: '-4px',
          },
          '.MuiPaginationItem-root': {
            borderColor: 'grayF4.main',
            bgcolor: 'transparent',
            transition: 'all .3s ease',
            m: '4px',

            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'transparent',
            },
          },
          '.MuiPaginationItem-root.Mui-selected': {
            borderColor: 'primary.main',
            bgcolor: 'transparent',
            color: 'primary.main',
            fontWeight: 700,
          },
          '.MuiPaginationItem-root.Mui-disabled': {
            opacity: 1,
            bgcolor: 'grayF4.main',
            color: 'subText.a5',
          },
        }}
      />
    </Box>
  )
}

export default Pagination
