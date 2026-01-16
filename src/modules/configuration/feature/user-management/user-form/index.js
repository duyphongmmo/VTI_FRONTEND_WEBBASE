import React, { useEffect, useMemo, useState } from 'react'

import { Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { sub } from 'date-fns'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  ASYNC_SEARCH_LIMIT,
  ACTIVE_STATUS,
  COST_CENTER_STATUS,
  SUPER_ADMIN_CODE,
} from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { USER_MANAGEMENT_STATUS_OPTIONS } from '~/modules/configuration/constants'
import useUserManagement from '~/modules/configuration/redux/hooks/useUserManagement'
import { searchDefineDivisionApi } from '~/modules/configuration/redux/sagas/define-division/search'
import { searchDefineSectionApi } from '~/modules/configuration/redux/sagas/define-section/search'
import { searchDepartmentListApi } from '~/modules/configuration/redux/sagas/department-list/search-department-list'
import { searchRoleListApi } from '~/modules/configuration/redux/sagas/role-list/search-role-list'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertFilterParams } from '~/utils'
import qs from '~/utils/qs'

import { validationSchema } from './schema'

function UserManagementForm() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const params = useParams()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const routeMatch = useRouteMatch()
  const { canAccess } = useApp()
  const { withSearch } = useQueryState()

  const MODE_MAP = {
    [ROUTE.USER_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.USER_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const [visible, setVisible] = useState(false)

  const {
    data: { userDetails, isLoading },
    actions,
  } = useUserManagement()

  const initialValues = useMemo(() => {
    return {
      code: isUpdate ? userDetails?.code : '',
      username: isUpdate ? userDetails?.username : '',
      password: isUpdate ? userDetails?.password : '',
      showPassword: false,
      fullName: userDetails?.fullName || '',
      dateOfBirth: userDetails?.dateOfBirth || null,
      email: userDetails?.email || '',
      phone: userDetails?.phone || '',
      status: userDetails?.status || 0,
      factories: userDetails.factories || [],
      division:
        userDetails?.divisions?.[0] ||
        userDetails?.sections?.[0]?.division ||
        null,
      section: userDetails?.sections?.[0] || null,
      department: userDetails?.departmentSettings?.[0] || null,
      departmentSettings: userDetails?.departmentSettings?.[0] || null,
      costCenters:
        userDetails?.costCenters ||
        (!!userDetails?.costCenter && [userDetails?.costCenter]) ||
        [],
      userRoleSettings: userDetails?.userRoleSettings?.[0] || null,
      userWarehouses: userDetails?.userWarehouses || [],
    }
  }, [userDetails, isUpdate])
  useEffect(() => {
    if (isUpdate) {
      const id = params?.id
      actions.getUserDetailsById(id)
    }
    if (cloneId) {
      actions.getUserDetailsById(cloneId)
    }
    return () => {
      actions.resetUserDetailsState()
    }
  }, [params?.id, cloneId])

  const onSubmit = (values) => {
    const id = Number(params?.id)

    const convertValues = {
      // ...values,
      id,
      code: values?.code?.trim(),
      username: values?.username?.trim(),
      fullName: values?.fullName?.trim(),
      email: values?.email?.trim(),
      phone: values?.phone?.trim(),
      dateOfBirth: values?.dateOfBirth,
      password: values?.password?.trim(),
      status: values?.status?.toString(),
      factories: values?.factories?.map((item) => ({
        id: item?.id,
      })),
      costCenterId: values?.costCenters?.[0]?.id || null,
      costCenterIds: values?.costCenters?.map((item) => item?.id),
      userRoleSettings: values.userRoleSettings
        ? [{ id: values.userRoleSettings?.id }]
        : [{ id: 1 }],
      departmentSettings: values?.departmentSettings
        ? [{ id: values?.departmentSettings?.id }]
        : [],
      divisionIds: values?.division ? [values?.division?.id] : [],
      sectionIds: values?.section ? [values?.section?.id] : [],
      companyId: 1,
      userWarehouses: values?.userWarehouses?.map((item) => ({
        id: item?.id,
      })),
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createUser(convertValues, (res) =>
        canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
          ? history.push(
              ROUTE.USER_MANAGEMENT.DETAIL.PATH.replace(':id', res?.id),
            )
          : backToList(),
      )
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateUser(convertValues, () =>
        canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
          ? history.push(
              ROUTE.USER_MANAGEMENT.DETAIL.PATH.replace(
                ':id',
                convertValues?.id,
              ),
            )
          : backToList(),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.DECENTRALIZATION.TITLE,
      },
      {
        route: withSearch(ROUTE.USER_MANAGEMENT.LIST.PATH),
        title: ROUTE.USER_MANAGEMENT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.USER_MANAGEMENT.CREATE.PATH,
          title: ROUTE.USER_MANAGEMENT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.USER_MANAGEMENT.EDIT.PATH,
          title: ROUTE.USER_MANAGEMENT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  //TODO: user logged in is supper admin => Can update user info ?
  const isShowAction = useMemo(
    () => userDetails?.code !== SUPER_ADMIN_CODE,
    [userDetails?.code],
  )
  const renderActionBar = (handleReset, values) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={!isShowAction ? null : handleReset}
            mode={!isShowAction ? null : MODAL_MODE.UPDATE}
            elBefore={
              <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    actions.resetPassword({ email: values?.email })
                  }
                  sx={{ mr: 'auto' }}
                >
                  {t('userManagement.resetPassword')}
                </Button>
              </Guard>
            }
          />
        )
      default:
        break
    }
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.USER_MANAGEMENT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.USER_MANAGEMENT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.USER_MANAGEMENT.LIST.PATH))
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      {isUpdate && (
        <ActionBar
          variant="top"
          status={
            <Status
              options={USER_MANAGEMENT_STATUS_OPTIONS}
              value={userDetails?.status}
            />
          }
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t, mode)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => (
          <Form>
            <HotKeys
              handlers={{
                onReset: handleReset,
                onBack: backToList,
              }}
            />
            <Grid container justifyContent="center">
              <Grid
                item
                xl={12}
                xs={12}
                sx={() => ({
                  justifyContent: 'center',
                  bgcolor: 'bg.block',
                  borderRadius: 1,
                  mb: 1,
                  px: 5,
                  pr: 1,
                  py: 1,
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
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC_DOT_SHIFT_ENDASH}
                      disabled={isUpdate}
                      required
                      {...(cloneId ? { autoFocus: true } : {})}
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
                        autoComplete: 'off',
                      }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  {!isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="password"
                        type={visible ? 'text' : 'password'}
                        label={t('userManagement.password')}
                        placeholder={t('userManagement.password')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MAX,
                          autoComplete: 'new-password',
                        }}
                        endAdornment={
                          <IconButton
                            onClick={() => setVisible(!visible)}
                            size="small"
                            sx={{ mx: 0.5 }}
                          >
                            {visible ? (
                              <Icon name="visible" />
                            ) : (
                              <Icon name="invisible" />
                            )}
                          </IconButton>
                        }
                        required
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS}
                      />
                    </Grid>
                  )}
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="status"
                        label={t('userManagement.status')}
                        placeholder={t('userManagement.status')}
                        options={USER_MANAGEMENT_STATUS_OPTIONS}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => t(opt?.text)}
                        required
                      />
                    </Grid>
                  )}
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
                      maxDate={sub(new Date(), { days: 1 })}
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
                </Grid>
              </Grid>
              <Grid
                item
                xl={12}
                xs={12}
                sx={() => ({
                  justifyContent: 'center',
                  bgcolor: 'bg.block',
                  borderRadius: 1,
                  mb: 1,
                  px: 5,
                  pr: 1,
                  py: 1,
                })}
              >
                <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1}>
                      {t('userManagement.workInfo')}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="departmentSettings"
                      label={t('userManagement.department')}
                      placeholder={t('userManagement.department')}
                      getOptionLabel={(opt) => opt?.name}
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
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="division"
                      label={t('userManagement.section')}
                      placeholder={t('userManagement.section')}
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
                      getOptionLabel={(opt) => opt?.name || opt?.vName}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      onChange={() => {
                        setFieldValue('section', null)
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="section"
                      label={t('userManagement.division')}
                      placeholder={t('userManagement.division')}
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
                      getOptionLabel={(opt) => opt?.name || opt?.vName}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>

                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="userRoleSettings"
                      label={t('userManagement.role')}
                      placeholder={t('userManagement.role')}
                      getOptionLabel={(opt) => opt?.name}
                      asyncRequest={(s) =>
                        searchRoleListApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            status: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {renderActionBar(handleReset, values)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default UserManagementForm
