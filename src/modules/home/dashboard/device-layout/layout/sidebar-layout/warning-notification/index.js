import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import io from 'socket.io-client'

import { SOCKET_EVENTS } from '~/common/constants/socket'
import useDeviceDashboard from '~/modules/configuration/redux/hooks/useDeviceDashboard'

import WarningList from './warning-list'

const host = process.env.REACT_APP_SOCKET_HOST

const WarningNotification = () => {
  const { t } = useTranslation(['home'])
  const { actions } = useDeviceDashboard()
  useEffect(() => {
    const notiSck = io(`${host}/notifications`, {
      transports: ['websocket'],
    })

    notiSck.connect()

    const receivingEvent = `${SOCKET_EVENTS.PREFIX_CHANNEL_MMS_WARNING}`
    notiSck.on(receivingEvent, (res) => {
      if (res?.device) {
        actions.addWarning(res)
      }
    })

    return () => {
      notiSck?.disconnect()
    }
  }, [])

  return (
    <Box sx={{ pl: 1, pt: 0.5, height: '100%' }}>
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'left',
        }}
      >
        {t('dashboard.warning')}
      </Typography>

      <WarningList />
    </Box>
  )
}

export default WarningNotification
