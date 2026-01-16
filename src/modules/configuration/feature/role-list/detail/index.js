import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import useRoleManagement from '~/modules/configuration/redux/hooks/useRoleList'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

function RoleDetail() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const { id } = useParams()
  const { withSearch } = useQueryState()
  const { canAccess } = useApp()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const breadcrumbs = [
    {
      title: 'decentralization',
    },
    {
      route: withSearch(ROUTE.ROLE_LIST.LIST.PATH),
      title: ROUTE.ROLE_LIST.LIST.TITLE,
    },
    {
      route: ROUTE.ROLE_LIST.DETAIL.PATH,
      title: ROUTE.ROLE_LIST.DETAIL.TITLE,
    },
  ]

  const {
    data: { isLoading, roleDetail },
    actions,
  } = useRoleManagement()

  const refreshData = () => {
    actions.getRoleAssignDetails(id)
  }

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetRoleAssignDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.ROLE_LIST.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.rejectRoleAssignById(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.confirmRoleAssignById(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = roleDetail?.status === ACTIVE_STATUS.ACTIVE
    return (
      <>
        <Guard
          code={
            isActive
              ? FUNCTION_CODE.USER_LOCK_USER_ROLE_SETTING
              : FUNCTION_CODE.USER_UNLOCK_USER_ROLE_SETTING
          }
        >
          {!isActive && (
            <Button
              variant="outlined"
              icon="inActive"
              onClick={() => setIsOpenInActive(true)}
              color="success"
              iconColor="success"
            >
              {t('general:common.activeButton')}
            </Button>
          )}
          {isActive && (
            <Button
              variant="outlined"
              icon="active"
              onClick={() => setIsOpenActive(true)}
              color="error"
              iconColor="error"
            >
              {t('general:common.inActiveButton')}
            </Button>
          )}
        </Guard>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineRoleDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          ...(canAccess(FUNCTION_CODE.USER_UPDATE_USER_ROLE_SETTING)
            ? {
                onEdit: () =>
                  history.push(ROUTE.ROLE_LIST.EDIT.PATH.replace(':id', id)),
              }
            : {}),
        }}
      />
      <ActionBar
        variant="top"
        elBefore={actionBefore}
        {...(canAccess(FUNCTION_CODE.USER_UPDATE_USER_ROLE_SETTING)
          ? {
              onEdit: () =>
                history.push(ROUTE.ROLE_LIST.EDIT.PATH.replace(':id', id)),
            }
          : {})}
        status={
          <Status options={ACTIVE_STATUS_OPTIONS} value={roleDetail?.status} />
        }
      />
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('roleManagement.createdAt')}
                value={convertUtcDateTimeToLocalTz(roleDetail?.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('roleManagement.createdBy')}
                value={roleDetail?.createdBy?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('roleManagement.updatedAt')}
                value={convertUtcDateTimeToLocalTz(roleDetail?.updatedAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('roleManagement.updatedBy')}
                value={roleDetail?.updatedBy?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('roleManagement.code')} value={roleDetail?.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('roleManagement.name')} value={roleDetail?.name} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('roleManagement.description')}
                multiline
                rows={3}
                value={roleDetail?.description}
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
      <DialogActive
        open={isOpenActive}
        onCancel={() => setIsOpenActive(false)}
        onSubmit={onSubmitActive}
        tempItem={roleDetail}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={roleDetail}
      />
    </Page>
  )
}

export default RoleDetail
