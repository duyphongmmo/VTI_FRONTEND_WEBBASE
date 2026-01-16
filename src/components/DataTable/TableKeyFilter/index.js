import React, { useState, useMemo } from 'react'

import { Box, FormControlLabel, Popover, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'

import { useTable } from '~/common/hooks/useTable'
import Button from '~/components/Button'
import Checkbox from '~/components/Checkbox'
import { Field } from '~/components/Formik'
import { useClasses } from '~/themes'

import style from './style'

const TableKeyFilter = () => {
  const classes = useClasses(style)
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const {
    columns: rawColumns,
    isVisible,
    setting,
    updateSetting,
    onFilterByKeys,
    isSelectAllFilterByKey,
  } = useTable()

  const initialValues = useMemo(() => {
    const result = setting.reduce(
      (obj, cur) => ({ ...obj, [cur.field]: isVisible(cur) }),
      {},
    )
    return result
  }, [setting])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onApply = (value) => {
    //setting table
    const st = setting.map((s) => ({
      ...s,
      visible: value[s.field],
    }))
    updateSetting(st)

    //set key enums
    const visibleColumns = columns?.filter(
      (col) => value[col.field] === true && col.keyEnum,
    )
    const keys = map(visibleColumns, 'keyEnum')

    onFilterByKeys(keys)
  }
  const open = Boolean(anchorEl)
  const columns = rawColumns.filter((col) => col.keyEnum)
  const isSelectedAll = (values) =>
    columns.every((item) => values[item?.field] === true)
  const isSelectedSome = (values) =>
    columns.some((item) => values[item?.field] === true)
  const handleChangeSelectAll = (e, values, setValues) => {
    const valuesEnumField = columns.reduce((acc, cur) => {
      return { ...acc, [cur?.field]: values[cur?.field] }
    }, {})
    if (e.target.checked) {
      const newValues = Object.fromEntries(
        Object.entries(valuesEnumField).map((item) => [item[0], true]),
      )
      setValues(newValues)
    } else {
      const newValues = Object.fromEntries(
        Object.entries(valuesEnumField).map((item) => [item[0], false]),
      )
      setValues(newValues)
    }
  }
  return (
    <Box className={classes.root}>
      <Button icon="filterByKeys" color="grayEE" onClick={handleClick}>
        {t('dataTable.filterByKeys')}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          variant: 'caret',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box className={classes.formContainer}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {t('dataTable.visibleColumns')}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={(value) => {
              onApply(value)
              handleClose()
            }}
            enableReinitialize
          >
            {({ handleReset, values, setValues }) => (
              <Form>
                <Box
                  sx={{ maxHeight: '40vh', overflowY: 'auto', mr: -2, pr: 2 }}
                >
                  {isSelectAllFilterByKey && (
                    <FormControlLabel
                      label={t('general:selectAll')}
                      sx={{ mb: 1 }}
                      control={
                        <Checkbox
                          checked={isSelectedAll(values)}
                          indeterminate={
                            isSelectedSome(values) && !isSelectedAll(values)
                          }
                          onChange={(e) =>
                            handleChangeSelectAll(e, values, setValues)
                          }
                        />
                      }
                    />
                  )}
                  {columns.map((column, idx) => {
                    return (
                      <Box key={column.field || idx}>
                        <FormControlLabel
                          name={column.field}
                          control={
                            <Field.Checkbox
                              {...(column.hide
                                ? {
                                    checked: true,
                                  }
                                : {})}
                            />
                          }
                          label={column.headerName || ''}
                          disabled={column.visible === 'always' || column.hide}
                        />
                      </Box>
                    )
                  })}
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <Button
                    color="grayF4"
                    onClick={handleReset}
                    sx={{ ml: 'auto', mr: '8px' }}
                  >
                    {t('general:common.cancel')}
                  </Button>
                  <Button type="submit">{t('general:common.apply')}</Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Popover>
    </Box>
  )
}

export default TableKeyFilter
