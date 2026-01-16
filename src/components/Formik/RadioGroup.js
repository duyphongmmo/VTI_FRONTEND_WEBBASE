import React from 'react'

import { FormControl, FormLabel } from '@mui/material'
import RadioGroup from '@mui/material/RadioGroup'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { DEFAULT_LABEL_WIDTH } from '~/common/constants'
import { useClasses } from '~/themes'

import style from '../Radio/style'

const FormikRadioGroup = ({
  field,
  form,
  onChange,
  children,
  label,
  required,
  labelWidth,
  className,
  vertical,
  disabled,
  ...props
}) => {
  const classes = useClasses(style())
  return (
    <FormControl
      fullWidth
      disabled={disabled}
      className={clsx(className, classes.root, {
        [classes.vertical]: vertical,
        [classes.horizontal]: !vertical && !!label,
      })}
    >
      {label && (
        <FormLabel
          required={required}
          sx={{ ...(vertical ? {} : { width: labelWidth }) }}
        >
          {label}
        </FormLabel>
      )}
      <RadioGroup
        {...field}
        value={field.value}
        onChange={(_, value) => {
          onChange(value)
          form.setFieldValue(field.name, value)
        }}
        {...props}
      >
        {children}
      </RadioGroup>
    </FormControl>
  )
}

FormikRadioGroup.defaultProps = {
  field: {},
  form: {},
  onChange: () => {},
  required: false,
  vertical: false,
  labelWidth: DEFAULT_LABEL_WIDTH,
  disabled: false,
}

FormikRadioGroup.propTypes = {
  field: PropTypes.shape(),
  form: PropTypes.shape(),
  children: PropTypes.node,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  vertical: PropTypes.bool,
  labelWidth: PropTypes.number,
  disabled: PropTypes.bool,
}

export default FormikRadioGroup
