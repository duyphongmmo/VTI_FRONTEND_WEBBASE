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
// import { FUNCTION_CODE } from '~/common/constants/functionCode'
// import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import Activities from '~/components/Activities'
import Button from '~/components/Button'
// import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  DEFINE_DIVISION_ENUM,
  DEFINE_DIVISION_ENUM_MAP,
  DEFINE_DIVISION_ENUM_OPTIONS,
  FIELDS_LOG_HISTORY_DIVISION,
  FIELDS_LOG_HISTORY_DIVISION_MAP,
} from '~/modules/configuration/constants'
import useDefineDivision from '~/modules/configuration/redux/hooks/useDefineDivision'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import DialogApprove from '../dialogs/approve'
import DialogChangeStatus from '../dialogs/change-status'
import DialogDelete from '../dialogs/delete'

function DefineDivisionDetail() {
  const { t } = useTranslation('configuration')
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  // const { canAccess } = useApp()
  const [isOpenChangeStatus, setIsOpenChangeStatus] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenApprove, setIsOpenApprove] = useState(false)
  const breadcrumbs = [
    {
      title: 'decentralization',
    },
    {
      route: withSearch(ROUTE.DEFINE_DIVISION.LIST.PATH),
      title: ROUTE.DEFINE_DIVISION.LIST.TITLE,
    },
    {
      title: ROUTE.DEFINE_DIVISION.DETAIL.TITLE,
    },
  ]

  const {
    data: { details, isLoading },
    actions,
  } = useDefineDivision()

  const refreshData = () => {
    actions.getDefineDivisionDetailById(id)
  }

  useEffect(() => {
    refreshData()
    return () => actions.resetDefineDivisionDetailState()
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEFINE_DIVISION.LIST.PATH))
  }

  const onSubmitChangeStatus = () => {
    actions.changeStatusDefineDivision(
      {
        id: id,
        type:
          details?.status === DEFINE_DIVISION_ENUM.ACTIVE
            ? DEFINE_DIVISION_ENUM.INACTIVE
            : DEFINE_DIVISION_ENUM.ACTIVE,
      },
      refreshData,
    )
    setIsOpenChangeStatus(false)
  }
  const isActive = details?.status === DEFINE_DIVISION_ENUM.ACTIVE
  const isInActive = details?.status === DEFINE_DIVISION_ENUM.INACTIVE
  const isDraft = details?.status === DEFINE_DIVISION_ENUM.DRAFT

  const getHistory = () => {
    const histories = []
    details?.histories?.forEach((item) => {
      if (item?.action === HISTORY_ACTION.CREATE) {
        histories.push({
          content: t('defineDivision.history.create'),
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
                <Typography>{t('defineDivision.history.update')}</Typography>
                <List sx={{ padding: 0 }}>
                  {(item?.fieldChanges || []).map((value, index) => {
                    let content = ''
                    switch (value?.changedField) {
                      case FIELDS_LOG_HISTORY_DIVISION.STATUS:
                        content = `${t(
                          FIELDS_LOG_HISTORY_DIVISION_MAP[value?.changedField],
                        )}: ${t(
                          DEFINE_DIVISION_ENUM_MAP[value?.oldValue],
                        )} -> ${t(DEFINE_DIVISION_ENUM_MAP[value?.newValue])}`
                        break

                      default:
                        content = `${t(
                          FIELDS_LOG_HISTORY_DIVISION_MAP[value?.changedField],
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

  const actionBefore = () => {
    return (
      <>
        {isDraft && (
          // <Guard code={FUNCTION_CODE.APPROVE_DIVISION}>
          <Button
            icon="tick"
            onClick={() => setIsOpenApprove(true)}
            iconColor="primary"
            color="primary"
            variant="outlined"
          >
            {t('defineSection.approveButton')}
          </Button>
          // </Guard>
        )}
        {isActive && (
          // <Guard code={FUNCTION_CODE.INACTIVE_DIVISION}>
          <Button
            icon="active"
            onClick={() => setIsOpenChangeStatus(true)}
            color="error"
            iconColor="error"
            variant="outlined"
          >
            {t('defineSection.inactiveButton')}
          </Button>
          // </Guard>
        )}
        {isInActive && (
          // <Guard code={FUNCTION_CODE.ACTIVE_DIVISION}>
          <Button
            icon="inActive"
            onClick={() => setIsOpenChangeStatus(true)}
            color="success"
            iconColor="success"
            variant="outlined"
          >
            {t('defineSection.activeButton')}
          </Button>
          // </Guard>
        )}
      </>
    )
  }

  const onSubmitDelete = () => {
    actions.deleteDefineDivision(id, backToList)
    setIsOpenDelete(false)
  }

  const onSubmitApprove = () => {
    actions.changeStatusDefineDivision(
      { id: id, type: DEFINE_DIVISION_ENUM.ACTIVE },
      refreshData,
    )
    setIsOpenApprove(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineDivisionDetail')}
      loading={isLoading}
      onBack={backToList}
      freeSolo
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          // ...(canAccess(FUNCTION_CODE.UPDATE_DIVISION)
          //   ? {
          //       onEdit: () => {
          //         history.push(
          //           ROUTE.DEFINE_DIVISION.EDIT.PATH.replace(':id', id),
          //         )
          //       },
          //     }
          //   : {}),
          // ...(isDraft && canAccess(FUNCTION_CODE.DELETE_DIVISION)
          //   ? { onDelete: () => setIsOpenDelete(true) }
          //   : {}),
          // ...(isActive && canAccess(FUNCTION_CODE.CHANGE_STATUS_DIVISION)
          //   ? { onReject: () => setIsOpenChangeStatus(true) }
          //   : {}),
          // ...((isInActive || isDraft) &&
          // canAccess(FUNCTION_CODE.CHANGE_STATUS_DIVISION)
          //   ? { onApprove: () => setIsOpenChangeStatus(true) }
          //   : {}),
          onEdit: () => {
            history.push(ROUTE.DEFINE_DIVISION.EDIT.PATH.replace(':id', id))
          },
          onDelete: () => setIsOpenDelete(true),
          onReject: () => setIsOpenChangeStatus(true),
          onApprove: () => setIsOpenChangeStatus(true),
        }}
      />
      <Paper sx={{ p: 1 }}>
        <ActionBar
          variant="top"
          elBefore={actionBefore}
          // {...(canAccess(FUNCTION_CODE.UPDATE_DIVISION)
          //   ? {
          //       onEdit: () =>
          //         history.push(
          //           ROUTE.DEFINE_DIVISION.EDIT.PATH.replace(':id', id),
          //         ),
          //     }
          //   : {})}
          // {...(isDraft && canAccess(FUNCTION_CODE.DELETE_DIVISION)
          //   ? { onDelete: () => setIsOpenDelete(true) }
          //   : {})}
          onEdit={() =>
            history.push(ROUTE.DEFINE_DIVISION.EDIT.PATH.replace(':id', id))
          }
          onDelete={() => setIsOpenDelete(true)}
          status={
            <Status
              options={DEFINE_DIVISION_ENUM_OPTIONS}
              value={details?.status}
            />
          }
        />
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineSection.createdAt')}
                  value={convertUtcDateTimeToLocalTz(details?.createdAt)}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineSection.createdBy')}
                  value={details?.createdBy?.fullName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineSection.updatedAt')}
                  value={convertUtcDateTimeToLocalTz(details?.updatedAt)}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineSection.updatedBy')}
                  value={details?.updatedBy?.fullName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineDivision.code')}
                  value={details?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineDivision.eName')}
                  value={details?.eName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineDivision.department')}
                  value={`${details?.department?.vnName}`}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineDivision.vName')}
                  value={details?.vName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LabelValue
                  label={t('defineDivision.jName')}
                  value={details?.jName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('defineDivision.description')}
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
    </Page>
  )
}

export default DefineDivisionDetail
