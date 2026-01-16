import React from 'react'

import { Typography, Box } from '@mui/material'
import { useTheme } from '@mui/styles'
import { PropTypes } from 'prop-types'

import { DEFAULT_LABEL_WIDTH } from '~/common/constants'

const LabelValue = ({
  label,
  value,
  children,
  sx,
  labelWidth,
  highlight,
  directionColumn,
  ...props
}) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        wordBreak: 'break-word',
        ...(directionColumn ? { flexDirection: 'column' } : {}),
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          ...(directionColumn
            ? { mb: 1 }
            : {
                flex:
                  typeof labelWidth === 'string'
                    ? `0 0 ${labelWidth}`
                    : `0 0 ${labelWidth}px`,
              }),
          mr: 2,
        }}
      >
        {typeof label === 'string' ? (
          <Typography
            variant="body2"
            {...(highlight
              ? { sx: { color: theme.palette.error.main, fontWeight: 'bold' } }
              : {})}
          >
            {label}
          </Typography>
        ) : (
          label
        )}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, whiteSpace: 'pre-wrap' }}>
        {children ? (
          children
        ) : typeof value === 'string' ? (
          <Typography
            {...(highlight
              ? { sx: { color: theme.palette.error.main, fontWeight: 'bold' } }
              : {})}
          >
            {value}
          </Typography>
        ) : (
          value
        )}
      </Box>
    </Box>
  )
}

LabelValue.defaultProps = {
  label: null,
  value: null,
  children: null,
  sx: {},
  labelWidth: DEFAULT_LABEL_WIDTH,
}

LabelValue.propTypes = {
  label: PropTypes.node,
  value: PropTypes.node,
  children: PropTypes.node,
  sx: PropTypes.shape(),
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default LabelValue
