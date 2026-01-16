import React, { useState, useEffect } from 'react'

import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import { useTheme } from '@mui/material/styles'
import { findIndex, isArray, isUndefined, isNil } from 'lodash'
import PropTypes from 'prop-types'

const Tabs = ({
  list,
  children,
  sx,
  onChange,
  value: externalValue,
  divider,
  trapezium,
}) => {
  const [value, setValue] = useState(0)
  const theme = useTheme()

  useEffect(() => {
    if (isUndefined(externalValue)) return

    if (!list?.[0]?.hasOwnProperty('value')) {
      setValue(externalValue)
      return
    }

    if (list?.every((item) => item?.value !== externalValue)) {
      setValue(0)
      onChange(list?.[0]?.value)
      return
    }

    let idx = findIndex(list, (item) => item?.value === externalValue)
    if (idx === -1) idx = 0
    setValue(idx)
  }, [externalValue, list])

  const getLabel = (item) => {
    const label = item?.label ?? item
    const isRequired = item?.required
    const count = item?.count

    // return (
    //   <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
    //     {label}
    //     {isRequired && (
    //       <Typography color="error" component="span" ml="3px">
    //         *
    //       </Typography>
    //     )}
    //   </Box>
    // )

    // To work around for bold label text on selected (CSS)
    const Label = ({ style = {} }) => (
      <Box component="span" sx={{ whiteSpace: 'nowrap', ...style }}>
        {label}
        {!isNil(count) && count !== '' && ` (${count})`}
        {isRequired && (
          <Typography color="error" component="span" ml="3px">
            *
          </Typography>
        )}
      </Box>
    )
    return (
      <Box sx={{ position: 'relative' }}>
        <Label style={{ fontWeight: 700, opacity: 0, pointerEvents: 'none' }} />
        <Label
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </Box>
    )
  }

  const renderContent = () => {
    const node = isArray(children)
      ? children?.filter((child) => !!child)
      : children
    if (isArray(node)) return node?.[value] ?? null

    return node
  }

  return (
    <>
      <Box
        sx={{
          mb: children ? 2 : 0,
          ...(divider
            ? {
                borderBottom: 1,
                borderColor: 'divider',
              }
            : {}),
          ...(trapezium
            ? {
                mx: -1,
                mt: -1,
                borderBottom: `1px solid ${theme.palette.primary.main}`,

                '.MuiTabs-root': { minHeight: 40 },
                '.MuiTab-root': {
                  minHeight: 40,
                  minWidth: 150,
                  //  textTransform: 'uppercase',
                  px: 2,
                  overflow: 'visible',
                },
                '.MuiTab-root.Mui-selected': {
                  position: 'relative',
                  zIndex: 2,
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  '&:before': {
                    content: '""',
                    width: 0,
                    height: 0,
                    borderBottom: `40px solid ${theme.palette.primary.main}`,
                    borderLeft: '10px solid transparent',
                    position: 'absolute',
                    bottom: 0,
                    left: -10,
                  },
                  '&:after': {
                    content: '""',
                    width: 0,
                    height: 0,
                    borderBottom: `40px solid ${theme.palette.primary.main}`,
                    borderRight: '10px solid transparent',
                    position: 'absolute',
                    bottom: 0,
                    right: -10,
                  },
                },
                '.MuiTabs-indicator,.MuiTouchRipple-root': { display: 'none' },
                '&+.x-taskbar': { mt: 0 },
              }
            : {}),
          ...sx,
        }}
      >
        <MuiTabs
          value={value ?? 0}
          onChange={(_, newValue) => {
            setValue(newValue)
            onChange(
              list?.[newValue]?.hasOwnProperty('value')
                ? list?.[newValue]?.value
                : newValue,
            )
          }}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          selectionFollowsFocus
          sx={{
            minHeight: 32,
          }}
        >
          {list.map((item, index) => {
            return (
              <Tab
                sx={{
                  textTransform: 'none',
                  fontSize: '14px',
                  minHeight: 32,
                  p: theme.spacing(1),
                  minWidth: 0,
                  maxWidth: 'none',
                  '&.Mui-selected': {
                    fontWeight: 700,
                  },
                }}
                key={`Tab-${index}`}
                label={getLabel(item)}
                wrapped
                {...(item.error
                  ? {
                      icon: (
                        <WarningAmberRoundedIcon
                          fontSize="small"
                          sx={{
                            mr: '4px !important',
                            color: `${theme.palette.error.main}`,
                          }}
                        />
                      ),
                      iconPosition: 'start',
                      sx: {
                        minHeight: '48px',
                      },
                    }
                  : {})}
              />
            )
          })}
        </MuiTabs>
      </Box>

      {renderContent()}
    </>
  )
}

Tabs.defaultProps = {
  list: [],
  children: null,
  sx: {},
  onChange: () => {},
  divider: false,
  trapezium: false,
}

Tabs.propTypes = {
  children: PropTypes.node,
  list: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.shape(), PropTypes.string]),
  ).isRequired,
  sx: PropTypes.shape(),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  divider: PropTypes.bool,
  trapezium: PropTypes.bool,
}

export default Tabs
