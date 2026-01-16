import React from 'react'

import { getIn } from 'formik'
import { has } from 'lodash'
import PropTypes from 'prop-types'

import DatePicker from '~/components/DatePicker'

const FormikDatePicker = ({ form, field, onChange, ...props }) => (
  <DatePicker
    {...field}
    value={has(field.value, 'value') ? field.value.value : field.value || null}
    onChange={(v) => {
      onChange(v)
      form.setFieldValue(field.name, v)
    }}
    onTouch={(touched) => {
      form.setFieldTouched(field.name, touched, false)
    }}
    error={
      !!getIn(form.touched, field.name) && !!getIn(form.errors, field.name)
    }
    helperText={getIn(form.errors, field.name)}
    {...props}
  />
)

FormikDatePicker.defaultProps = {
  form: {},
  field: {},
  onChange: () => {},
}

FormikDatePicker.propTypes = {
  form: PropTypes.shape(),
  field: PropTypes.shape(),
  onChange: PropTypes.func,
}

export default FormikDatePicker
