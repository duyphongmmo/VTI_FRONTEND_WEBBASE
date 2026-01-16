import React, { useEffect, useMemo, useState } from 'react'

import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { uniqBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { NOTIFICATION_TYPE, SUPER_ADMIN_CODE } from '~/common/constants'
// import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
// import { useApp } from '~/common/hooks/useApp'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
// import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  STATUS_TYPE,
  USER_MANAGEMENT_STATUS_OPTIONS,
} from '~/modules/configuration/constants'
import useUserManagement from '~/modules/configuration/redux/hooks/useUserManagement'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'
import addNotification from '~/utils/toast'

import { useActiveUser, useInActiveUser } from '../api'

function UserManagementDetail() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const { id } = useParams()
  // const { canAccess } = useApp()
  const { withSearch } = useQueryState()
  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isActiveModal: false,
  })
  const breadcrumbs = [
    {
      title: ROUTE.DECENTRALIZATION.TITLE,
    },
    {
      route: withSearch(ROUTE.USER_MANAGEMENT.LIST.PATH),
      title: ROUTE.USER_MANAGEMENT.LIST.TITLE,
    },
    {
      route: ROUTE.USER_MANAGEMENT.DETAIL.PATH,
      title: ROUTE.USER_MANAGEMENT.DETAIL.TITLE,
    },
  ]

  const {
    data: { isLoading, userDetails },
    actions,
  } = useUserManagement()
  const { trigger: actionActive, isMutating: isLoadingActive } = useActiveUser()
  const { trigger: actionInActive, isMutating: isLoadingInActive } =
    useInActiveUser()

  useEffect(() => {
    actions.getUserDetailsById(id)
    return () => {
      actions.resetUserDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(withSearch(ROUTE.USER_MANAGEMENT.LIST.PATH))
  }

  const onSubmitDelete = () => {
    actions.deleteUser(id, () => {
      history.push(withSearch(ROUTE.USER_MANAGEMENT.LIST.PATH))
    })
    setModal({ isOpenDeleteModal: false })
  }

  const onSubmitUpdateStatus = () => {
    const onSuccess = (res) => {
      actions.getUserDetailsById(id)
      onCloseUpdateStatusModal()
      addNotification(res?.message, NOTIFICATION_TYPE.SUCCESS)
    }
    const tempItem = modal?.tempItem
    if (tempItem?.status === STATUS_TYPE.ACTIVE) {
      actionInActive(
        { id: tempItem?.id },
        {
          onSuccess,
        },
      )
    } else if (tempItem?.status === STATUS_TYPE.INACTIVE) {
      actionActive(
        { id: tempItem?.id },
        {
          onSuccess,
        },
      )
    }
  }

  const onCloseUpdateStatusModal = () => {
    setModal({ ...modal, isActiveModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({ isOpenDeleteModal: false })
  }
  const isShowAction = useMemo(
    () => userDetails?.code !== SUPER_ADMIN_CODE,
    [userDetails?.code],
  )
  const actionBefore = () => {
    return (
      <>
        {/* <Guard
          code={
            userDetails?.status === STATUS_TYPE.ACTIVE
              ? FUNCTION_CODE.USER_ACTIVE_USER
              : FUNCTION_CODE.USER_INACTIVE_USER
          }
        > */}
        <Button
          variant="outlined"
          onClick={() =>
            setModal({ ...modal, isActiveModal: true, tempItem: userDetails })
          }
          {...(userDetails?.status === STATUS_TYPE.ACTIVE
            ? { icon: 'active', iconColor: 'error', color: 'error' }
            : { icon: 'inActive', iconColor: 'success', color: 'success' })}
        >
          {userDetails?.status === STATUS_TYPE.ACTIVE
            ? t('general:common.inActiveButton')
            : t('general:common.activeButton')}
        </Button>
        {/* </Guard> */}

        {isShowAction && (
          // <Guard code={FUNCTION_CODE.USER_CREATE_USER}>
          <Button
            onClick={() =>
              history.push(
                withSearch(
                  `${ROUTE.USER_MANAGEMENT.CREATE.PATH}?cloneId=${id}`,
                ),
              )
            }
            variant="outlined"
            icon="clone"
            iconColor="primary"
          >
            {t('general:common.clone')}
          </Button>
          // </Guard>
        )}
      </>
    )
  }

  const userPosition = useMemo(() => {
    let department = []
    let section = []
    let division = []

    userDetails?.costCenters?.forEach((item) => {
      if (item?.department) {
        department.push(item?.department)
      }
      if (item?.section) {
        section.push(item?.section)
      }
      if (item?.division) {
        division.push(item?.division)
      }
    })
    return {
      department: uniqBy(department, 'id'),
      section: uniqBy(section, 'id'),
      division: uniqBy(division, 'id'),
    }
  }, [userDetails?.costCenters])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.userManagementDetail')}
      onBack={backToList}
      loading={isLoading || isLoadingActive || isLoadingInActive}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          // ...(canAccess(FUNCTION_CODE.USER_UPDATE_USER) && isShowAction
          //   ? {
          //       onEdit: () =>
          //         history.push(
          //           ROUTE.USER_MANAGEMENT.EDIT.PATH.replace(':id', id),
          //         ),
          //     }
          //   : {}),
          // ...(canAccess(FUNCTION_CODE.USER_DELETE_USER) && isShowAction
          //   ? {
          //       onDelete: () => setModal({ ...modal, isOpenDeleteModal: true }),
          //     }
          //   : {}),
          onEdit: () =>
            history.push(ROUTE.USER_MANAGEMENT.EDIT.PATH.replace(':id', id)),
          onDelete: () => setModal({ ...modal, isOpenDeleteModal: true }),
        }}
      />
      <ActionBar
        variant="top"
        elBefore={actionBefore}
        // {...(canAccess(FUNCTION_CODE.USER_UPDATE_USER) && isShowAction
        //   ? {
        //       onEdit: () =>
        //         history.push(
        //           ROUTE.USER_MANAGEMENT.EDIT.PATH.replace(':id', id),
        //         ),
        //     }
        //   : {})}
        onEdit={() =>
          history.push(ROUTE.USER_MANAGEMENT.EDIT.PATH.replace(':id', id))
        }
        status={
          <Status
            options={USER_MANAGEMENT_STATUS_OPTIONS}
            value={userDetails?.status}
          />
        }
      />
      <Grid container justifyContent="center">
        <Grid
          item
          xl={12}
          xs={12}
          sx={() => ({
            justifyContent: 'center',
            bgcolor: 'bg.block',
            borderRadius: 1,
            mb: 1,
            px: 5,
            pr: 1,
            py: 1,
          })}
        >
          <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <Typography variant="h4" mt={1}>
                {t('userManagement.commonInfo')}
              </Typography>
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.code')} value={userDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.email')} value={userDetails.email} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.username')}
                value={userDetails.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('userManagement.phone')} value={userDetails.phone} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.fullName')}
                value={userDetails.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.dateOfBirth')}
                value={convertUtcDateTimeToLocalTz(userDetails.dateOfBirth)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.user')}
                value={userDetails.createdBy?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.createTime')}
                value={convertUtcDateTimeToLocalTz(userDetails.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.updatedBy')}
                value={userDetails.updatedBy?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.updatedAt')}
                value={convertUtcDateTimeToLocalTz(userDetails.updatedAt)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xl={12}
          xs={12}
          sx={() => ({
            justifyContent: 'center',
            bgcolor: 'bg.block',
            borderRadius: 1,
            mb: 1,
            px: 5,
            pr: 1,
            py: 1,
          })}
        >
          <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <Typography variant="h4" mt={1}>
                {t('userManagement.workInfo')}
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.department')}
                value={(() => {
                  const department =
                    userDetails.departmentSettings ??
                    userPosition?.department ??
                    []

                  return department?.map((item) => item?.name)?.join(' , ')
                })()}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.division')}
                value={(() => {
                  const division =
                    userDetails.sections ?? userPosition.division ?? []

                  return division?.map((item) => item?.vName)?.join(' , ')
                })()}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.section')}
                value={(() => {
                  const section =
                    userDetails.sections ?? userPosition.section ?? []
                  return section
                    ?.map((item) => item?.division?.vName)
                    ?.join(', ')
                })()}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('userManagement.role')}
                value={userDetails?.userRoleSettings?.[0]?.name}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('userManagement.userManagementDelete')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('userManagement.deleteConfirm')}
        <LV
          label={t('userManagement.username')}
          value={userDetails?.username}
          sx={{ mt: 1 }}
        />
        <LV
          label={t('userManagement.fullName')}
          value={userDetails.fullName}
          sx={{ mt: 1 }}
        />
      </Dialog>
      <Dialog
        open={modal.isActiveModal}
        title={t('general.updateStatus')}
        onCancel={onCloseUpdateStatusModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitUpdateStatus}
        submitLabel={t('general:common.yes')}
        {...(modal?.tempItem?.status === STATUS_TYPE.ACTIVE
          ? {
              submitProps: {
                color: 'error',
              },
            }
          : {})}
        noBorderBottom
      >
        {t('general.confirmMessage')}
      </Dialog>
    </Page>
  )
}

export default UserManagementDetail
