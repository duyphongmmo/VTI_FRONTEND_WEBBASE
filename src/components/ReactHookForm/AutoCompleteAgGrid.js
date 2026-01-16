import React from 'react'

import { useFormContext, Controller } from 'react-hook-form'

import Autocomplete from '~/components/Autocomplete'

import CheckWatchField from './utils/checkWatchField'

const ReactHookFormAutocompleteAg = ({
  name,
  label,
  onChange,
  watch,
  ...props
}) => {
  const { control } = useFormContext() ?? {}
  return (
    <CheckWatchField watch={watch} name={name}>
      {(value) => (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Autocomplete
                {...field}
                {...props}
                label={label}
                error={!!error}
                autoFocus={!props?.disabled}
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

export default ReactHookFormAutocompleteAg
