import React from 'react'

import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Form, Formik } from 'formik'
import { PropTypes } from 'prop-types'

import AdvanceFilter from './AdvanceFilter'
import QuickFilter from './QuickFilter'

const SHOW_LG_UP = 5
const SHOW_MD_UP = 3
const SHOW_MD_DOWN = 0

const FilterArea = ({
  sx,
  validationSchema,
  show: rawShow,
  total: rawTotal,
  ...props
}) => {
  const theme = useTheme()
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const { values, defaultValues, onApply } = props

  const getShow = () => {
    if (typeof rawShow === 'number') return rawShow
    if (lgUp) return rawShow?.lg ?? SHOW_LG_UP
    if (mdDown) return rawShow?.sm ?? SHOW_MD_DOWN
    return rawShow?.md ?? SHOW_MD_UP
  }
  const show = getShow()
  const defaultFilterLength = Object.keys(defaultValues)?.length
  const total =
    rawTotal ||
    (props?.searchPlaceholder
      ? defaultFilterLength + 1
      : defaultFilterLength) ||
    0
  return (
    <Formik
      initialValues={values || defaultValues}
      validationSchema={validationSchema}
      onSubmit={onApply}
      enableReinitialize
    >
      <Box
        id="FilterAreaForm"
        component={Form}
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
        {show > 0 && <QuickFilter {...props} show={show} />}
        {(!total || total > show) && <AdvanceFilter {...props} />}
      </Box>
    </Formik>
  )
}

FilterArea.defaultProps = {
  sx: {},
  onApply: () => {},
  defaultValues: {},
}

FilterArea.propTypes = {
  sx: PropTypes.shape(),
  values: PropTypes.shape(),
  defaultValues: PropTypes.shape(),
  onApply: PropTypes.func,
  form: PropTypes.node,
  validationSchema: PropTypes.shape(),
  searchPlaceholder: PropTypes.string,
  show: PropTypes.oneOfType([PropTypes.number, PropTypes.shape()]),
  total: PropTypes.number,
}

export default FilterArea
