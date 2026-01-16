import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/common/constants'
// import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
// import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import useDepartmentList from '~/modules/configuration/redux/hooks/useDepartmentList'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'

const DepartmentDetail = () => {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const { id } = useParams()
  const { refreshKey, clearRefreshKey } = useApp()
  const { withSearch } = useQueryState()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

  const breadcrumbs = [
    {
      title: 'decentralization',
    },
    {
      route: withSearch(ROUTE.DEPARTMENT_LIST.LIST.PATH),
      title: ROUTE.DEPARTMENT_LIST.LIST.TITLE,
    },
    {
      route: ROUTE.DEPARTMENT_LIST.DETAIL.PATH,
      title: ROUTE.DEPARTMENT_LIST.DETAIL.TITLE,
    },
  ]

  const {
    data: { isLoading, departmentDetail },
    actions,
  } = useDepartmentList()

  const refreshData = () => {
    actions.getDepartmentDetailsById(id)
  }

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetDepartmentDetailsState()
    }
  }, [id])

  useEffect(() => {
    if (refreshKey) {
      if (id === refreshKey.toString()) {
        actions.getDepartmentDetailsById(id)
      }

      clearRefreshKey()
    }
  }, [refreshKey, id])

  const backToList = () => {
    history.push(withSearch(ROUTE.DEPARTMENT_LIST.LIST.PATH))
  }

  const onSubmitActive = () => {
    actions.deactiveDepartmentById(id, refreshData)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeDepartmentById(id, refreshData)
    setIsOpenInActive(false)
  }

  const actionBefore = () => {
    const isActive = departmentDetail?.status === ACTIVE_STATUS.ACTIVE
    return (
      <>
        {/* <Guard code={FUNCTION_CODE.USER_UPDATE_STATUS_DEPARTMENT_SETTING}> */}
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
        {/* </Guard> */}

        {/* <Guard
          code={
            FUNCTION_CODE.USER_DECENTRALIZATION_PERMISSION_GROUP_DEPARTMENT_SETTING
          }
        > */}
        <Button
          variant="outlined"
          icon="assign"
          iconColor="primary"
          onClick={() =>
            history.push(ROUTE.DEPARTMENT_LIST.ASSIGN.PATH.replace(':id', id))
          }
        >
          {t('departmentAssign.assign')}
        </Button>
        {/* </Guard> */}
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.departmentDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          // ...(canAccess(FUNCTION_CODE.USER_UPDATE_DEPARTMENT_SETTING)
          //   ? {
          //       onEdit: () =>
          //         history.push(
          //           ROUTE.DEPARTMENT_LIST.EDIT.PATH.replace(':id', id),
          //         ),
          //     }
          //   : {}),
        }}
        onEdit={() =>
          history.push(ROUTE.DEPARTMENT_LIST.EDIT.PATH.replace(':id', id))
        }
      />
      <ActionBar
        variant="top"
        elBefore={actionBefore}
        // {...(canAccess(FUNCTION_CODE.USER_UPDATE_DEPARTMENT_SETTING)
        //   ? {
        //       onEdit: () =>
        //         history.push(
        //           ROUTE.DEPARTMENT_LIST.EDIT.PATH.replace(':id', id),
        //         ),
        //     }
        //   : {})}
        onEdit={() =>
          history.push(ROUTE.DEPARTMENT_LIST.EDIT.PATH.replace(':id', id))
        }
        status={
          <Status
            options={ACTIVE_STATUS_OPTIONS}
            value={departmentDetail?.status}
          />
        }
      />

      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineSection.createdAt')}
                value={convertUtcDateTimeToLocalTz(departmentDetail?.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineSection.createdBy')}
                value={departmentDetail?.createdBy?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineSection.updatedAt')}
                value={convertUtcDateTimeToLocalTz(departmentDetail?.updatedAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineSection.updatedBy')}
                value={departmentDetail?.updatedBy?.fullName}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('departmentList.code')}
                value={departmentDetail?.code}
              />
            </Grid>
            {/* <Grid item xs={12} lg={6}>
              <LV
                label={t('departmentList.factory')}
                value={departmentDetail?.factories
                  ?.map((item) => item?.name)
                  .join(', ')}
              />
            </Grid> */}
            <Grid item xs={12} lg={6}>
              <LV
                label={t('departmentList.englishName')}
                value={departmentDetail?.enName}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('departmentList.vnName')}
                value={departmentDetail?.vnName}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <LV
                label={t('departmentList.japanName')}
                value={departmentDetail?.jpName}
              />
            </Grid>

            {/* <Grid item xs={12} lg={6}>
              <LV
                label={t('departmentList.holon')}
                value={departmentDetail?.holon}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('departmentList.description')}
                multiline
                readOnly
                rows={3}
                value={departmentDetail.description}
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
        tempItem={departmentDetail}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={departmentDetail}
      />
    </Page>
  )
}

export default DepartmentDetail
