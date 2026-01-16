import React, { useMemo } from 'react'

import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Formik, Form } from 'formik'
import { uniqBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  ASYNC_SEARCH_LIMIT,
  ACTIVE_STATUS,
  COST_CENTER_STATUS,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { USER_MANAGEMENT_STATUS_OPTIONS } from '~/modules/configuration/constants'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { searchDefineDivisionApi } from '~/modules/configuration/redux/sagas/define-division/search'
import { searchDefineSectionApi } from '~/modules/configuration/redux/sagas/define-section/search'
import { searchDepartmentListApi } from '~/modules/configuration/redux/sagas/department-list/search-department-list'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertFilterParams } from '~/utils'

import { validationSchema } from './schema'

function UserInfoForm() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()

  const {
    data: { userInfo, isLoading },
    actions,
  } = useUserInfo()

  const initialValues = useMemo(
    () => ({
      code: userInfo?.code || '',
      username: userInfo?.username || '',
      password: userInfo?.password || '',
      showPassword: false,
      companyId: userInfo?.companyId || '',
      fullName: userInfo?.fullName || '',
      dateOfBirth: userInfo?.dateOfBirth || null,
      email: userInfo?.email || '',
      phone: userInfo?.phone || '',
      status: userInfo?.status || '1',
      factories: userInfo.factories?.map((item) => item) || [],
      userRoleSettings: userInfo.userRoleSettings?.[0]?.id || null,
      costCenters: userInfo.costCenters ?? [],
      departmentSettings: userInfo?.departmentSettings?.[0] || null,
      division: userInfo?.divisions?.[0] || null,
      section: userInfo?.sections?.[0] || null,
      userWarehouses: userInfo.userWarehouses?.map((item) => item.id) || [],
    }),
    [userInfo],
  )

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
      id: Number(userInfo?.id),
      status: values?.status?.toString(),
      factories: values?.factories?.map((item) => ({
        id: item?.id,
      })),
      costCenterIds: values?.costCenters?.map((item) => item?.id),
      userRoleSettings: values.userRoleSettings
        ? [{ id: values.userRoleSettings }]
        : [{ id: 1 }],
      departmentSettings: uniqBy(
        values.departmentSettings?.map((item) => ({
          id: item,
        })),
        'id',
      ),
      userWarehouses: values?.userWarehouses?.map((item) => ({
        id: item,
      })),
    }
    actions.updateUserInfo(convertValues, backToList)
  }

  const breadcrumb = [
    {
      title: 'userInfo',
    },
  ]

  const renderActionBar = (handleReset) => {
    return (
      <ActionBar
        onBack={backToList}
        onCancel={handleReset}
        mode={MODAL_MODE.UPDATE}
      />
    )
  }

  const backToList = () => {
    history.push(ROUTE.ACCOUNT.DETAIL.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumb}
      title={t('general:page.userInfo')}
      onBack={backToList}
      loading={isLoading}
    >
      <ActionBar
        variant="top"
        status={
          <Status
            options={USER_MANAGEMENT_STATUS_OPTIONS}
            value={userInfo?.status}
          />
        }
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid
                item
                xs={12}
                sx={(theme) => ({
                  justifyContent: 'center',
                  bgcolor: 'bg.block',
                  borderRadius: 1,
                  mb: 1,
                  pt: 1,
                  pb: 1,
                  pr: 1,
                  pl: 1,

                  [theme.breakpoints.down('xl')]: {
                    px: 2,
                  },
                })}
              >
                <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1}>
                      {t('userManagement.commonInfo')}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('userManagement.code')}
                      name="code"
                      placeholder={t('userManagement.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="email"
                      label={t('userManagement.email')}
                      placeholder={t('userManagement.email')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('userManagement.username')}
                      name="username"
                      placeholder={t('userManagement.username')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="fullName"
                      label={t('userManagement.fullName')}
                      placeholder={t('userManagement.fullName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      name="dateOfBirth"
                      label={t('userManagement.dateOfBirth')}
                      placeholder={t('userManagement.dateOfBirth')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="phone"
                      label={t('userManagement.phone')}
                      placeholder={t('userManagement.phone')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1}>
                      {t('userManagement.workInfo')}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="companyId"
                      label={t('userManagement.companyName')}
                      placeholder={t('userManagement.companyName')}
                      options={[userInfo?.company]}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="costCenters"
                      label={t('userManagement.costCenter')}
                      placeholder={t('userManagement.costCenter')}
                      value={userInfo?.costCenters
                        ?.map((item) => item?.code)
                        ?.join(', ')}
                      disabled
                    />
                  </Grid>

                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="departmentSettings"
                      label={t('userManagement.department')}
                      placeholder={t('userManagement.department')}
                      getOptionLabel={(opt) =>
                        opt?.code && opt?.name
                          ? `${opt?.code} - ${opt?.name}`
                          : opt?.code || opt?.name
                      }
                      asyncRequest={(s) =>
                        searchDepartmentListApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            status: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      onChange={() => {
                        setFieldValue('division', null)
                        setFieldValue('section', null)
                      }}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="division"
                      label={t('userManagement.division')}
                      placeholder={t('userManagement.division')}
                      asyncRequest={(s) =>
                        searchDefineDivisionApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            status: COST_CENTER_STATUS.ACTIVE,
                            departmentIds: values?.departmentSettings?.id,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      asyncRequestDeps={values?.departmentSettings?.id}
                      getOptionLabel={(opt) =>
                        opt?.code && (opt?.name || opt?.vName)
                          ? `${opt?.code} - ${opt?.name || opt?.vName}`
                          : opt?.code || opt?.name || opt?.vName
                      }
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      onChange={() => {
                        setFieldValue('section', null)
                      }}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="section"
                      label={t('userManagement.section')}
                      placeholder={t('userManagement.section')}
                      asyncRequest={(s) =>
                        searchDefineSectionApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            status: COST_CENTER_STATUS.ACTIVE,
                            divisionIds: values?.division?.id,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      asyncRequestDeps={values?.division?.id}
                      getOptionLabel={(opt) =>
                        opt?.code && (opt?.name || opt?.vName)
                          ? `${opt?.code} - ${opt?.name || opt?.vName}`
                          : opt?.code || opt?.name || opt?.vName
                      }
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="userRoleSettings"
                      label={t('userManagement.roleAssign')}
                      placeholder={t('userManagement.roleAssign')}
                      options={userInfo?.userRoleSettings || []}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionValue={(opt) => opt?.id}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default UserInfoForm
