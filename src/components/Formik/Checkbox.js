import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import Checkbox from '~/components/Checkbox'

const FormikCheckbox = ({ field, form, onChange, ...props }) => (
  <Checkbox
    {...field}
    checked={field.value}
    onChange={(e) => {
      onChange(e.target.checked)
      form.setFieldValue(field.name, e.target.checked)
    }}
    error={
      !!getIn(form.touched, field.name) && !!getIn(form.errors, field.name)
    }
    helperText={getIn(form.errors, field.name)}
    {...props}
  />
)

FormikCheckbox.defaultProps = {
  field: {},
  form: {},
  onChange: () => {},
}

FormikCheckbox.propTypes = {
  field: PropTypes.shape(),
  form: PropTypes.shape(),
  onChange: PropTypes.func,
}

export default FormikCheckbox
