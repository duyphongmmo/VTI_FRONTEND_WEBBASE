import { Button as MuiButton, CircularProgress, useTheme } from '@mui/material'
import clsx from 'clsx'
import { PropTypes } from 'prop-types'

import { useClasses } from '~/themes'

import Icon from '../Icon'
import style from './style'

const Button = ({
  loading,
  icon,
  iconColor,
  children,
  className,
  disabled,
  bold,
  ...props
}) => {
  const theme = useTheme()
  const classes = useClasses(style)

  const getIconColor = () => {
    if (iconColor.startsWith('#')) return iconColor

    return theme.palette[iconColor]?.main || ''
  }

  return (
    <MuiButton
      className={clsx(
        className,
        {
          [classes.bold]: bold,
          [classes.disabled]: disabled,
          [classes.iconOnly]: (icon || props.startIcon) && !children,
        },
        loading ? classes.loading : '',
      )}
      startIcon={
        icon ? (
          loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <Icon
              name={icon}
              {...(getIconColor() ? { fill: getIconColor() } : {})}
            />
          )
        ) : (
          ''
        )
      }
      {...(disabled ? { tabIndex: -1 } : {})}
      {...props}
    >
      {loading && !icon && (
        <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
      )}
      {children}
    </MuiButton>
  )
}

Button.defaultProps = {
  children: '',
  color: 'primary',
  iconColor: '',
  className: '',
  variant: 'contained',
  bold: true,
  disabled: false,
  loading: false,
}

Button.propTypes = {
  loading: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  iconColor: PropTypes.string,
  bold: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape(),
    PropTypes.string,
  ]),
}

export default Button
