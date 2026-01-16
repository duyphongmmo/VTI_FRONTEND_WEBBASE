import React, { useState } from 'react'

import { Box, Drawer, IconButton, Stack, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import Icon from '~/components/Icon'
import { useClasses } from '~/themes'

import style from './style'

const Filter = ({
  form,
  values,
  defaultValues,
  onApply,
  validationSchema,
  quickForm,
  searchBox,
}) => {
  const classes = useClasses(style)
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggle = (event) => {
    if (open) {
      handleClose()
    } else {
      handleOpen(event)
    }
  }

  return (
    <Box className={classes.root}>
      <Button
        hotkey="global_toggleFilter"
        startIcon={<Icon name="filter" fill="#000" />}
        color="grayEE"
        onClick={toggle}
      />
      <Drawer
        open={open}
        anchor={'right'}
        onClose={handleClose}
        classes={{
          paper: classes.paper,
        }}
      >
        <Box className={classes.header}>
          <Typography variant="h2">{t('dataTable.filterTitle')}</Typography>
          <IconButton onClick={handleClose}>
            <Icon name="close" sx={{ width: 18, height: 18 }} />
          </IconButton>
        </Box>

        <Formik
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            onApply(value)
            handleClose()
          }}
          enableReinitialize
        >
          {({ resetForm }) => (
            <Form className={classes.form}>
              <Stack spacing={1} sx={{ flex: 1, px: 2, overflow: 'auto' }}>
                {searchBox}
                {quickForm}
                {form}
              </Stack>

              <Box className={classes.footer}>
                <Button
                  variant="outlined"
                  color="text"
                  onClick={() => {
                    resetForm(defaultValues)
                    onApply(defaultValues)
                  }}
                >
                  {t('dataTable.cancel')}
                </Button>
                <Button type="submit">{t('dataTable.filterButton')}</Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Drawer>
    </Box>
  )
}

Filter.defaultProps = {
  onApply: () => {},
  values: {},
  defaultValues: {},
  searchBox: null,
}

Filter.propTypes = {
  form: PropTypes.node,
  values: PropTypes.shape(),
  onApply: PropTypes.func,
  defaultValues: PropTypes.shape(),
  validationSchema: PropTypes.shape(),
  searchBox: PropTypes.node,
}

export default Filter
