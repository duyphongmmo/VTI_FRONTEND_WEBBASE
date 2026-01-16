import React from 'react'

import { Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { getCurrentModule } from '~/utils/menu'

const Status = ({ variant, t: trans, sx, value, options, module }) => {
  const { pathname } = useLocation()

  const currentModule = getCurrentModule(pathname)
  const { t: defaultTrans } = useTranslation([module || currentModule])
  const s = options.find((item) => item.id === value)
  const t = trans || defaultTrans

  if (!s) return null

  return (
    <Typography
      component="span"
      sx={(theme) => ({
        display: 'inline-block',
        borderRadius: 1,
        ...(variant === 'contained'
          ? {
              p: '0 8px',
              backgroundColor:
                theme.palette.status[s?.color]?.background ||
                theme.palette.status.default.background,
              color: `status.${s?.color}.contrastText`,
            }
          : {
              color: `status.${s?.color}.text`,
              fontWeight: 600,
            }),
        ...sx,
      })}
    >
      {t(s?.text || s?.name)}
    </Typography>
  )
}

Status.defaultProps = {
  options: [],
  variant: 'contained',
  sx: {},
  module: '',
}

Status.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.array,
  variant: PropTypes.oneOf(['contained', 'text']),
  sx: PropTypes.shape(),
  t: PropTypes.func,
  module: PropTypes.string,
}

export default Status
