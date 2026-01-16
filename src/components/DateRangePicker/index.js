import React, { useEffect, useRef, useState } from 'react'

import { DateRangePicker as MuiDateRangePicker } from '@mui/lab'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Typography,
} from '@mui/material'
import clsx from 'clsx'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { DEFAULT_LABEL_WIDTH } from '~/common/constants'
import Icon from '~/components/Icon'
import { useClasses } from '~/themes'
import { getLocaleFormat } from '~/utils'

import TextField from '../TextField'
import style from './style'

const DateRangePicker = ({
  label,
  value,
  onChange,
  onTouch,
  disabled,
  error,
  helperText,
  vertical,
  required,
  labelWidth,
  showDaysOutsideCurrentMonth,
  inputFormat = getLocaleFormat().format,
  ...props
}) => {
  const { t } = useTranslation()
  const classes = useClasses(style)
  const [open, setOpen] = useState(false)
  const ref = useRef(false)
  const [isInvalidDateRange, setIsInvalidDateRange] = useState(false)
  const [invalidDateError, setInvalidDateError] = useState(false)

  useEffect(() => {
    if (ref.current !== open) {
      if (ref.current) {
        onTouch(true)
        return
      }
      ref.current = open
    }
  }, [open])

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime())
  }

  const handleDateChange = (newValue) => {
    const [fromDate, toDate] = newValue

    if (
      (fromDate && !isValidDate(fromDate)) ||
      (toDate && !isValidDate(toDate))
    ) {
      setInvalidDateError(true)
      return
    } else {
      setInvalidDateError(false)
    }

    if (fromDate && toDate) {
      if (fromDate > toDate) {
        setIsInvalidDateRange(true)
        return
      } else {
        setIsInvalidDateRange(false)
      }
    }
    onChange(newValue)
  }

  const parseAndSetDate = (inputValue, isFrom) => {
    const parts = inputValue.trim().split(/[-/]/)

    if (parts.length === 3) {
      const { format } = getLocaleFormat()
      let [first, second, third] = parts.map(Number)

      let day, month, year
      if (format === 'dd/MM/yyyy') {
        ;[day, month, year] = [first, second, third]
      } else if (format === 'MM/dd/yyyy') {
        ;[month, day, year] = [first, second, third]
      } else if (format === 'yyyy/MM/dd') {
        ;[year, month, day] = [first, second, third]
      }

      if (day > 0 && day <= 31 && month > 0 && month <= 12 && year > 1000) {
        const newDate = new Date(year, month - 1, day)

        onChange(
          isFrom
            ? [newDate, value?.[1] ?? null]
            : [value?.[0] ?? null, newDate],
        )
      }
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
          sx={{
            ...(vertical ? {} : { width: labelWidth }),
          }}
        >
          {label}
        </FormLabel>
      )}
      <Box
        sx={(theme) => ({
          flex: 1,
          minWidth: 0,
          '.hiddenInput:focus + div .fakeInput': {
            borderColor: theme.palette.primary.main,
          },
        })}
      >
        <input
          className="hiddenInput"
          style={{
            opacity: 0,
            width: 0,
            height: 0,
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            position: 'absolute',
            pointerEvents: 'none',
          }}
          onBlur={() => onTouch(true)}
        />

        <MuiDateRangePicker
          open={open}
          onClose={() => setOpen(false)}
          value={value}
          onChange={handleDateChange}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          className={classes.paper}
          inputFormat={inputFormat}
          PopperProps={{
            placement: 'bottom-start',
          }}
          renderInput={(startProps, endProps) => {
            const showPlaceholder =
              !value?.[0] && !value?.[1] && props.placeholder
            const placeholderFrom = showPlaceholder
              ? props.placeholder
              : props.placeholderFrom ?? t('dateRangePicker.from')
            const placeholderTo = props.placeholderTo ?? t('dateRangePicker.to')

            return (
              <Box
                className={clsx(classes.root, {
                  [classes.disabled]: disabled,
                  [classes.error]:
                    error || isInvalidDateRange || invalidDateError,
                  [classes.focus]: open && !error,
                  fakeInput: !disabled && !error,
                })}
                sx={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '40px',
                  borderRadius: '8px',
                  boxShadow: 'none',
                  paddingLeft: '8px',
                  ...(disabled ? { pointerEvents: 'none' } : {}),
                }}
                onClick={() => {
                  if (!disabled) setOpen(true)
                }}
              >
                <Box
                  sx={
                    showPlaceholder
                      ? {
                          display: 'flex',
                          alignItems: 'center',
                          flex: 1,
                          overflow: 'hidden',
                          height: '100%',
                          minHeight: 0,
                        }
                      : {
                          boxSizing: 'border-box',
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%',
                          minHeight: 0,
                          boxShadow: 'none',
                          overflowX: 'auto',
                          whiteSpace: 'nowrap',
                          flexWrap: 'nowrap',
                          minWidth: 0,
                          maxWidth: '100%',
                          '&::-webkit-scrollbar': { display: 'none' },
                          scrollbarWidth: 'none',
                        }
                  }
                >
                  <TextField
                    {...startProps}
                    label=""
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      className: clsx(classes.input, {
                        [classes.inputError]: error,
                      }),
                    }}
                    inputProps={{
                      ...startProps.inputProps,
                      placeholder: placeholderFrom,
                    }}
                    onChange={(e) => parseAndSetDate(e.target.value, true)}
                    sx={
                      showPlaceholder
                        ? {
                            flex: 1,
                            minWidth: 0,
                            height: '100%',
                          }
                        : {
                            flex: '1 1 100px',
                            minWidth: '84px',
                            maxWidth: '84px',
                          }
                    }
                  />
                  {!showPlaceholder && (
                    <>
                      <Typography component="span" mr={1}>
                        →
                      </Typography>
                      <TextField
                        {...endProps}
                        label=""
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          className: clsx(classes.input, {
                            [classes.inputError]: error,
                          }),
                        }}
                        inputProps={{
                          ...endProps.inputProps,
                          placeholder: placeholderTo,
                        }}
                        onChange={(e) => parseAndSetDate(e.target.value, false)}
                        sx={{
                          flex: '1 1 100px',
                          minWidth: '84px',
                          maxWidth: '100px',
                        }}
                      />
                    </>
                  )}
                </Box>
                <Box className={classes.iconCalendar}>
                  {value?.some((val) => !!val) && (
                    <Icon
                      name="close"
                      size={12}
                      sx={{ display: 'flex', opacity: 0, pr: '10px' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onChange([null, null])
                      }}
                    />
                  )}
                  <Icon name="calendar" />
                </Box>
              </Box>
            )
          }}
          {...props}
        />
        {(error || isInvalidDateRange || invalidDateError) && (
          <FormHelperText error>
            {invalidDateError
              ? t('dateRangePicker.invalidDate', {
                  format: inputFormat,
                })
              : isInvalidDateRange
              ? t('dateRangePicker.invalidRange')
              : helperText}
          </FormHelperText>
        )}
      </Box>
    </FormControl>
  )
}

DateRangePicker.defaultProps = {
  label: '',
  value: null,
  onChange: () => {},
  onTouch: () => {},
  disabled: false,
  error: false,
  helperText: '',
  vertical: false,
  required: false,
  labelWidth: DEFAULT_LABEL_WIDTH,
  showDaysOutsideCurrentMonth: true,
}

DateRangePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
  onTouch: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  vertical: PropTypes.bool,
  required: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showDaysOutsideCurrentMonth: PropTypes.bool,
}

export default DateRangePicker
