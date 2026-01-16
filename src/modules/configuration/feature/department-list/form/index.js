import React, { useEffect, useMemo } from 'react'

import { Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  TEXTFIELD_ALLOW,
  MODAL_MODE,
  ACTIVE_STATUS_OPTIONS,
} from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Page from '~/components/Page'
import Status from '~/components/Status'
import useDepartmentList from '~/modules/configuration/redux/hooks/useDepartmentList'
import { ROUTE } from '~/modules/configuration/routes/config'

import { validationSchema } from './schema'

function DepartmentForm() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { canAccess } = useApp()
  const { id } = useParams()
  const { refreshKey, clearRefreshKey } = useApp()
  const { withSearch } = useQueryState()

  const MODE_MAP = {
    [ROUTE.DEPARTMENT_LIST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEPARTMENT_LIST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const {
    data: { departmentDetail, isLoading },
    actions,
  } = useDepartmentList()

  const initialValues = useMemo(
    () => ({
      code: departmentDetail?.code || '',
      enName: departmentDetail?.enName || '',
      vnName: departmentDetail?.vnName || '',
      jName: departmentDetail?.jName || '',
      description: departmentDetail?.description || '',
      factories: departmentDetail?.factories || [],
    }),
    [departmentDetail],
  )
  useEffect(() => {
    if (id) {
      actions.getDepartmentDetailsById(id)
    }
    return () => {
      actions.resetDepartmentDetailsState()
    }
  }, [id])

  useEffect(() => {
    if (refreshKey) {
      if (id === refreshKey.toString()) {
        history.push(ROUTE.DEPARTMENT_LIST.DETAIL.PATH.replace(':id', id))
      }

      clearRefreshKey()
    }
  }, [refreshKey, id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEPARTMENT_LIST.LIST.PATH))
  }

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
      factoryIds: values.factories.map((item) => item.id),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createDepartment(convertValues, (data) =>
        canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
          ? history.push(
              ROUTE.DEPARTMENT_LIST.DETAIL.PATH.replace(':id', data?.id),
            )
          : backToList(),
      )
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateDepartment({ ...convertValues, id }, () =>
        canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
          ? history.push(ROUTE.DEPARTMENT_LIST.DETAIL.PATH.replace(':id', id))
          : backToList(),
      )
    }
  }

  const renderActionBar = (handleReset) => {
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
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.DECENTRALIZATION.TITLE,
      },
      {
        route: withSearch(ROUTE.DEPARTMENT_LIST.LIST.PATH),
        title: ROUTE.DEPARTMENT_LIST.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEPARTMENT_LIST.CREATE.PATH,
          title: ROUTE.DEPARTMENT_LIST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEPARTMENT_LIST.EDIT.PATH,
          title: ROUTE.DEPARTMENT_LIST.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEPARTMENT_LIST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEPARTMENT_LIST.EDIT.TITLE
      default:
        break
    }
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
              options={ACTIVE_STATUS_OPTIONS}
              value={departmentDetail?.status}
            />
          }
        />
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset }) => (
          <Form>
            <HotKeys
              handlers={{
                onBack: backToList,
                onReset: handleReset,
              }}
            />
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('departmentList.code')}
                      name="code"
                      placeholder={t('departmentList.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC_DOT_SHIFT_ENDASH}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>

                  {/* <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="factories"
                      label={t('departmentList.factory')}
                      placeholder={t('departmentList.factory')}
                      asyncRequest={(s) =>
                        searchFactoriesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) =>
                        opt?.code && opt?.name
                          ? `${opt?.code} - ${opt?.name}`
                          : opt?.code || opt?.name
                      }
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      multiple
                      required
                    />
                  </Grid> */}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('departmentList.englishName')}
                      name="enName"
                      placeholder={t('departmentList.englishName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS_SPACE}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('departmentList.vnName')}
                      name="vnName"
                      placeholder={t('departmentList.vnName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('departmentList.japanName')}
                      name="jpName"
                      placeholder={t('departmentList.japanName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.REGEX_CODE_JAPANESE}
                    />
                  </Grid>
                  {/* <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="holon"
                      label={t('departmentList.holon')}
                      placeholder={t('departmentList.holon')}
                      inputProps={{
                        maxLength: CODE_SETTINGS.HOLON.MAX_LENGTH,
                      }}
                      onInput={(val) => {
                        if (val?.indexOf(CODE_SETTINGS.HOLON.PREFIX) !== 0) {
                          return
                        }
                        setFieldValue('holon', val)
                      }}
                      required
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('departmentList.description')}
                      placeholder={t('departmentList.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
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

export default DepartmentForm
