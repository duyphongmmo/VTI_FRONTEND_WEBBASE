import React, { useEffect, useMemo } from 'react'

import { Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ACTIVE_STATUS_OPTIONS,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Page from '~/components/Page'
import Status from '~/components/Status'
import useRoleManagement from '~/modules/configuration/redux/hooks/useRoleList'
import { ROUTE } from '~/modules/configuration/routes/config'

import { formSchema } from './schema'

function DefineRoleForm() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const { withSearch } = useQueryState()

  const {
    data: { isLoading, roleDetail },
    actions,
  } = useRoleManagement()

  const MODE_MAP = {
    [ROUTE.ROLE_LIST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ROLE_LIST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: roleDetail?.code || '',
      name: roleDetail?.name || '',
      description: roleDetail?.description || '',
    }),
    [roleDetail],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'decentralization',
      },
      {
        route: withSearch(ROUTE.ROLE_LIST.LIST.PATH),
        title: ROUTE.ROLE_LIST.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.ROLE_LIST.CREATE.PATH,
          title: ROUTE.ROLE_LIST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.ROLE_LIST.EDIT.PATH,
          title: ROUTE.ROLE_LIST.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getRoleAssignDetails(id)
    }
    return () => {
      actions.resetRoleAssignDetailsState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.ROLE_LIST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ROLE_LIST.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.ROLE_LIST.LIST.PATH))
  }

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createRoleAssign(convertValues, (data) =>
        history.push(ROUTE.ROLE_LIST.DETAIL.PATH.replace(':id', data?.id)),
      )
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...convertValues,
        id: +id,
      }
      actions.updateRoleAssign(paramUpdate, () =>
        history.push(ROUTE.ROLE_LIST.DETAIL.PATH.replace(':id', id)),
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
              value={roleDetail?.status}
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
            {({ handleReset }) => (
              <Form>
                <HotKeys
                  handlers={{
                    onReset: handleReset,
                    onBack: backToList,
                  }}
                />
                <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('roleManagement.code')}
                      placeholder={t('roleManagement.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      disabled={isUpdate}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC_DOT_SHIFT_ENDASH}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('roleManagement.name')}
                      placeholder={t('roleManagement.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('roleManagement.description')}
                      placeholder={t('roleManagement.description')}
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

export default DefineRoleForm
