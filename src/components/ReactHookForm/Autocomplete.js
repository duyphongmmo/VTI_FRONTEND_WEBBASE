import React, { useCallback, useState } from 'react'

import { useFormContext, Controller } from 'react-hook-form'

import Autocomplete from '~/components/Autocomplete'

import LabelAutocomplete from '../LabelInput/LabelAutocomplete'
import CheckWatchField from './utils/checkWatchField'

const ReactHookFormAutocomplete = ({
  name,
  label,
  onChange,
  isInputTable,
  watch,
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
    <CheckWatchField watch={watch} name={name}>
      {(value) => (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => {
            const { disabled, placeholder, getOptionLabel } = props || {}
            return isInputTable && !isEditing ? (
              <LabelAutocomplete
                disabled={disabled}
                value={
                  field.value
                    ? getOptionLabel(field.value) || field?.value?.code
                    : ''
                }
                placeholder={placeholder || ''}
                onClick={onEdit}
                onClear={
                  field.value
                    ? () => {
                        onChange?.(null, value)
                        field.onChange(null)
                      }
                    : null
                }
                errorMessage={error?.message}
              />
            ) : (
              <Autocomplete
                {...field}
                {...props}
                label={label}
                error={!!error}
                autoFocus={isInputTable}
                {...(isInputTable
                  ? {
                      onBlur: () => {
                        setIsEditing(false)
                      },
                    }
                  : null)}
                helperText={error ? error.message : ''}
                fullWidth
                {...props}
                onChange={(val) => {
                  field.onChange(val)
                  onChange?.(val, value)
                }}
              />
            )
          }}
        />
      )}
    </CheckWatchField>
  )
}

export default ReactHookFormAutocomplete
