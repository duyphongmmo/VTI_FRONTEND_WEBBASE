import { memo } from 'react'

import { Box, FormHelperText } from '@mui/material'
import clsx from 'clsx'
import { isNumber } from 'lodash'

import { useClasses } from '~/themes'

import NumberFormatText from '../NumberFormat'
import { styleLabelTextField } from './style'

function LabelTextField({
  value = '',
  placeholder = '',
  onClick,
  disabled,
  errorMessage,
  InputProps,
  inputProps,
}) {
  const classes = useClasses(styleLabelTextField(value))
  const EndAdornment = InputProps ? InputProps : <></>
  return (
    <>
      <Box
        onClick={() => {
          onClick(disabled)
        }}
        className={clsx(
          classes.inputBase,
          disabled && classes.disabled,
          errorMessage && classes.error,
        )}
        sx={inputProps?.style}
      >
        <Box className={clsx(classes.wrapperValue)}>
          {value === 0 ? (
            value
          ) : isNumber(value) && value !== 0 ? (
            <NumberFormatText value={value} />
          ) : value ? (
            value
          ) : (
            placeholder
          )}
        </Box>
        {EndAdornment}
      </Box>
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </>
  )
}

export default memo(LabelTextField)
