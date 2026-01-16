import React, { useEffect, useState } from 'react'

import { ExpandMore } from '@mui/icons-material'
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import { useSidebar } from '~/common/hooks'
import Truncate from '~/components/Truncate'
import { useClasses } from '~/themes'

import style from './style'

const SubMenu = ({ route, isExpanded, t, isOnPopover, level, ignoreBough }) => {
  const { getVisibleSubMenu, isActive, isActiveChildren } = useSidebar()

  const visibleSubMenu = getVisibleSubMenu(route)

  const classes = useClasses(style)
  const theme = useTheme()
  const [open, setOpen] = useState()

  const isOpen = (index, subs) =>
    open === index || (open === undefined && isActiveChildren(subs))

  const toggle = (index, subs) => {
    if (isEmpty(subs)) return

    setOpen(isOpen(index, subs) ? null : index)
  }

  useEffect(() => {
    if (!isExpanded) setOpen(null)
  }, [isExpanded])

  if (!visibleSubMenu.length) return null

  return (
    <Collapse in={isExpanded} timeout="auto">
      <List component="div" disablePadding sx={{ pl: '35px' }}>
        {visibleSubMenu.map((sub, subIndex) => {
          const subMenuInSub = getVisibleSubMenu(sub)

          let newIgnoreBough = ignoreBough
          if (subIndex === visibleSubMenu?.length - 1) {
            newIgnoreBough = [...ignoreBough, level]
          }

          return (
            <React.Fragment key={subIndex}>
              <ListItemButton
                component={Link}
                to={sub?.path}
                key={sub?.path}
                className={clsx({
                  active: isActive(sub.path),
                  [classes.listItemButtonOnPopover]: isOnPopover,
                })}
                onClick={() => toggle(subIndex, subMenuInSub)}
                sx={{
                  p: 1,
                  position: 'relative',
                  '&:before': {
                    content: "''",
                    width: 10,
                    height:
                      20 * (sub?.maxLine || 1) +
                      0.5 * 20 * (visibleSubMenu[subIndex - 1]?.maxLine || 1) +
                      10,
                    borderLeft: `1px solid ${theme.palette.sidebar.tree}`,
                    borderBottom: `1px solid ${theme.palette.sidebar.tree}`,
                    position: 'absolute',
                    left: -12,
                    bottom: 8 + 10 * (sub?.maxLine || 1),
                    borderBottomLeftRadius: '8px',
                    pointerEvents: 'none',
                  },

                  '&:first-child:before': {
                    height: 20 * (sub?.maxLine || 1),
                  },
                }}
              >
                <ListItemText
                  sx={{ m: 0 }}
                  primary={
                    <Typography
                      variant="h5"
                      color="#fff"
                      // noWrap
                      sx={{
                        fontWeight: 400,
                        maxHeight: 20 * (sub?.maxLine || 1),
                        overflow: 'hidden',
                      }}
                    >
                      <Truncate
                        value={t(`menu.${sub.name}`)}
                        lines={sub?.maxLine || 1}
                      />
                    </Typography>
                  }
                />
                {!isEmpty(subMenuInSub) && (
                  <ExpandMore
                    sx={{
                      transform: 'rotate(-90deg)',
                      fontSize: '18px',
                      color: isOnPopover ? '#222' : '#fff',
                      ...(isOpen(subIndex, subMenuInSub)
                        ? { transform: 'rotate(0)' }
                        : {}),
                    }}
                  />
                )}

                {level > 0 &&
                  [...Array(level).keys()].map((i) => {
                    if (ignoreBough?.includes(level - i - 1)) return null

                    return (
                      <Box
                        key={i}
                        sx={{
                          width: '1px',
                          height: 70,
                          borderLeft: `1px solid ${theme.palette.sidebar.tree}`,
                          position: 'absolute',
                          left: -12 - (i + 1) * 35,
                          bottom: 0,
                          pointerEvents: 'none',
                        }}
                      />
                    )
                  })}
              </ListItemButton>

              <SubMenu
                route={sub}
                isExpanded={isOpen(subIndex, subMenuInSub)}
                t={t}
                level={level + 1}
                ignoreBough={newIgnoreBough}
                isOnPopover={isOnPopover}
              />
            </React.Fragment>
          )
        })}
      </List>
    </Collapse>
  )
}

SubMenu.defaultProps = {
  route: {},
  children: null,
  isOnPopover: false,
  level: 0,
  ignoreBough: [],
}

SubMenu.propTypes = {
  route: PropTypes.shape(),
  isExpanded: PropTypes.bool,
  children: PropTypes.node,
  isOnPopover: PropTypes.bool,
  level: PropTypes.number,
  ignoreBough: PropTypes.array,
}

export default SubMenu
