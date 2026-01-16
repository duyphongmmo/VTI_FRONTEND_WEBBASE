import React, { useMemo } from 'react'

import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'

import {
  HTTP_STATUS_CODE,
  MODAL_MODE,
  NOTIFICATION_TYPE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/configuration/routes/config'
import addNotification from '~/utils/toast'

import {
  useCreateLocation,
  useGetLocationDetail,
  useUpdateLocation,
} from '../api'
import { validationSchema } from './schema'

const LocationForm = () => {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()

  const MODE_MAP = {
    [ROUTE.LOCATION.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.LOCATION.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        route: withSearch(ROUTE.LOCATION.LIST.PATH),
        title: ROUTE.LOCATION.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.LOCATION.CREATE.PATH,
          title: ROUTE.LOCATION.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.LOCATION.EDIT.PATH,
          title: ROUTE.LOCATION.EDIT.TITLE,
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
        return ROUTE.LOCATION.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.LOCATION.EDIT.TITLE
      default:
    }
  }

  const backToDetail = () => {
    history.push(withSearch(ROUTE.LOCATION.DETAIL.PATH.replace(':id', `${id}`)))
  }

  const { trigger: actionCreate, isMutating: isLoadingCreate } =
    useCreateLocation()

  const { trigger: actionUpdate, isMutating: isLoadingUpdate } =
    useUpdateLocation()

  const { itemDetail, isLoading: isLoadingDetail } = useGetLocationDetail(id)

  const backToList = () => {
    history.push(withSearch(ROUTE.LOCATION.LIST.PATH))
  }

  const renderActionBar = (resetForm) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={resetForm}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={resetForm}
            mode={MODAL_MODE.UPDATE}
          />
        )

      default:
    }
  }

  const initialValues = useMemo(() => {
    return {
      code: itemDetail?.code || '',
      name: itemDetail?.name || '',
      description: itemDetail?.description || '',
    }
  })

  const onSubmit = (values) => {
    const convertData = {
      code: values?.code,
      name: values?.name,
      description: values?.description,
    }

    if (mode === MODAL_MODE.CREATE) {
      actionCreate(convertData, {
        onSuccess: (res) => {
          if (res?.statusCode === HTTP_STATUS_CODE.SUCCESS) {
            backToList()
            addNotification(res?.message, NOTIFICATION_TYPE.SUCCESS)
          } else {
            addNotification(res?.message, NOTIFICATION_TYPE.ERROR)
          }
        },
      })
    } else if (mode === MODAL_MODE.UPDATE) {
      actionUpdate(
        { convertData, id },
        {
          onSuccess: (res) => {
            if (res?.statusCode === HTTP_STATUS_CODE.SUCCESS) {
              canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
                ? backToDetail()
                : backToList()
              addNotification(res?.message, NOTIFICATION_TYPE.SUCCESS)
            } else {
              addNotification(res?.message, NOTIFICATION_TYPE.ERROR)
            }
          },
        },
      )
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoadingCreate || isLoadingUpdate || isLoadingDetail}
      onBack={backToList}
      fitScreen
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema(t)}
        enableReinitialize
      >
        {({ resetForm }) => {
          return (
            <Form>
              <HotKeys
                handlers={{
                  onBack: backToList,
                  onReset: resetForm,
                }}
              />
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="code"
                        label={t('location.code')}
                        placeholder={t('location.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_25.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="name"
                        label={t('location.name')}
                        placeholder={t('location.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('location.description')}
                        placeholder={t('location.description')}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {renderActionBar(resetForm)}
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default LocationForm
