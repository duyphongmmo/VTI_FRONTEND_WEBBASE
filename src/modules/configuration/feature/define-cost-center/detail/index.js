import { useEffect, useState } from 'react'

import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { HISTORY_ACTION } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Activities from '~/components/Activities'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  COST_CENTER_STATUS,
  COST_CENTER_STATUS_MAP,
  COST_CENTER_STATUS_OPTIONS,
  COST_CENTER_TYPE_MAP_VN,
  FIELDS_LOG_HISTORY_COST_CENTER,
  FIELDS_LOG_HISTORY_COST_CENTER_MAP,
  TOTALIZING_NAME_MAP_VN,
} from '~/modules/configuration/constants'
import useDefineCostCenter from '~/modules/configuration/redux/hooks/useCostCenter'
import { ROUTE } from '~/modules/configuration/routes/config'

import DialogApprove from '../dialogs/approve'
import DialogChangeStatus from '../dialogs/change-status'
import DialogDelete from '../dialogs/delete'
import DialogUpdateStatus from '../dialogs/update'

function DefineCostCenterDetail() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenChangeStatus, setIsOpenChangeStatus] = useState(false)
  const [isOpenUpdateStatus, setIsOpenUpdateStatus] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenApprove, setIsOpenApprove] = useState(false)
  const breadcrumbs = [
    {
      title: 'decentralization',
    },
    {
      route: withSearch(ROUTE.DEFINE_COST_CENTER.LIST.PATH),
      title: ROUTE.DEFINE_COST_CENTER.LIST.TITLE,
    },
    {
      title: ROUTE.DEFINE_COST_CENTER.DETAIL.TITLE,
    },
  ]

  const {
    data: { details, isLoading },
    actions,
  } = useDefineCostCenter()

  const refreshData = () => {
    actions.getCostCenterDetailsById(id)
  }

  useEffect(() => {
    refreshData()
    return () => actions.resetCostCenterDetailsState()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEFINE_COST_CENTER.LIST.PATH))
  }

  const onSubmitChangeStatus = () => {
    actions.changeStatusCostCenter(
      {
        id: id,
        type:
          details?.status === COST_CENTER_STATUS.ACTIVE
            ? COST_CENTER_STATUS.INACTIVE
            : COST_CENTER_STATUS.ACTIVE,
      },
      refreshData,
    )
    setIsOpenChangeStatus(false)
  }

  const onSubmitDelete = () => {
    actions.deleteCostCenter(id, backToList)
    setIsOpenDelete(false)
  }

  const onSubmitApprove = (values) => {
    actions.changeStatusCostCenter(
      {
        id: id,
        type: COST_CENTER_STATUS.ACTIVE,
        payload: {
          holonId: values?.holon?.id,
          usingDate: values?.usingDate,
        },
      },
      refreshData,
    )
    setIsOpenApprove(false)
  }

  const onSubmitUpdateStatus = (values) => {
    actions.changeStatusCostCenter(
      {
        id: id,
        type: COST_CENTER_STATUS.ACTIVE,
        payload: {
          usingDate: values?.usingDate,
        },
      },
      refreshData,
    )
    setIsOpenUpdateStatus(false)
  }

  const isActive = details?.status === COST_CENTER_STATUS.ACTIVE
  const isInActive = details?.status === COST_CENTER_STATUS.INACTIVE
  const isDraft = details?.status === COST_CENTER_STATUS.DRAFT

  const actionBefore = () => {
    return (
      <>
        {isDraft && (
          <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
            <Button
              icon="tick"
              onClick={() => setIsOpenApprove(true)}
              iconColor="primary"
              color="primary"
              variant="outlined"
            >
              {t('defineCostCenter.approveButton')}
            </Button>
          </Guard>
        )}
        {isActive && (
          <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
            <Button
              icon="active"
              onClick={() => setIsOpenChangeStatus(true)}
              color="error"
              variant="outlined"
              iconColor="error"
            >
              {t('defineCostCenter.inactiveButton')}
            </Button>
          </Guard>
        )}
        {isInActive && (
          <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
            <Button
              icon="inActive"
              // onClick={() => setIsOpenChangeStatus(true)}
              onClick={() =>
                details?.usingDate > new Date().toISOString()
                  ? setIsOpenUpdateStatus(true)
                  : setIsOpenChangeStatus(true)
              }
              color="success"
              variant="outlined"
              iconColor="success"
            >
              {t('defineCostCenter.activeButton')}
            </Button>
          </Guard>
        )}
      </>
    )
  }

  const getHistory = () => {
    const histories = []
    details?.histories?.forEach((item) => {
      if (item?.action === HISTORY_ACTION.CREATE) {
        histories.push({
          content: t('defineCostCenter.history.create'),
          createdAt: item?.createdAt,
          id: item?.id,
          username: item?.changedBy?.username,
        })
      } else {
        histories.push({
          createdAt: item?.createdAt,
          id: item?.id,
          username: item?.changedBy?.username,
          content: () => {
            return (
              <>
                <Typography>{t('defineCostCenter.history.update')}</Typography>
                <List sx={{ padding: 0 }}>
                  {(item?.fieldChanges || []).map((value, index) => {
                    let content = ''
                    switch (value?.changedField) {
                      case FIELDS_LOG_HISTORY_COST_CENTER.STATUS:
                        content = `${t(
                          FIELDS_LOG_HISTORY_COST_CENTER_MAP[
                            value?.changedField
                          ],
                        )}: ${t(
                          COST_CENTER_STATUS_MAP[value?.oldValue],
                        )} -> ${t(COST_CENTER_STATUS_MAP[value?.newValue])}`
                        break
                      case FIELDS_LOG_HISTORY_COST_CENTER.TYPE:
                        content = `${t(
                          FIELDS_LOG_HISTORY_COST_CENTER_MAP[
                            value?.changedField
                          ],
                        )}: ${t(
                          COST_CENTER_TYPE_MAP_VN[value?.oldValue],
                        )} -> ${t(COST_CENTER_TYPE_MAP_VN[value?.newValue])}`
                        break
                      case FIELDS_LOG_HISTORY_COST_CENTER.TOTALIZING_NAME:
                        content = `${t(
                          FIELDS_LOG_HISTORY_COST_CENTER_MAP[
                            value?.changedField
                          ],
                        )}: ${t(
                          TOTALIZING_NAME_MAP_VN[value?.oldValue],
                        )} -> ${t(TOTALIZING_NAME_MAP_VN[value?.newValue])}`
                        break

                      default:
                        content = `${t(
                          FIELDS_LOG_HISTORY_COST_CENTER_MAP[
                            value?.changedField
                          ],
                        )}: ${
                          value?.oldObjectValue?.code ||
                          value?.oldValue ||
                          t('general:common.null')
                        } -> ${
                          value?.newObjectValue?.code ||
                          value?.newValue ||
                          t('general:common.null')
                        }`
                        break
                    }
                    return (
                      <ListItem key={value?.changedField || index}>
                        <ListItemText sx={{ margin: 0 }} primary={content} />
                      </ListItem>
                    )
                  })}
                </List>
              </>
            )
          },
        })
      }
    })
    return histories
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineCostCenterDetail')}
      loading={isLoading}
      onBack={backToList}
      freeSolo
    >
      <HotKeys
        handlers={{
          onBack: backToList,

          ...(canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
            ? {
                onEdit: () =>
                  history.push(
                    ROUTE.DEFINE_COST_CENTER.EDIT.PATH.replace(':id', id),
                  ),
              }
            : {}),
          ...(isDraft && canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
            ? { onDelete: () => setIsOpenDelete(true) }
            : {}),
        }}
      />

      <Paper sx={{ p: 1 }}>
        <ActionBar
          variant="top"
          elBefore={actionBefore}
          {...(canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
            ? {
                onEdit: () =>
                  history.push(
                    ROUTE.DEFINE_COST_CENTER.EDIT.PATH.replace(':id', id),
                  ),
              }
            : {})}
          {...(isDraft && canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
            ? { onDelete: () => setIsOpenDelete(true) }
            : {})}
          status={
            <Status
              options={COST_CENTER_STATUS_OPTIONS}
              value={details?.status}
            />
          }
        />
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineCostCenter.code')}
                  value={details?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineCostCenter.name')}
                  value={details?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineCostCenter.accountingLocationCode')}
                  value={details?.accLocCode}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineCostCenter.accountingCodeCenter')}
                  value={details?.accCodeCenter}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineCostCenter.location')}
                  value={details?.location?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('defineCostCenter.description')}
                  multiline
                  rows={3}
                  value={details?.description}
                  readOnly
                  sx={{
                    'label.MuiFormLabel-root': {
                      color: (theme) => theme.palette.subText.main,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Activities data={getHistory()} />
      <DialogChangeStatus
        open={isOpenChangeStatus}
        onCancel={() => setIsOpenChangeStatus(false)}
        onSubmit={onSubmitChangeStatus}
        tempItem={details}
      />
      <DialogDelete
        open={isOpenDelete}
        onCancel={() => setIsOpenDelete(false)}
        onSubmit={onSubmitDelete}
        tempItem={details}
      />
      <DialogApprove
        open={isOpenApprove}
        onCancel={() => setIsOpenApprove(false)}
        onSubmit={onSubmitApprove}
        tempItem={details}
      />
      <DialogUpdateStatus
        open={isOpenUpdateStatus}
        onCancel={() => setIsOpenUpdateStatus(false)}
        onSubmit={onSubmitUpdateStatus}
        tempItem={details}
      />
    </Page>
  )
}

export default DefineCostCenterDetail
