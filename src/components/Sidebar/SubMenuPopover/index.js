import React from 'react'

import { Popover } from '@mui/material'
import { PropTypes } from 'prop-types'

import { useClasses } from '~/themes'

import style from './style'

const SubMenuPopover = ({
  open,
  anchorEl,
  handlePopoverOpen,
  handlePopoverClose,
  children,
}) => {
  const classes = useClasses(style)

  return (
    <Popover
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      PaperProps={{
        onMouseEnter: handlePopoverOpen,
        onMouseLeave: handlePopoverClose,
      }}
      transitionDuration={0}
    >
      {children}
    </Popover>
  )
}

SubMenuPopover.defaultProps = {
  children: null,
}

SubMenuPopover.propTypes = {
  open: PropTypes.bool,
  handlePopoverOpen: PropTypes.func,
  handlePopoverClose: PropTypes.func,
  anchorEl: PropTypes.node,
  children: PropTypes.node,
}

export default SubMenuPopover
