import React from 'react'

import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { HOLON_STATUS_OPTIONS } from '~/modules/configuration/constants'

const FilterForm = () => {
  const { t } = useTranslation(['configuration'])
  return (
    <>
      <Field.Autocomplete
        name="statuses"
        placeholder={t('general:common.status')}
        options={HOLON_STATUS_OPTIONS}
        getOptionLabel={(opt) => t(opt?.text)}
        getOptionValue={(opt) => opt?.id}
        multiple
      />
    </>
  )
}

export default FilterForm
