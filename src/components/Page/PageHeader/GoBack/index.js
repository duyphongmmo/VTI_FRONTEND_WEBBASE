import React from 'react'

import { Box } from '@mui/material'
import { PropTypes } from 'prop-types'

import Button from '~/components/Button'
import { useClasses } from '~/themes'

import style from './style'

const GoBack = ({ onBack }) => {
  const classes = useClasses(style)

  return (
    <Box className={classes.root}>
      <Button icon="back" color="grayEE" onClick={onBack} />
    </Box>
  )
}

GoBack.defaultProps = {
  onBack: () => {},
}

GoBack.propTypes = {
  onBack: PropTypes.func,
}

export default GoBack
