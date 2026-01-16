import { useEffect, useMemo } from 'react'

import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import HotKeys from '~/components/HotKeys'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  COST_CENTER_STATUS,
  COST_CENTER_STATUS_OPTIONS,
} from '~/modules/configuration/constants'
import useDefineCostCenter from '~/modules/configuration/redux/hooks/useCostCenter'
import { ROUTE } from '~/modules/configuration/routes/config'

import CostCenterGeneralInformation from './general-information-tab'
import { costCenterSchema } from './schema'

function DefineCostCenterForm() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()

  const {
    data: { details, isLoading },
    actions,
  } = useDefineCostCenter()

  const MODE_MAP = {
    [ROUTE.DEFINE_COST_CENTER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_COST_CENTER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isCreate = mode === MODAL_MODE.CREATE

  useEffect(() => {
    if (isUpdate) {
      actions.getCostCenterDetailsById(id)
    }
    return () => actions.resetCostCenterDetailsState()
  }, [id])

  const initialValues = useMemo(
    () => ({
      code: details?.code || '',
      name: details?.name || '',
      location: details?.location || null,
      accountingLocationCode: details?.accLocCode || null,
      accountingCodeCenter: details?.accCodeCenter || null,
      description: details?.description || '',
    }),
    [details],
  )

  const onSubmit = (val) => {
    const convertValues = {
      code: val?.code,
      name: val?.name,
      description: val?.description,
      accLocCode: val?.accountingLocationCode,
      accCodeCenter: val?.accountingCodeCenter,
      ...(val?.location && {
        location: {
          id: isUpdate ? val?.location?.id : val?.location?._id,
          code: val?.location?.code,
          name: val?.location?.name,
          description: val?.location?.description,
        },
      }),
      isDraft: isCreate
        ? true
        : details?.status === COST_CENTER_STATUS.DRAFT
        ? true
        : false,
    }
    if (isUpdate) {
      actions.updateCostCenter(
        { ...convertValues, id },
        canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
          ? () =>
              history.push(
                ROUTE.DEFINE_COST_CENTER.DETAIL.PATH.replace(':id', id),
              )
          : backToList,
      )
    } else {
      actions.createCostCenter(
        convertValues,
        canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
          ? (data) =>
              history.push(
                ROUTE.DEFINE_COST_CENTER.DETAIL.PATH.replace(':id', data?.id),
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
        route: withSearch(ROUTE.DEFINE_COST_CENTER.LIST.PATH),
        title: ROUTE.DEFINE_COST_CENTER.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_COST_CENTER.CREATE.PATH,
          title: ROUTE.DEFINE_COST_CENTER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_COST_CENTER.EDIT.PATH,
          title: ROUTE.DEFINE_COST_CENTER.EDIT.TITLE,
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
        return ROUTE.DEFINE_COST_CENTER.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_COST_CENTER.EDIT.TITLE
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
    history.push(withSearch(ROUTE.DEFINE_COST_CENTER.LIST.PATH))
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
              options={COST_CENTER_STATUS_OPTIONS}
              value={details?.status}
            />
          }
        />
      )}
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={costCenterSchema(t)}
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
                <CostCenterGeneralInformation mode={mode} />

                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineCostCenterForm
