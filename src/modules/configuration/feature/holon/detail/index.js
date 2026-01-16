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
  FIELDS_LOG_HISTORY_HOLON,
  FIELDS_LOG_HISTORY_HOLON_MAP,
  HOLON_STATUS,
  HOLON_STATUS_MAP,
  HOLON_STATUS_OPTIONS,
} from '~/modules/configuration/constants'
import useHolon from '~/modules/configuration/redux/hooks/useHolon'
import { ROUTE } from '~/modules/configuration/routes/config'

import DialogApprove from '../list/dialogs/approve'
import DialogChangeStatus from '../list/dialogs/change-status'
import DialogDelete from '../list/dialogs/delete'

function HolonDetail() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenChangeStatus, setIsOpenChangeStatus] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenApprove, setIsOpenApprove] = useState(false)
  const breadcrumbs = [
    {
      title: 'decentralization',
    },
    {
      route: withSearch(ROUTE.HOLON.LIST.PATH),
      title: ROUTE.HOLON.LIST.TITLE,
    },
    {
      title: ROUTE.HOLON.DETAIL.TITLE,
    },
  ]

  const {
    data: { holonDetail, isLoading },
    actions,
  } = useHolon()

  const refreshData = () => {
    actions.getHolonDetailsById(id)
  }

  useEffect(() => {
    refreshData()
    return () => actions.resetHolonDetailsState()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.HOLON.LIST.PATH))
  }

  const onSubmitChangeStatus = () => {
    actions.changeStatusHolon(
      {
        id: id,
        type:
          holonDetail?.status === HOLON_STATUS.ACTIVE
            ? HOLON_STATUS.INACTIVE
            : HOLON_STATUS.ACTIVE,
      },
      refreshData,
    )
    setIsOpenChangeStatus(false)
  }

  const onSubmitDelete = () => {
    actions.deleteHolon(id, backToList)
    setIsOpenDelete(false)
  }

  const onSubmitApprove = () => {
    actions.changeStatusHolon(
      {
        id: id,
        type: HOLON_STATUS.ACTIVE,
      },
      refreshData,
    )
    setIsOpenApprove(false)
  }
  const isActive = holonDetail?.status === HOLON_STATUS.ACTIVE
  const isInActive = holonDetail?.status === HOLON_STATUS.INACTIVE
  const isDraft = holonDetail?.status === HOLON_STATUS.DRAFT

  const actionBefore = () => {
    return (
      <>
        {isDraft && (
          <Guard code={FUNCTION_CODE.CHANGE_STATUS_HOLON}>
            <Button
              icon="tick"
              onClick={() => setIsOpenApprove(true)}
              iconColor="primary"
              color="primary"
              variant="outlined"
            >
              {t('holon.approveButton')}
            </Button>
          </Guard>
        )}
        {isActive && (
          <Guard code={FUNCTION_CODE.CHANGE_STATUS_HOLON}>
            <Button
              icon="active"
              onClick={() => setIsOpenChangeStatus(true)}
              color="error"
              variant="outlined"
              iconColor="error"
            >
              {t('holon.inactiveButton')}
            </Button>
          </Guard>
        )}
        {isInActive && (
          <Guard code={FUNCTION_CODE.CHANGE_STATUS_HOLON}>
            <Button
              icon="inActive"
              onClick={() => setIsOpenChangeStatus(true)}
              color="success"
              variant="outlined"
              iconColor="success"
            >
              {t('holon.activeButton')}
            </Button>
          </Guard>
        )}
      </>
    )
  }

  const getHistory = () => {
    const histories = []
    holonDetail?.histories?.forEach((item) => {
      if (item?.action === HISTORY_ACTION.CREATE) {
        histories.push({
          content: t('holon.history.create'),
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
                <Typography>{t('holon.history.update')}</Typography>
                <List sx={{ padding: 0 }}>
                  {(item?.fieldChanges || []).map((value, index) => {
                    let content = ''
                    switch (value?.changedField) {
                      case FIELDS_LOG_HISTORY_HOLON.STATUS:
                        content = `${t(
                          FIELDS_LOG_HISTORY_HOLON_MAP[value?.changedField],
                        )}: ${t(HOLON_STATUS_MAP[value?.oldValue])} -> ${t(
                          HOLON_STATUS_MAP[value?.newValue],
                        )}`
                        break
                      default:
                        content = `${t(
                          FIELDS_LOG_HISTORY_HOLON_MAP[value?.changedField],
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
      title={t('menu.holonDetail')}
      loading={isLoading}
      onBack={backToList}
      freeSolo
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          ...(canAccess(FUNCTION_CODE.UPDATE_HOLON)
            ? {
                onEdit: () =>
                  history.push(ROUTE.HOLON.EDIT.PATH.replace(':id', id)),
              }
            : {}),
          ...(isDraft && canAccess(FUNCTION_CODE.DELETE_HOLON)
            ? { onDelete: () => setIsOpenDelete(true) }
            : {}),
        }}
      />

      <Paper sx={{ p: 1 }}>
        <ActionBar
          variant="top"
          elBefore={actionBefore}
          {...(canAccess(FUNCTION_CODE.UPDATE_HOLON)
            ? {
                onEdit: () =>
                  history.push(ROUTE.HOLON.EDIT.PATH.replace(':id', id)),
              }
            : {})}
          {...(isDraft && canAccess(FUNCTION_CODE.DELETE_HOLON)
            ? { onDelete: () => setIsOpenDelete(true) }
            : {})}
          status={
            <Status
              options={HOLON_STATUS_OPTIONS}
              value={holonDetail?.status}
            />
          }
        />
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item lg={6} xs={12}>
                <LabelValue label={t('holon.code')} value={holonDetail?.code} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue label={t('holon.name')} value={holonDetail?.name} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('defineDivision.description')}
                  multiline
                  rows={3}
                  value={holonDetail?.description}
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
        tempItem={holonDetail}
      />
      <DialogDelete
        open={isOpenDelete}
        onCancel={() => setIsOpenDelete(false)}
        onSubmit={onSubmitDelete}
        tempItem={holonDetail}
      />
      <DialogApprove
        open={isOpenApprove}
        onCancel={() => setIsOpenApprove(false)}
        onSubmit={onSubmitApprove}
        tempItem={holonDetail}
      />
    </Page>
  )
}

export default HolonDetail
