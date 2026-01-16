import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom'

import { useApp } from '~/common/hooks/useApp'
import HotKeys from '~/components/HotKeys'
import Sidebar from '~/components/Sidebar'
import { SidebarProvider } from '~/contexts/SidebarContext'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { privateRoutesFlatten } from '~/routes'
import { isAuth } from '~/utils'
import { getCurrentModule } from '~/utils/menu'

const PrivateLayout = ({ children }) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const { canAccess } = useApp()
  const { path } = useRouteMatch()

  const {
    data: { userInfo },
  } = useUserInfo()
  const currentModule = getCurrentModule(pathname) || 'general'

  const { t } = useTranslation([currentModule])

  const title = 'DKT'

  if (!isAuth()) {
    return <Redirect to="/login" />
  }

  const hotKeysHandlers = {
    goToHomePage: () => {
      if (['mesx', 'wmsx', 'mmsx', 'qmsx', 'pmsx'].includes(currentModule)) {
        history.push(`/${currentModule}`)
      } else {
        history.push('/')
      }
    },
    toggleNotification: () => {
      document.querySelector('[hotkey="global_toggleNotification"]')?.click()
    },
    toggleFilter: () => {
      document.querySelector('[hotkey="global_toggleFilter"]')?.click()
    },
  }

  const code = privateRoutesFlatten.find((r) => r?.path === path)?.code

  const name = privateRoutesFlatten.find((r) => r?.path === path)?.name

  useEffect(() => {
    if (name) {
      document.title =  `${title} - ${t(`menu.${name}`)}`
    } else {
      document.title = title
    }
    return () => {
      document.title = title
    }
  }, [path])

  if (!canAccess(code) && !!userInfo?.userPermissions) {
    return <Redirect to="/" />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
        flexDirection: 'column'
      }}
    >
      <HotKeys handlers={hotKeysHandlers} />
      <SidebarProvider>
        <Sidebar />
        <Box sx={{ flex: 1, overflow: 'hidden' }}>{children}</Box>
      </SidebarProvider>
    </Box>
  )
}

PrivateLayout.defaultProps = {
  children: null,
}

PrivateLayout.propTypes = {
  children: PropTypes.node,
}

export default PrivateLayout
