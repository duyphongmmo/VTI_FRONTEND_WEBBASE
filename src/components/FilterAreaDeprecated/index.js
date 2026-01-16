import React from 'react'

import { Box } from '@mui/material'
import { isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

import Filter from './Filter'
import QuickFilter from './QuickFilter'

/**
 * @deprecated use FilterArea instead
 */
const FilterAreaDeprecated = ({
  values,
  onApply,
  sx,
  filters,
  quickFilters,
  children,
}) => {
  const { t } = useTranslation()

  const SearchBox = () => {
    if (quickFilters?.searchPlaceholder !== undefined)
      return (
        <Field.TextField
          name="keyword"
          placeholder={
            quickFilters?.searchPlaceholder || t('page.searchPlaceholder')
          }
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      )

    return null
  }

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        gap: 2,
        pb: 1,
        mb: 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
        ...sx,

        '&:empty': {
          display: 'none',
        },
      })}
    >
      {children}
      {!isEmpty(quickFilters) && (
        <QuickFilter
          values={values}
          onApply={onApply}
          {...quickFilters}
          searchBox={<SearchBox />}
        />
      )}
      {!isEmpty(filters) && (
        <Filter
          values={values}
          onApply={onApply}
          {...filters}
          quickForm={quickFilters?.form}
          searchBox={<SearchBox />}
        />
      )}
    </Box>
  )
}

FilterAreaDeprecated.defaultProps = {
  sx: {},
  values: {},
  onApply: () => {},
  filters: {},
  quickFilters: {},
}

FilterAreaDeprecated.propTypes = {
  sx: PropTypes.shape(),
  values: PropTypes.shape(),
  onApply: PropTypes.func,

  filters: PropTypes.shape({
    form: PropTypes.node,
    defaultValues: PropTypes.shape(),
    validationSchema: PropTypes.shape(),
  }),
  quickFilters: PropTypes.shape({
    form: PropTypes.node,
    defaultValues: PropTypes.shape(),
    validationSchema: PropTypes.shape(),
  }),
}

export default FilterAreaDeprecated
