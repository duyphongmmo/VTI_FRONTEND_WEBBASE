import React from 'react'

import { Box } from '@mui/material'
import { useFormikContext } from 'formik'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { useClasses } from '~/themes'

import SearchField from '../SearchField'
import style from './style'

const QuickFilter = ({
  form,
  defaultValues,
  onApply,
  searchPlaceholder,
  show,
}) => {
  const classes = useClasses(style)
  const { t } = useTranslation()
  const { resetForm } = useFormikContext()

  return (
    <Box
      className={classes.container}
      sx={{
        [`>div:nth-child(n+${show + 1}):not(:last-child)`]: {
          display: 'none',
        },
      }}
    >
      {searchPlaceholder !== undefined && (
        <SearchField searchPlaceholder={searchPlaceholder} />
      )}
      {form}
      <Box className={classes.actions}>
        <Button type="submit">{t('general:common.filter')}</Button>
        <Button
          color="grayF4"
          onClick={() => {
            resetForm(defaultValues)
            onApply(defaultValues)
          }}
        >
          {t('general:common.cancel')}
        </Button>
      </Box>
    </Box>
  )
}

QuickFilter.defaultProps = {
  onApply: () => {},
  defaultValues: {},
}

QuickFilter.propTypes = {
  form: PropTypes.node,
  values: PropTypes.shape(),
  onApply: PropTypes.func,
  defaultValues: PropTypes.shape(),
  searchPlaceholder: PropTypes.string,
  show: PropTypes.number,
}

export default QuickFilter
