import React, { useState, useRef, useEffect } from 'react'

import { DatePicker as MuiDatePicker } from '@mui/lab'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import clsx from 'clsx'
import {
  endOfWeek,
  format,
  getDay,
  getISOWeek,
  isSameDay,
  startOfWeek,
} from 'date-fns'
import { PropTypes } from 'prop-types'

import { DEFAULT_LABEL_WIDTH } from '~/common/constants'
import Icon from '~/components/Icon'
import TextField from '~/components/TextField'
import { useClasses } from '~/themes'

import style from './style'

const WeekPicker = ({
  label,
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
  inputFormat,
  ...props
}) => {
  const classes = useClasses(style)
  const theme = useTheme()
  const [open, setOpen] = useState(false)
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

  const renderWrappedWeekDay = (date, datePicked, dayInCurrentMonth) => {
    let selectedDate = datePicked?.[0]

    const start = startOfWeek(selectedDate, {
      weekStartsOn: 1,
    })
    const end = endOfWeek(selectedDate, {
      weekStartsOn: 1,
    })
    // check if date is between start and end
    const dayIsBetween = date >= start && date <= end
    const isFirstDay = isSameDay(date, start)
    const isLastDay = isSameDay(date, end)

    const isFirstDayOfWeek = getDay(date) === 1
    const isWeekActive = getISOWeek(date) === getISOWeek(selectedDate)

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
      [classes.firstDayOfWeek]: isFirstDayOfWeek,
    })

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    })

    const weekNumberClassName = clsx({
      [classes.weekNumber]: true,
      [classes.weekNumberHighlight]: isWeekActive,
    })

    return (
      <Box className={classes.dayWrapper}>
        {isFirstDayOfWeek && (
          <Box className={weekNumberClassName}>{getISOWeek(date)}</Box>
        )}
        <Box className={wrapperClassName}>
          <IconButton
            className={dayClassName}
            onClick={() => {
              onChange(date)
              setOpen(false)
            }}
          >
            <span>{format(date, 'dd')} </span>
          </IconButton>
        </Box>
      </Box>
    )
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
        </FormLabel>
      )}

      <Box sx={{ flex: 1 }}>
        <MuiDatePicker
          open={open}
          onClose={() => setOpen(false)}
          label={label}
          value={value}
          onChange={onChange}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          PaperProps={{
            classes: {
              root: classes.paper,
            },
          }}
          PopperProps={{
            placement: 'bottom-start',
          }}
          renderDay={renderWrappedWeekDay}
          renderInput={(params) => {
            return (
              <Box ref={params.inputRef}>
                <TextField
                  onClick={() => {
                    if (!disabled) setOpen(true)
                  }}
                  value={(() => {
                    if (!value) return ''
                    const start = startOfWeek(value, {
                      weekStartsOn: 1,
                    })
                    const end = endOfWeek(value, {
                      weekStartsOn: 1,
                    })
                    const startOfWeekLabel = format(start, inputFormat)
                    const endOfWeekLabel = format(end, inputFormat)
                    return `${startOfWeekLabel} -> ${endOfWeekLabel}`
                  })()}
                  disabled={disabled}
                  readOnly
                  vertical
                  placeholder={placeholder}
                  error={error}
                  className={classes.textField}
                  endAdornment={
                    <>
                      {value && !disabled && (
                        <InputAdornment
                          position="end"
                          sx={{
                            display: 'none',
                            pr: '5px',
                            cursor: disabled ? 'unset' : 'pointer',
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            onChange(null)
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
                  sx={{
                    '& input': {
                      cursor: disabled ? 'unset' : 'pointer',
                    },
                    '& fieldset': {
                      borderColor: error
                        ? `${theme.palette.error.main} !important`
                        : open
                        ? `${theme.palette.borderField} !important`
                        : theme.palette.grayF4.main,
                    },
                    ...(!error &&
                      (open
                        ? {}
                        : {
                            '&:hover fieldset': {
                              borderColor: `${theme.palette.borderField} !important`,
                            },
                          })),
                    ...(!error && !disabled
                      ? {
                          'input:focus ~ fieldset': {
                            borderColor: `${theme.palette.primary.main} !important`,
                          },
                        }
                      : {}),
                  }}
                />
              </Box>
            )
          }}
          {...props}
        />
        {error && !!helperText && (
          <FormHelperText error>{helperText}</FormHelperText>
        )}
      </Box>
    </FormControl>
  )
}

WeekPicker.defaultProps = {
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
  inputFormat: 'dd/MM/yyyy',
}

WeekPicker.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onTouch: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
  required: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showDaysOutsideCurrentMonth: PropTypes.bool,
  inputFormat: PropTypes.string,
}

export default WeekPicker
