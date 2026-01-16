import React from 'react'

import KeyIcon from '@mui/icons-material/Key'
import LogoutIcon from '@mui/icons-material/Logout'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Avatar from '~/components/Avatar'
import Dropdown from '~/components/Dropdown'
import Icon from '~/components/Icon'
import LanguageSwitcher from '~/components/LanguageSwitcher'
import Tour from '~/components/Tour'
import { useAuth } from '~/modules/auth/redux/hooks/useAuth'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { ROUTE } from '~/modules/configuration/routes/config'
import { useClasses } from '~/themes'

import Notification from '../Notification'
import PageSetting from './PageSetting'
import style from './style'

const Toolbar = ({ tours }) => {
  const { t } = useTranslation()
  const history = useHistory()
  const { actions } = useAuth()
  const classes = useClasses(style)
  const {
    data: { userInfo },
  } = useUserInfo()

  const options = [
    {
      label: t('page.userInfo'),
      icon: <Icon name="user" size={18} />,
      onClick: () => history.push(ROUTE.ACCOUNT.DETAIL.PATH),
    },
    {
      label: t('page.changePassword'),
      icon: <KeyIcon fontSize="small" />,
      onClick: () => history.push(ROUTE.ACCOUNT.CHANGE_PASSWORD.PATH),
    },
    {
      label: t('page.logout'),
      icon: <LogoutIcon fontSize="small" />,
      onClick: () => actions.logout(),
    },
  ]

  const renderButtonDropdown = (even) => {
    return (
      <Tooltip title={userInfo?.fullName || userInfo?.username || ''}>
        <IconButton
          sx={{
            width: 40,
            minWidth: 40,
            height: 40,
            borderRadius: '3px',
          }}
          color="grayEE"
          onClick={even.onClick}
        >
          <Avatar
            src=""
            name={userInfo?.fullName || userInfo?.username}
            variant="square"
            sx={{ borderRadius: '3px' }}
          />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Box className={classes.root}>
      {tours && <Tour tours={tours} />}
      <PageSetting />
      <Notification />
      <LanguageSwitcher />
      <Dropdown
        options={options}
        color="grayEE"
        icon="user"
        handleMenuItemClick={(opt) => opt.onClick()}
        sx={{
          width: 40,
          minWidth: 40,
          height: 40,
        }}
        renderButton={(even) => renderButtonDropdown(even)}
      />
    </Box>
  )
}

export default Toolbar
