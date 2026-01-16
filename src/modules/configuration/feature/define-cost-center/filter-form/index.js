import React from 'react'

import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { COST_CENTER_STATUS_OPTIONS } from '~/modules/configuration/constants'

const FilterForm = () => {
  const { t } = useTranslation(['configuration'])
  return (
    <>
      <Field.Autocomplete
        name="statusList"
        // label={t('general:common.status')}
        placeholder={t('general:common.status')}
        options={COST_CENTER_STATUS_OPTIONS}
        getOptionLabel={(opt) => t(opt?.text)}
        getOptionValue={(opt) => opt?.id}
        multiple
      />
    </>
  )
}

export default FilterForm
