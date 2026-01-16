import React from 'react'

import { useFormContext, Controller } from 'react-hook-form'

import DateRangePicker from '../DateRangePicker'

const ReactHookFormDateRangePicker = ({ name, label, onChange, ...props }) => {
  const { control } = useFormContext() ?? {}
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <DateRangePicker
            {...field}
            {...props}
            error={!!error}
            value={field.value || null}
            onChange={(e) => {
              field.onChange(e)
              onChange && onChange(e?.target?.value)
            }}
            helperText={error ? error.message : ''}
            label={label}
          />
        )
      }}
    />
  )
}

export default ReactHookFormDateRangePicker
