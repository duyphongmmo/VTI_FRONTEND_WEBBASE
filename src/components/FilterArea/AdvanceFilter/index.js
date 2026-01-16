import React, { useState } from 'react'

import { Box, Drawer, IconButton, Stack, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import Icon from '~/components/Icon'
import { useClasses } from '~/themes'

import SearchField from '../SearchField'
import style from './style'

const AdvanceFilter = ({
  form,
  defaultValues,
  onApply,
  searchPlaceholder,
  zIndex,
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

  const { resetForm } = useFormikContext()

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
        {...(zIndex ? { sx: { zIndex } } : {})}
      >
        <Box className={classes.header}>
          <Typography variant="h2">{t('dataTable.filterTitle')}</Typography>
          <IconButton onClick={handleClose}>
            <Icon name="close" sx={{ width: 18, height: 18 }} />
          </IconButton>
        </Box>

        <Box className={classes.container}>
          <Stack spacing={1} sx={{ flex: 1, px: 2, overflow: 'auto' }}>
            {searchPlaceholder !== undefined && (
              <SearchField searchPlaceholder={searchPlaceholder} />
            )}
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
            <Button
              type="submit"
              form="FilterAreaForm"
              onClick={() => handleClose()}
            >
              {t('dataTable.filterButton')}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

AdvanceFilter.defaultProps = {
  onApply: () => {},
  defaultValues: {},
}

AdvanceFilter.propTypes = {
  form: PropTypes.node,
  values: PropTypes.shape(),
  onApply: PropTypes.func,
  defaultValues: PropTypes.shape(),
  validationSchema: PropTypes.shape(),
  searchPlaceholder: PropTypes.string,
}

export default AdvanceFilter
