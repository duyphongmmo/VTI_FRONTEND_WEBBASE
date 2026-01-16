import React from 'react'

import { Box, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { DEFINE_DIVISION_ENUM_OPTIONS } from '~/modules/configuration/constants'
import { searchDepartmentListApi } from '~/modules/configuration/redux/sagas/department-list/search-department-list'
import { searchUsersApi } from '~/modules/configuration/redux/sagas/user-management/search-users'

const QuickFilter = ({ quickFilters, setQuickFilters, defaultFilter }) => {
  const { t } = useTranslation('configuration')

  const onSubmit = (values) => {
    setQuickFilters(values)
  }
  return (
    <Formik initialValues={quickFilters} onSubmit={onSubmit} enableReinitialize>
      {({ resetForm }) => {
        return (
          <Form>
            <Grid container justifyContent="center" sx={{ mb: 1.5 }}>
              <Grid item xl={11} xs={12}>
                <Grid container rowSpacing={1} columnSpacing={{ xl: 3, xs: 1 }}>
                  <Grid item lg={3} xs={12}>
                    <Field.TextField
                      name="code"
                      placeholder={t('defineDivision.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <Field.TextField
                      name="eName"
                      placeholder={t('defineDivision.eName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS_SPACE}
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <Field.TextField
                      name="vName"
                      placeholder={t('defineDivision.vName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS_SPACE}
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <Field.TextField
                      name="jName"
                      placeholder={t('defineDivision.jName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS_SPACE}
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <Field.Autocomplete
                      name="departmentIds"
                      placeholder={t('defineDivision.department')}
                      asyncRequest={(s) =>
                        searchDepartmentListApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      multiple
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <Field.DateRangePicker name="createdAt" />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <Field.Autocomplete
                      name="status"
                      placeholder={t('general:common.status')}
                      options={DEFINE_DIVISION_ENUM_OPTIONS}
                      getOptionLabel={(opt) => t(opt?.text)}
                      getOptionValue={(opt) => opt?.id}
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <Field.Autocomplete
                      name="createdUserId"
                      placeholder={t('defineDivision.createdByUser')}
                      asyncRequest={(s) =>
                        searchUsersApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.fullName}
                      getOptionSubLabel={(opt) => opt?.username}
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Button
                        color="grayF4"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          resetForm()
                          setQuickFilters(defaultFilter)
                        }}
                      >
                        {t('general:common.cancel')}
                      </Button>
                      <Button type="submit">
                        {t('general:common.filter')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default QuickFilter
