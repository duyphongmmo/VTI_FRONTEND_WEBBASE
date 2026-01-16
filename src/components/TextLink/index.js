import React from 'react'

import { Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'

const TextLink = ({ children, ...props }) => {
  return (
    <MuiLink underline="hover" component={Link} {...props}>
      {children}
    </MuiLink>
  )
}
TextLink.defaultProps = {}

TextLink.propTypes = {}

export default TextLink
