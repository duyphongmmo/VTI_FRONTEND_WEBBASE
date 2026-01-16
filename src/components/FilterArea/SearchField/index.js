import React from 'react'

import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

const SearchField = ({ searchPlaceholder }) => {
  const { t } = useTranslation()

  return (
    <Field.TextField
      name="keyword"
      placeholder={searchPlaceholder || t('page.searchPlaceholder')}
      inputProps={{
        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }}
    />
  )
}

SearchField.defaultProps = {
  searchPlaceholder: '',
}

SearchField.propTypes = {
  searchPlaceholder: PropTypes.string,
}

export default SearchField
