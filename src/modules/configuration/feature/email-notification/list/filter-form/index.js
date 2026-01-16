import React from 'react'

import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { EMAIL_FUNCTION_TYPE_OPTIONS } from '~/modules/configuration/constants'

const FilterForm = () => {
  const { t } = useTranslation(['configuration'])
  return (
    <Field.Autocomplete
      name="type"
      placeholder={t('emailNotification.function')}
      options={EMAIL_FUNCTION_TYPE_OPTIONS}
      getOptionLabel={(opt) => t(opt.text)}
      getOptionValue={(opt) => opt?.id}
      multiple
    />
  )
}

export default FilterForm
