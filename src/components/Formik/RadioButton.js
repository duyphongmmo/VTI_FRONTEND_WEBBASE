import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import RadioButton from '~/components/Radio'

const FormikRadioButton = ({ field, form, onChange, ...props }) => {
  return (
    <RadioButton
      {...field}
      checked={field.value}
      onChange={(e) => {
        form.setFieldValue(field.name, e.target.checked)
        onChange(e.target.checked)
      }}
      error={
        !!getIn(form.touched, field.name) && !!getIn(form.errors, field.name)
      }
      helperText={getIn(form.errors, field.name)}
      {...props}
    />
  )
}

FormikRadioButton.defaultProps = {
  field: {},
  form: {},
  onChange: () => {},
}

FormikRadioButton.propTypes = {
  field: PropTypes.shape(),
  form: PropTypes.shape(),
  onChange: PropTypes.func,
}

export default FormikRadioButton
