import { useEffect, useMemo } from 'react'

import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
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
  COST_CENTER_STATUS,
  HOLON_STATUS_OPTIONS,
} from '~/modules/configuration/constants'
import useHolon from '~/modules/configuration/redux/hooks/useHolon'
import { ROUTE } from '~/modules/configuration/routes/config'

import { formSchema } from './schema'

function HolonForm() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()

  const {
    data: { holonDetail, isLoading },
    actions,
  } = useHolon()

  const MODE_MAP = {
    [ROUTE.HOLON.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.HOLON.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isCreate = mode === MODAL_MODE.CREATE

  useEffect(() => {
    if (isUpdate) {
      actions.getHolonDetailsById(id)
    }
    return () => actions.resetHolonDetailsState()
  }, [id])

  const initialValues = useMemo(
    () => ({
      code: holonDetail?.code || '',
      name: holonDetail?.name || '',
      description: holonDetail?.description || '',
    }),
    [holonDetail],
  )

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
      isDraft: isCreate
        ? true
        : holonDetail?.status === COST_CENTER_STATUS.DRAFT
        ? true
        : false,
    }
    if (isUpdate) {
      actions.updateHolon(
        { ...convertValues, id },
        canAccess(FUNCTION_CODE.DETAIL_HOLON)
          ? () => history.push(ROUTE.HOLON.DETAIL.PATH.replace(':id', id))
          : backToList,
      )
    } else {
      actions.createHolon(
        convertValues,
        canAccess(FUNCTION_CODE.DETAIL_HOLON)
          ? (data) =>
              history.push(ROUTE.HOLON.DETAIL.PATH.replace(':id', data?.id))
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
        route: withSearch(ROUTE.HOLON.LIST.PATH),
        title: ROUTE.HOLON.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.HOLON.CREATE.PATH,
          title: ROUTE.HOLON.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.HOLON.EDIT.PATH,
          title: ROUTE.HOLON.EDIT.TITLE,
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
        return ROUTE.HOLON.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.HOLON.EDIT.TITLE
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
    history.push(withSearch(ROUTE.HOLON.LIST.PATH))
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
              options={HOLON_STATUS_OPTIONS}
              value={holonDetail?.status}
            />
          }
        />
      )}
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, setFieldValue }) => (
              <Form>
                <HotKeys
                  handlers={{
                    onBack: backToList,
                    onReset: handleReset,
                  }}
                />
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('holon.code')}
                      placeholder={t('holon.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_3.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      onInput={(val) =>
                        setFieldValue('code', val?.toUpperCase())
                      }
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('holon.name')}
                      placeholder={t('holon.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('holon.description')}
                      placeholder={t('holon.description')}
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

export default HolonForm
