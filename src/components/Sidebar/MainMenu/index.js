import React, { useState, useEffect, useRef, useMemo } from 'react'

import ExpandMore from '@mui/icons-material/ExpandMore'
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined'
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

import { useSidebar } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Icon from '~/components/Icon'

import ListMenuStyled from './style'
import { TextDisplay } from './text'

const MainMenu = ({ routes = [] }) => {
  const [open, setOpen] = useState()
  const {
    isMinimal,
    getVisibleSubMenu,
    isActive,
    isActiveChildren,
    setIsOpenModuleList,
  } = useSidebar()
  const { canAccess } = useApp()

  const isOpen = (index, subs) =>
    open === index || (open === undefined && isActiveChildren(subs))

  const toggle = (index, subs) => {
    if (isEmpty(subs)) return

    setOpen(isOpen(index, subs) ? null : index)
  }

  // const [hoveredMenu, setHoveredMenu] = useState('')
  const popoverAnchor = useRef([])

  useEffect(() => {
    popoverAnchor.current = popoverAnchor.current.slice(0, routes.length)
  }, [routes])

  const visibleMenus = useMemo(
    () =>
      routes.filter((r) => {
        if (!r?.subMenu?.length || !r?.subMenu?.some((s) => s?.isInSidebar)) {
          return canAccess(r?.code)
        }
        return (
          (r?.code && canAccess(r?.code)) ||
          r?.subMenu?.some((s) => s?.isInSidebar && canAccess(s?.code))
        )
      }),
    [routes],
  )

  return (
    <ListMenuStyled component="div" sx={{display:'flex'}}>
      {visibleMenus.map((route, index) => {
        const visibleSubMenu = getVisibleSubMenu(route)
        return (
          <React.Fragment key={index}>
            <ListItemButton
              ref={(el) => (popoverAnchor.current[index] = el)}
              {...(route.path ? { component: Link, to: route.path } : {})}
              {...(isMinimal
                ? {
                    onMouseOver: () => {
                      setIsOpenModuleList(false)
                      // setHoveredMenu(route.name)
                    },
                    // onMouseOut: () => setHoveredMenu(''),
                  }
                : {
                    onClick: () => toggle(index, visibleSubMenu),
                  })}
              sx={{
                mt: '4px',
                py: '7px',
                pl: '10px',
                pr: '4px',
                minHeight: 44,
                transition: 'all .2s ease',
                // maxWidth: isMinimal ? 44 : '100%',
              }}
              className={clsx({
                rootActive:
                  isActive(route.path) ||
                  (isMinimal && isActiveChildren(route.subMenu)),
                rootActiveByChild: isActiveChildren(route.subMenu),
              })}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'unset',
                  mr: 1,
                  opacity: 0.3,
                  transition: 'all .3s ease',
                }}
              >
                {route.icon ? (
                  <Icon name={route.icon} fill="#fff" size={24} />
                ) : (
                  <WorkspacesOutlinedIcon sx={{ color: '#fff' }} />
                )}
              </ListItemIcon>

              <ListItemText
                primary={
                  <TextDisplay route={route}/>
                }
              />

              {!isEmpty(visibleSubMenu) && !isMinimal && (
                <ExpandMore
                  sx={{
                    transition: 'all .2s ease',
                    transform: 'rotate(-90deg)',
                    fontSize: '18px',
                    color: '#ddd',
                    ...(isOpen(index, route.subMenu)
                      ? { transform: 'rotate(0)' }
                      : {}),
                  }}
                />
              )}
            </ListItemButton>

            {/* {isMinimal ? (
              <SubMenuPopover
                open={hoveredMenu === route.name}
                anchorEl={popoverAnchor.current[index]}
                handlePopoverOpen={() => setHoveredMenu(route.name)}
                handlePopoverClose={() => setHoveredMenu('')}
              >
                <Box
                  {...(route.path ? { component: Link, to: route.path } : {})}
                  sx={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ px: '16px', py: '11px' }}
                  >
                    {t(`menu.${route.name}`)}
                  </Typography>
                </Box>

                <Box sx={{ flex: 1, overflow: 'auto', pr: '16px' }}>
                  <SubMenu route={route} isExpanded={true} t={t} isOnPopover />
                </Box>
              </SubMenuPopover>
            ) : (
              <SubMenu
                route={route}
                isExpanded={isOpen(index, visibleSubMenu)}
                t={t}
              />
            )} */}
          </React.Fragment>
        )
      })}
    </ListMenuStyled>
  )
}

MainMenu.defaultProps = {
  routes: [],
  currentModule: '',
}

MainMenu.propTypes = {
  routes: PropTypes.array,
  currentModule: PropTypes.string,
}

export default MainMenu
