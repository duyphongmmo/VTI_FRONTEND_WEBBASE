import React from 'react'

import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const FilterForm = () => {
  const { t } = useTranslation(['configuration'])

  return (
    <>
      <Field.TextField
        name="code"
        placeholder={t('location.code')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }}
      />
      <Field.TextField
        name="name"
        placeholder={t('location.name')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }}
      />
    </>
  )
}

export default FilterForm
