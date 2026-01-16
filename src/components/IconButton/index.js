import React from 'react'

import { Tooltip } from '@mui/material'
import IconButtonHover from '@mui/material/IconButton'
import { PropTypes } from 'prop-types'

import theme from '~/themes'

const IconButton = ({ title, onClick, children, type, ...props }) => {
  return (
    <Tooltip
      {...(type === 'squareIcon'
        ? {
            sx: {
              width: 40,
              height: 40,
              borderRadius: 0,
              backgroundColor: theme.palette.primary.contrastText,
              ml: 1,
            },
          }
        : {})}
      title={title && <div style={{ fontSize: '14px' }}>{title}</div>}
    >
      <IconButtonHover onClick={onClick} {...props}>
        {children}
      </IconButtonHover>
    </Tooltip>
  )
}
IconButton.defaultProps = {
  title: '',
  onClick: null,
  type: '',
}

IconButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
}

export default IconButton
