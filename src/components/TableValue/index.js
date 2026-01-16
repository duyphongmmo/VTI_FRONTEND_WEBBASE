import React from 'react'

import { Box, Tooltip } from '@mui/material'
import { useTheme } from '@mui/styles'
import { PropTypes } from 'prop-types'

const TableValue = ({ value, tooltip, sx, ...props }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        wordBreak: 'break-word',
        ...sx,
        ...(tooltip
          ? {
              cursor: 'pointer',
              color: theme.palette.error.main,
            }
          : {}),
      }}
      {...props}
    >
      {tooltip ? (
        <Tooltip title={tooltip} placement="bottom" arrow>
          <Box sx={{ flex: 1, minWidth: 0, whiteSpace: 'pre-wrap' }}>
            {value}
          </Box>
        </Tooltip>
      ) : (
        value
      )}
    </Box>
  )
}

TableValue.defaultProps = {
  value: null,
  tooltip: null,
  sx: {},
}

TableValue.propTypes = {
  value: PropTypes.node,
  tooltip: PropTypes.node,
  sx: PropTypes.shape(),
}

export default TableValue
