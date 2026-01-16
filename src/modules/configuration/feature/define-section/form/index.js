import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
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
  DEFINE_SECTION_ENUM,
  DEFINE_SECTION_ENUM_OPTIONS,
} from '~/modules/configuration/constants'
import useDefineSection from '~/modules/configuration/redux/hooks/useDefineSection'
import { searchDefineDivisionApi } from '~/modules/configuration/redux/sagas/define-division/search'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertFilterParams } from '~/utils'

import { defineDivisionSchema } from './schema'

function DefineSectionForm() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()

  const {
    data: { details, isLoading },
    actions,
  } = useDefineSection()

  const MODE_MAP = {
    [ROUTE.DEFINE_SECTION.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_SECTION.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isCreate = mode === MODAL_MODE.CREATE

  useEffect(() => {
    if (isUpdate) {
      actions.getDefineSectionDetailById(id)
    }
    return () => actions.resetDefineSectionDetailState()
  }, [id])

  const initialValues = {
    code: details?.code || '',
    eName: details?.eName || '',
    vName: details?.vName || '',
    jName: details?.jName || '',
    division: isUpdate ? details?.division : null,
    description: details?.description || '',
  }

  const onSubmit = (val) => {
    const convertValues = {
      ...val,
      divisionId: val?.division?.id,
      isDraft: isCreate
        ? true
        : details?.status === DEFINE_SECTION_ENUM.DRAFT
        ? true
        : false,
    }
    if (isUpdate) {
      actions.updateDefineSection(
        { ...convertValues, id },
        canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
          ? () =>
              history.push(ROUTE.DEFINE_SECTION.DETAIL.PATH.replace(':id', id))
          : backToList,
      )
    } else {
      actions.createDefineSection(
        convertValues,
        canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
          ? (data) =>
              history.push(
                ROUTE.DEFINE_SECTION.DETAIL.PATH.replace(':id', data?.id),
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
        route: withSearch(ROUTE.DEFINE_SECTION.LIST.PATH),
        title: ROUTE.DEFINE_SECTION.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_SECTION.CREATE.PATH,
          title: ROUTE.DEFINE_SECTION.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_SECTION.EDIT.PATH,
          title: ROUTE.DEFINE_SECTION.EDIT.TITLE,
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
        return ROUTE.DEFINE_SECTION.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_SECTION.EDIT.TITLE
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
    history.push(withSearch(ROUTE.DEFINE_SECTION.LIST.PATH))
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
              options={DEFINE_SECTION_ENUM_OPTIONS}
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
                      label={t('defineSection.code')}
                      name="code"
                      placeholder={t('defineSection.code')}
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
                      label={t('defineSection.enName')}
                      name="eName"
                      placeholder={t('defineSection.enName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS_SPACE}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      label={t('defineSection.division')}
                      name="division"
                      placeholder={t('defineSection.division')}
                      asyncRequest={(s) =>
                        searchDefineDivisionApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            status: DEFINE_DIVISION_ENUM.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => `${opt?.vName}`}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineSection.viName')}
                      name="vName"
                      placeholder={t('defineSection.viName')}
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
                      label={t('defineSection.jpName')}
                      name="jName"
                      placeholder={t('defineSection.jpName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.REGEX_CODE_JAPANESE}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineSection.description')}
                      placeholder={t('defineSection.description')}
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

export default DefineSectionForm
