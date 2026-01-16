import React from 'react'

import { useFormContext, Controller } from 'react-hook-form'

import DateTimePicker from '../DateTimePicker'

const ReactHookFormDateTimePicker = ({ name, label, onChange, ...props }) => {
  const { control } = useFormContext() ?? {}
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <DateTimePicker
            {...field}
            {...props}
            error={!!error}
            value={field.value || null}
            onChange={(e) => {
              field.onChange(e)
              onChange && onChange(e)
            }}
            helperText={error ? error.message : ''}
            label={label}
          />
        )
      }}
    />
  )
}

export default ReactHookFormDateTimePicker
