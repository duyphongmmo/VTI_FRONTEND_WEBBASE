import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ACTIVE_STATUS,
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  DEFINE_DIVISION_ENUM,
  DEFINE_DIVISION_ENUM_OPTIONS,
} from '~/modules/configuration/constants'
import useDefineDivision from '~/modules/configuration/redux/hooks/useDefineDivision'
import { searchDepartmentListApi } from '~/modules/configuration/redux/sagas/department-list/search-department-list'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertFilterParams } from '~/utils'

import { defineDivisionSchema } from './schema'

function DefineDivisionForm() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()

  const {
    data: { details, isLoading },
    actions,
  } = useDefineDivision()

  const MODE_MAP = {
    [ROUTE.DEFINE_DIVISION.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_DIVISION.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isCreate = mode === MODAL_MODE.CREATE

  useEffect(() => {
    if (isUpdate) {
      actions.getDefineDivisionDetailById(id)
    }
    return () => actions.resetDefineDivisionDetailState()
  }, [id])

  const initialValues = {
    code: details?.code || '',
    eName: details?.eName || '',
    vName: details?.vName || '',
    jName: details?.jName || '',
    department: isUpdate ? details?.department : null,
    description: details?.description || '',
  }

  const onSubmit = (val) => {
    const convertValues = {
      ...val,
      departmentId: val?.department?.id,
      isDraft: isCreate
        ? true
        : details?.status === DEFINE_DIVISION_ENUM.DRAFT
        ? true
        : false,
    }
    if (isUpdate) {
      actions.updateDefineDivision(
        { ...convertValues, id },
        canAccess(FUNCTION_CODE.DETAIL_DIVISION)
          ? () =>
              history.push(ROUTE.DEFINE_DIVISION.DETAIL.PATH.replace(':id', id))
          : backToList,
      )
    } else {
      actions.createDefineDivision(
        convertValues,
        canAccess(FUNCTION_CODE.DETAIL_DIVISION)
          ? (data) =>
              history.push(
                ROUTE.DEFINE_DIVISION.DETAIL.PATH.replace(':id', data?.id),
              )
          : backToList,
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'decentralization',
      },
      {
        route: withSearch(ROUTE.DEFINE_DIVISION.LIST.PATH),
        title: ROUTE.DEFINE_DIVISION.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_DIVISION.CREATE.PATH,
          title: ROUTE.DEFINE_DIVISION.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_DIVISION.EDIT.PATH,
          title: ROUTE.DEFINE_DIVISION.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }
  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_DIVISION.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_DIVISION.EDIT.TITLE
      default:
        break
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
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.DEFINE_DIVISION.LIST.PATH))
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      {isUpdate && (
        <ActionBar
          variant="top"
          status={
            <Status
              options={DEFINE_DIVISION_ENUM_OPTIONS}
              value={details?.status}
            />
          }
        />
      )}
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={defineDivisionSchema(t)}
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
                <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineDivision.code')}
                      name="code"
                      placeholder={t('defineDivision.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC_DOT_SHIFT_ENDASH}
                      required
                      disabled={isUpdate}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineDivision.eName')}
                      name="eName"
                      placeholder={t('defineDivision.eName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS_SPACE}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      label={t('defineDivision.department')}
                      name="department"
                      placeholder={t('defineDivision.department')}
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
                      getOptionLabel={(opt) => `${opt?.vnName}`}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineDivision.vName')}
                      name="vName"
                      placeholder={t('defineDivision.vName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.REGEX_CODE_VIETNAMESE_SPECIALS}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}></Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineDivision.jName')}
                      name="jName"
                      placeholder={t('defineDivision.jName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      // allow={TEXTFIELD_ALLOW.REGEX_CODE_JAPANESE}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineDivision.description')}
                      placeholder={t('defineDivision.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineDivisionForm
