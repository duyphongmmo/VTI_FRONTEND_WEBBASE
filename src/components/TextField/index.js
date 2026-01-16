import React from 'react'

import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  FormLabel,
  Box,
} from '@mui/material'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'

import {
  DEFAULT_LABEL_WIDTH,
  TEXTFIELD_ALLOW,
  TEXTFIELD_PREVENT,
} from '~/common/constants'
import { useClasses } from '~/themes'

import { NumberFormatInput } from '../NumberFormat'
import style from './style'

const TextField = ({
  label,
  helperText,
  className,
  error,
  required,
  multiline,
  disabled,
  InputProps,
  sx,
  vertical,
  labelWidth,
  labelProps,
  readOnly,
  onBlur,
  onChange,
  allow,
  numberProps,
  getColorText,
  ...props
}) => {
  const classes = useClasses(style(readOnly, getColorText))

  const handleChange = (e) => {
    let val = e.target.value
    if (allow instanceof RegExp && val) {
      if (props.type === 'number' || !isEmpty(numberProps)) {
        if (
          (allow.toString() === TEXTFIELD_ALLOW.NUMERIC.toString() ||
            allow.toString() === TEXTFIELD_ALLOW.POSITIVE_DECIMAL.toString()) &&
          Number(val) < 0
        ) {
          val = 0
        } else {
          val =
            isEmpty(val) || val === 'NaN'
              ? null
              : Number(val?.toString().replace(allow, ''))
        }
      } else {
        val = val?.replace(allow, '')
      }
    }

    onChange(e, val)
  }

  const handleKeyDown = (e) => {
    if (TEXTFIELD_PREVENT[allow]?.includes(e?.key)) e.preventDefault()
  }
  // const handlePaste = (e) => {
  //   const clipboardData = (e.clipboardData || window.clipboardData)?.getData(
  //     'Text',
  //   )
  //   if (clipboardData?.match(allow)) {
  //     e.preventDefault()
  //   }
  // }

  return (
    <FormControl
      className={clsx(className, classes.root, {
        [classes.disabled]: disabled,
        [classes.vertical]: vertical,
        [classes.horizontal]: !vertical && !!label,
        [classes.normal]: !error,
      })}
      fullWidth
      error={error}
      sx={sx}
    >
      {label && (
        <FormLabel
          required={required}
          sx={{ ...(vertical ? {} : { width: labelWidth }) }}
          {...labelProps}
        >
          {label}
        </FormLabel>
      )}

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <OutlinedInput
          multiline={multiline}
          disabled={disabled}
          readOnly={readOnly}
          onBlur={onBlur}
          onChange={handleChange}
          fullWidth
          {...InputProps}
          {...props}
          {...(allow instanceof RegExp
            ? !isEmpty(numberProps) || props?.type === 'number'
              ? {
                  onKeyDown: handleKeyDown,
                  // onPaste: handlePaste,
                }
              : {
                  onBeforeInput: (e) => {
                    if (!allow?.source?.test(e.data)) {
                      e.preventDefault() // chặn ngay từ đầu
                    }
                  },
                }
            : {})}
          {...(props.type === 'number' || !isEmpty(numberProps)
            ? {
                inputComponent: NumberFormatInput,
                inputProps: {
                  numberProps,
                  ...props?.inputProps,
                },
              }
            : {})}
        />

        {error && !!helperText && (
          <FormHelperText error>{helperText}</FormHelperText>
        )}
      </Box>
    </FormControl>
  )
}

TextField.defaultProps = {
  className: '',
  label: '',
  helperText: '',
  error: false,
  readOnly: false,
  required: false,
  multiline: false,
  disabled: false,
  InputProps: {},
  sx: {},
  vertical: false,
  labelWidth: DEFAULT_LABEL_WIDTH,
  labelProps: {},
  onBlur: () => {},
  onChange: () => {},
  numberProps: {},
}

TextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  InputProps: PropTypes.shape(),
  sx: PropTypes.shape(),
  vertical: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labelProps: PropTypes.shape(),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  numberProps: PropTypes.shape(),
}

export default TextField
