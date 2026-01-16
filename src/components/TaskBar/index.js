import React from 'react'

import { Divider, Stack } from '@mui/material'
import { PropTypes } from 'prop-types'

const TaskBar = ({ children, sx }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      divider={
        <Divider
          orientation="vertical"
          sx={{
            borderColor: '#CBCBCB',
            height: 24,
            '&:first-child,&:last-child, &+.MuiDivider-root': {
              display: 'none',
            },
          }}
        />
      }
      sx={{
        mx: -1,
        mt: -1,
        mb: 1,
        bgcolor: 'bg.taskbar',
        ...sx,
        '&:empty, >:empty': {
          display: 'none',
        },
      }}
      className="x-taskbar"
    >
      {children}
    </Stack>
  )
}

TaskBar.defaultProps = {
  children: null,
  sx: {},
}

TaskBar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.shape(),
}

export default TaskBar
