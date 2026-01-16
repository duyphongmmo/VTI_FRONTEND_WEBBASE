import React from 'react'

import { Box, Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { useClasses } from '~/themes'

import style from './style'

const QuickFilter = ({
  form,
  values,
  defaultValues,
  onApply,
  validationSchema,
  searchBox,
}) => {
  const classes = useClasses(style)
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={onApply}
      enableReinitialize
    >
      {({ resetForm }) => (
        <Form className={classes.form}>
          <Grid container spacing={1}>
            {searchBox}
            {form}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                whiteSpace: 'nowrap',
              }}
            >
              <Button
                color="grayF4"
                onClick={() => {
                  resetForm(defaultValues)
                  onApply({ ...values, ...defaultValues })
                }}
              >
                {t('general:common.cancel')}
              </Button>
              <Button type="submit">{t('general:common.search')}</Button>
            </Box>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

QuickFilter.defaultProps = {
  onApply: () => {},
  values: {},
  defaultValues: {},
  searchBox: null,
}

QuickFilter.propTypes = {
  form: PropTypes.node,
  values: PropTypes.shape(),
  onApply: PropTypes.func,
  defaultValues: PropTypes.shape(),
  validationSchema: PropTypes.shape(),
  searchBox: PropTypes.node,
}

export default QuickFilter
