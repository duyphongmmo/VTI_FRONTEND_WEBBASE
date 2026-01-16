import React, { memo, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { PropTypes } from 'prop-types'
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form'

import { HOOK_FORM_MODES } from '~/modules/wmsx/constants'
import { setDataFieldArray } from '~/utils/set-data-field-array'

/**
 * HookForm component
 * @param {object} props
 * @param {object} props.defaultValues
 * @param {object} props.schema
 * @param {boolean} props.enableReinitialize
 * @param {function} props.onSubmit
 * @param {function} props.children
 * @returns {JSX.Element}
 */

export const HookForm = (props) => {
  const {
    defaultValues,
    schema,
    enableReinitialize = true,
    onSubmit = () => {},
    mode = HOOK_FORM_MODES.ON_SUBMIT,
  } = props

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
    mode,
  })

  useEffect(() => {
    if (enableReinitialize) methods.reset(defaultValues)
  }, [defaultValues, enableReinitialize])
  const methodsContext = {
    ...methods,
    reset: () => {
      for (const key in defaultValues) {
        if (Object.prototype.hasOwnProperty.call(defaultValues, key)) {
          if (defaultValues[key] instanceof Array) {
            setDataFieldArray(methods.setValue, key, defaultValues[key])
          } else {
            methods.setValue(key, defaultValues[key])
          }
        }
      }
    },
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((values) => onSubmit(values, methods))}
      >
        {props.children?.(methodsContext)}
      </form>
    </FormProvider>
  )
}

HookForm.defaultProps = {
  defaultValues: {},
  schema: {},
}

HookForm.propTypes = {
  defaultValues: PropTypes.object,
  schema: PropTypes.object,
  enableReinitialize: PropTypes.bool,
  onSubmit: PropTypes.func,
  children: PropTypes.func,
}

/**
 * FieldArray component
 * @param {object} props
 * @param {string} props.name
 * @param {function} props.children
 * @returns {JSX.Element}
 */

export const FieldArray = ({ name, children }) => {
  const methods = useFormContext()
  const { fields, append, remove, insert } = useFieldArray({
    name,
    control: methods.control,
  })

  return children({ fields, append, insert, remove, ...methods })
}

/**
 * WatchWrapper component
 * @param {object} props
 * @param {string} props.name
 * @param {function} props.children
 * @returns {JSX.Element}
 */

export const WatchWrapper = memo(({ name, children }) => {
  const { control } = useFormContext()
  const value = useWatch({ control, name })
  return children(value)
})
