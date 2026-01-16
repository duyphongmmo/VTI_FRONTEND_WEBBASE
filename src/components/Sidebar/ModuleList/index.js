import React from 'react'

import {
  Typography,
  ListItemButton,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { useApp } from '~/common/hooks/useApp'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { appRoutesObj } from '~/routes'
import { useClasses } from '~/themes'
import { getCurrentModule, getFirstAccessibleMenuPath } from '~/utils/menu'

import MainMenu from '../MainMenu'
import modules from './config'
import style from './style'

const ModuleList = () => {
  const { pathname } = useLocation()
  // const { isMinimal, isOpenModuleList, setIsOpenModuleList } = useSidebar()
  const { t } = useTranslation(['general'])
  const classes = useClasses(style)
  // const theme = useTheme()
  const { canAccess } = useApp()

  const {
    data: { userInfo },
  } = useUserInfo()

  const currentModule = getCurrentModule(pathname)
  const currentModuleConfig =
    modules.find((m) => m.path === currentModule) || modules[0]

  const getTitle = (m) =>
    typeof m?.title === 'function' ? m.title(t) : m.title

  // const getIcon = (m) => {
  //   const iconSrc = isMinimal ? m?.icon2 : m?.icon

  //   if (!iconSrc) return null
  //   return (
  //     <ListItemIcon
  //       sx={{
  //         width: 32,
  //         minWidth: 32,
  //         justifyContent: 'center',
  //         mr: 1,
  //       }}
  //     >
  //       <img src={iconSrc} alt="" />
  //     </ListItemIcon>
  //   )
  // }

  return (
    <>
      <ListItemButton
        component={Link}
        to={`/${getFirstAccessibleMenuPath({
          routes: currentModuleConfig?.routes,
          userInfo,
        })}`.replace(/\/\//g, '/')}
        className={classes.currentModule}
        sx={{
          transition: 'all .2s ease',
          pl: 1,
        }}
      >
        {currentModuleConfig.icon && (
          <img src={currentModuleConfig.icon} alt="" />
        )}

        { currentModuleConfig.title && (
          <Typography noWrap variant="h3" sx={{ color: '#fff', ml: 1 }}>
            {getTitle(currentModuleConfig)}
          </Typography>
        )}
      </ListItemButton>

      {/* {(currentModule || isMinimal) && (
        <IconButton
          sx={{
            position: 'absolute',
            top: 12,
            right: 4,
            zIndex: 2,
            color: '#fff',
            '>*': { pointerEvents: 'none' },
            '&:hover': {
              backgroundColor: theme.palette.sidebar.active,
            },
            ...(isMinimal
              ? {
                  top: 0,
                  right: 0,
                  p: 0,
                  borderRadius: 0,
                  height: 64,
                }
              : {}),
            ...(!isMinimal && isOpenModuleList
              ? {
                  '.MuiSvgIcon-root': {
                    transform: 'rotate(90deg)',
                  },
                }
              : {}),
          }}
          onClick={() => {
            setIsOpenModuleList((o) => !o)
          }}
        >
          <ArrowRightIcon sx={{ transition: 'all .2s ease' }} />
        </IconButton>
      )}

      {(isOpenModuleList || (!isMinimal && !currentModule)) && (
        <List
          component="div"
          className={clsx(classes.moduleList, {
            [classes.moduleListOutside]: isMinimal,
            [classes.moduleListInside]: !isMinimal,
          })}
        >
          {displayedModules.map((item, index) => (
            <ListItemButton
              disabled={!item?.path}
              component={Link}
              to={
                item?.routes
                  ? getFirstAccessibleMenuPath({
                      routes: item?.routes,
                      userInfo,
                    })
                  : `/${item.path}`.replace(/\/\//g, '/')
              }
              key={index}
              className={clsx(classes.listItemButton, {
                [classes.listItemButtonOutside]: isMinimal,
                [classes.listItemButtonInside]: !isMinimal,
                active:
                  currentModule === item.path ||
                  (!currentModule && item.path === '/'),
              })}
            >
              {getIcon(item)}

              <ListItemText
                primary={
                  <Typography noWrap variant="h3">
                    {getTitle(item)}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </List>
      )}

      {isOpenModuleList && isMinimal && (
        <Box
          className={classes.backdrop}
          onClick={() => setIsOpenModuleList(false)}
        />
      )} */}
      <MainMenu
        routes={appRoutesObj.all?.filter(
          (item) => item?.isInSidebar && canAccess(item?.code),
        )}
        currentModule={currentModule}
      />
    </>
  )
}

export default ModuleList
