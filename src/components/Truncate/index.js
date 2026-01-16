import React, { useState } from 'react'

import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import TruncateMarkup from 'react-truncate-markup'

const Truncate = ({
  value,
  lines,
  asterisk,
  onTruncate,
  align = 'left',
  sx,
}) => {
  const [isTruncated, setIsTruncated] = useState(false)
  if (typeof value !== 'string') return value ?? null
  return (
    <TruncateMarkup
      lines={lines}
      onTruncate={(truncated) => {
        setIsTruncated(truncated)
        onTruncate?.(truncated)
      }}
      ellipsis={
        asterisk ? (
          <>
            ...
            <Typography color="error" component="span">
              *
            </Typography>
          </>
        ) : (
          '...'
        )
      }
    >
      <Box
        title={isTruncated ? value : ''}
        sx={{
          wordBreak: 'break-word',
          textAlign: align,
          ...sx,
        }}
      >
        {value}
        {asterisk && (
          <Typography color="error" component="span">
            *
          </Typography>
        )}
      </Box>
    </TruncateMarkup>
  )
}
Truncate.defaultProps = {
  lines: 2,
  asterisk: false,
  sx: {},
}
Truncate.propsTypes = {
  value: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  lines: PropTypes.number,
  asterisk: PropTypes.bool,
  onTruncate: PropTypes.func,
  sx: PropTypes.shape(),
}
export default Truncate
