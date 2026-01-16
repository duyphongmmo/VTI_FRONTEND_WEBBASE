import React, { useCallback, useState } from 'react'

import { useFormContext, Controller } from 'react-hook-form'

import LabelTextField from '../LabelInput/LabelTextField'
import TextField from '../TextField'

const ReactHookFormTextField = ({
  name,
  label,
  onChange,
  onBlur,
  isInputTable,
  ...props
}) => {
  const { control } = useFormContext() ?? {}
  const [isEditing, setIsEditing] = useState(false)
  const onEdit = useCallback((disabled = false) => {
    if (!disabled) {
      setIsEditing((prev) => !prev)
    }
  }, [])
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { disabled, placeholder, InputProps, inputProps } = props || {}
        return isInputTable && !isEditing ? (
          <LabelTextField
            disabled={disabled}
            value={field.value}
            placeholder={placeholder}
            onClick={onEdit}
            errorMessage={error?.message}
            InputProps={InputProps?.endAdornment}
            inputProps={inputProps}
          />
        ) : (
          <TextField
            {...field}
            {...props}
            label={label}
            error={!!error}
            helperText={error ? error.message : ''}
            autoFocus={isInputTable}
            onChange={(e) => {
              field.onChange(e)
              onChange && onChange(e?.target?.value)
            }}
            onBlur={(e) => {
              onBlur && onBlur(e)
              setIsEditing(false)
            }}
            fullWidth
          />
        )
      }}
    />
  )
}

export default ReactHookFormTextField
