import * as React from 'react'

import BigNumber from 'bignumber.js'
import { isNil, isNumber } from 'lodash'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

import { MAX_VALUE_TEXT_FIELD } from '~/common/constants'

const config = {
  thousandSeparator: ',',
  decimalSeparator: '.',
  allowNegative: false,
  decimalScale: 6,
}

export const NumberFormatInput = React.forwardRef(function NumberFormatInput(
  props,
  ref,
) {
  const { onChange, numberProps, ...other } = props

  const validMaxLength = (val) => {
    if (!val) return true

    const maxLength = isNumber(numberProps?.maxLengthNumber)
      ? numberProps?.maxLengthNumber
      : 18
    return val.toString().length <= maxLength
  }

  const validMaxValue = (val) => {
    if (!val) return true
    // if (!isNumber(numberProps?.maxValue)) return true
    const valNumber = val.replace(/,/g, '').replace(/[^0-9.]/g, '')
    const maxValue = numberProps?.maxValue || MAX_VALUE_TEXT_FIELD

    return BigNumber(valNumber) <= maxValue
  }

  return (
    <NumberFormat
      {...other}
      type="text"
      getInputRef={ref}
      onValueChange={(values, sourceInfo) => {
        if (
          sourceInfo?.source === 'event' ||
          numberProps?.triggerSetValue === true
        ) {
          onChange({
            target: {
              name: props?.name,
              value: BigNumber(values?.value)?.toString() ?? '',
            },
          })
        }
      }}
      {...config}
      {...numberProps}
      isAllowed={(val) => {
        if (typeof numberProps?.isAllowed === 'function') {
          return validMaxLength(val.value) && numberProps?.isAllowed(val)
        }
        return validMaxLength(val.value) && validMaxValue(val.value)
      }}
    />
  )
})

NumberFormatInput.defaultProps = {
  onChange: () => {},
  numberProps: {},
}

NumberFormatInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  numberProps: PropTypes.shape(),
}

export const NumberFormatText = ({ value, numberProps, endAdornment }) => {
  if (isNil(value) || value === '') return ''

  const convertedValue = BigNumber(value || 0)
    .decimalPlaces(numberProps?.decimalScale || config?.decimalScale || 0)
    .toString()

  return (
    <NumberFormat
      value={convertedValue}
      displayType="text"
      isNumericString
      {...config}
      {...numberProps}
      allowNegative={true}
      type="text"
      renderText={(value) =>
        endAdornment ? (
          <>
            {`${value} `}
            {endAdornment}
          </>
        ) : (
          value
        )
      }
    />
  )
}

NumberFormatText.defaultProps = {
  value: '',
  numberProps: {},
  endAdornment: '',
}

NumberFormatText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  numberProps: PropTypes.shape(),
  endAdornment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default NumberFormatText
