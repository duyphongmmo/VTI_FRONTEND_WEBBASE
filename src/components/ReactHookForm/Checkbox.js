import React from 'react'

import { useFormContext, Controller } from 'react-hook-form'

import Checkbox from '../Checkbox'

const ReactHookFormCheckBox = ({ name, label, onChange, ...props }) => {
  const { control } = useFormContext() ?? {}
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Checkbox
            {...field}
            {...props}
            checked={Boolean(field.value)}
            error={!!error}
            onChange={(e) => {
              field.onChange(e)
              onChange && onChange(e?.target?.checked)
            }}
            helperText={error ? error.message : ''}
            label={label}
          />
        )
      }}
    />
  )
}

export default ReactHookFormCheckBox
