import React from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'

import EcoSystem from '~/assets/images/home/eco-system.png'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useApp } from '~/common/hooks/useApp'
import { useClasses } from '~/themes'

import { ROUTE } from '../routes/config'
import style from './style'

const HomePage = () => {
  const { canAccess } = useApp()
  const { t } = useTranslation(['home'])
  const classes = useClasses(style)

  if (canAccess(FUNCTION_CODE.DEVICE_STATUS_DASHBOARD)) {
    return <Redirect to={ROUTE.STATUS_DASHBOARD.PATH} />
  }
  return (
    <Box className={classes.root}>
      <Grid
        container
        className={classes.container}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item lg={5} md={8} xs={12}>
          <Box className={classes.intro}>
            <h2>{t('subTitle')}</h2>
            <h1>{t('title')}</h1>
            <Typography>{t('description')}</Typography>
          </Box>
        </Grid>
        <Grid item lg={6} md={8} xs={12}>
          <Box className={classes.ecoSystem}>
            <img src={EcoSystem} alt=""></img>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomePage
