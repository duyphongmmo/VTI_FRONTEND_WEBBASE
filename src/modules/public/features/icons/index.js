import React from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { orderBy } from 'lodash'
import { Redirect, useLocation } from 'react-router-dom'

import Icon, { icons } from '~/components/Icon'
import qs from '~/utils/qs'

const Icons = () => {
  const location = useLocation()
  const { mode } = qs.parse(location.search)

  if (mode !== 'dev') {
    return <Redirect to="/" />
  }

  return (
    <Grid container spacing={2} sx={{ p: 1, bgcolor: 'grayEE.main' }}>
      {orderBy(Object.keys(icons)).map((icon) => (
        <Grid item xs={3} md={2}>
          <Box sx={{ textAlign: 'center' }}>
            <Icon name={icon} />
            <Typography>{icon}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default Icons
