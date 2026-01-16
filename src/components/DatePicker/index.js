import React, { useState, useRef, useEffect } from 'react'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { DatePicker as MuiDatePicker } from '@mui/lab'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  InputAdornment,
  Tooltip,
} from '@mui/material'
import clsx from 'clsx'
import { format } from 'date-fns'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { DEFAULT_LABEL_WIDTH } from '~/common/constants'
import Icon from '~/components/Icon'
import TextField from '~/components/TextField'
import { useClasses } from '~/themes'
import { getLocale, getLocaleFormat } from '~/utils'

import style from './style'

const DatePicker = ({
  label,
  labelTooltip,
  placeholder,
  value,
  onChange,
  onTouch,
  error,
  disabled,
  helperText,
  vertical,
  required,
  labelWidth,
  showDaysOutsideCurrentMonth,
  disableClearable,
  inputFormat = getLocaleFormat().format,
  getColorText,
  ...props
}) => {
  const { t } = useTranslation()
  const classes = useClasses(style(getColorText))
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value ? formatDate(value) : '')
  const [isInvalidDate, setIsInvalidDate] = useState(false)
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current !== open) {
      if (ref.current) {
        onTouch(true)
        return
      }
      ref.current = open
    }
  }, [open])

  function formatDate(date) {
    if (!date) return ''
    return format(new Date(date), inputFormat, { locale: getLocale() })
  }

  useEffect(() => {
    setInputValue(value ? formatDate(value) : '')
  }, [value, inputFormat])

  const handleInputChange = (e) => {
    const newValue = e.target.value.trim()
    setInputValue(newValue)

    const currentDate = new Date()
    let day = 1,
      month = currentDate.getMonth() + 1,
      year = currentDate.getFullYear()

    let regexPattern = ''

    if (inputFormat === 'MM') {
      regexPattern = '^(0[1-9]|1[0-2])$' // Chỉ nhận tháng từ 01-12
    } else if (inputFormat === 'yyyy') {
      regexPattern = '^(\\d{4})$' // Chỉ nhận năm 4 chữ số
    } else if (inputFormat === 'dd') {
      regexPattern = '^(0[1-9]|[12][0-9]|3[01])$' // Chỉ nhận ngày 01-31
    } else if (inputFormat === 'MM/yyyy') {
      regexPattern = '^(0[1-9]|1[0-2])[\\/\\-](\\d{4})$'
    } else if (inputFormat === 'yyyy/MM') {
      regexPattern = '^(\\d{4})[\\/\\-](0[1-9]|1[0-2])$'
    } else if (
      inputFormat === 'dd/MM/yyyy' ||
      inputFormat === 'MM/dd/yyyy' ||
      inputFormat === 'yyyy/MM/dd'
    ) {
      regexPattern = inputFormat
        .replace('dd', '(0[1-9]|[12][0-9]|3[01])')
        .replace('MM', '(0[1-9]|1[0-2])')
        .replace('yyyy', '(\\d{4})')
        .replace(/\//g, '[\\/\\-]')
    } else {
      setIsInvalidDate(true)
      return
    }

    const regex = new RegExp(`^${regexPattern}$`)
    const match = newValue.match(regex)

    if (!match) {
      setIsInvalidDate(true)
      return
    }

    if (inputFormat === 'MM') {
      month = parseInt(match[0], 10)
    } else if (inputFormat === 'yyyy') {
      year = parseInt(match[0], 10)
    } else if (inputFormat === 'dd') {
      day = parseInt(match[0], 10)
    } else if (inputFormat === 'MM/yyyy') {
      month = parseInt(match[1], 10)
      year = parseInt(match[2], 10)
    } else if (inputFormat === 'yyyy/MM') {
      year = parseInt(match[1], 10)
      month = parseInt(match[2], 10)
    } else if (inputFormat === 'dd/MM/yyyy') {
      day = parseInt(match[1], 10)
      month = parseInt(match[2], 10)
      year = parseInt(match[3], 10)
    } else if (inputFormat === 'MM/dd/yyyy') {
      month = parseInt(match[1], 10)
      day = parseInt(match[2], 10)
      year = parseInt(match[3], 10)
    } else if (inputFormat === 'yyyy/MM/dd') {
      year = parseInt(match[1], 10)
      month = parseInt(match[2], 10)
      day = parseInt(match[3], 10)
    }

    // Kiểm tra ngày hợp lệ
    const daysInMonth = new Date(year, month, 0).getDate()
    if (day >= 1 && day <= daysInMonth) {
      setIsInvalidDate(false)
      onChange(new Date(year, month - 1, day)) // Month trong JS tính từ 0-11
    } else {
      setIsInvalidDate(true)
    }
  }

  return (
    <FormControl
      className={clsx(classes.formControl, {
        [classes.vertical]: vertical,
        [classes.horizontal]: !vertical && !!label,
      })}
      fullWidth
      error={error}
    >
      {label && (
        <FormLabel
          required={required}
          sx={{ ...(vertical ? {} : { width: labelWidth }) }}
        >
          {label}
          {labelTooltip && (
            <Box
              component="span"
              sx={{
                ml: 0.5,
                position: 'relative',
                top: 2,
              }}
            >
              <Tooltip title={labelTooltip} arrow placement="top">
                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
              </Tooltip>
            </Box>
          )}
        </FormLabel>
      )}

      <Box sx={{ flex: 1 }}>
        <MuiDatePicker
          open={open}
          onClose={() => setOpen(false)}
          label={label}
          value={value}
          inputFormat={inputFormat}
          onChange={(date) => {
            setIsInvalidDate(false)
            onChange(date)
            setInputValue(formatDate(date))
          }}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          PaperProps={{
            classes: {
              root: classes.paper,
            },
          }}
          PopperProps={{
            placement: 'bottom-start',
          }}
          renderInput={(params) => {
            return (
              <Box ref={params.inputRef}>
                <TextField
                  onClick={() => {
                    if (!disabled) setOpen(true)
                  }}
                  value={inputValue}
                  disabled={disabled}
                  placeholder={placeholder || inputFormat}
                  error={error || isInvalidDate}
                  className={classes.textField}
                  onChange={handleInputChange}
                  endAdornment={
                    <>
                      {value && !disabled && !disableClearable && (
                        <InputAdornment
                          position="end"
                          sx={{
                            pr: '5px',
                            cursor: disabled ? 'unset' : 'pointer',
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            onChange(null)
                            setInputValue('')
                          }}
                        >
                          <Icon name="close" size={12} />
                        </InputAdornment>
                      )}
                      <InputAdornment
                        position="end"
                        sx={{
                          pr: '10px',
                          cursor: disabled ? 'unset' : 'pointer',
                        }}
                      >
                        <Icon name="calendar" />
                      </InputAdornment>
                    </>
                  }
                />
              </Box>
            )
          }}
          {...props}
        />
        {(error || isInvalidDate) && (
          <FormHelperText error>
            {isInvalidDate
              ? t('dateRangePicker.invalidDate', {
                  format: inputFormat,
                })
              : helperText}
          </FormHelperText>
        )}
      </Box>
    </FormControl>
  )
}

DatePicker.defaultProps = {
  placeholder: '',
  label: '',
  value: null,
  onChange: () => {},
  onTouch: () => {},
  error: false,
  helperText: '',
  disabled: false,
  vertical: false,
  required: false,
  labelWidth: DEFAULT_LABEL_WIDTH,
  showDaysOutsideCurrentMonth: true,
  disableClearable: false,
}

DatePicker.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onTouch: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
  required: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showDaysOutsideCurrentMonth: PropTypes.bool,
  disableClearable: PropTypes.bool,
}

export default DatePicker
