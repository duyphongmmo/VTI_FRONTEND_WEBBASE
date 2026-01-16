import React, { useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import {
  ACTIVE_STATUS_STRING,
  ACTIVE_STATUS_STRING_OPTIONS,
  HTTP_STATUS_CODE,
  NOTIFICATION_TYPE,
} from '~/common/constants'
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
import { ROUTE } from '~/modules/configuration/routes/config'
import addNotification from '~/utils/toast'

import {
  useActiveLocation,
  useDeleteLocation,
  useGetLocationDetail,
  useInactiveLocation,
} from '../api'
import DialogChangeStatus from '../list/dialog/change-status'
import DeleteDialog from '../list/dialog/delete'

const LocationDetail = () => {
  const { t } = useTranslation(['configuration'])
  const { withSearch } = useQueryState()
  const { id } = useParams()
  const history = useHistory()
  const { canAccess } = useApp()
  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
  })

  const [modalDelete, setModalDelete] = useState({
    id: null,
    isOpenDeleteModal: false,
    tempItem: null,
  })

  const breadcrumbs = [
    {
      route: withSearch(ROUTE.LOCATION.LIST.PATH),
      title: ROUTE.LOCATION.LIST.TITLE,
    },
    {
      route: ROUTE.LOCATION.DETAIL.PATH,
      title: ROUTE.LOCATION.DETAIL.TITLE,
    },
  ]

  const backToList = () => {
    history.push(withSearch(ROUTE.LOCATION.LIST.PATH))
  }

  const {
    itemDetail,
    isLoading: isLoadingDetail,
    mutate: refreshData,
  } = useGetLocationDetail(id)

  const { trigger: actionDelete, isMutating: isLoadingDelete } =
    useDeleteLocation()

  const onClickDelete = (tempItem) => {
    setModalDelete({ tempItem, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    const params = {
      id: itemDetail?.code,
    }
    actionDelete(params, {
      onSuccess: (res) => {
        if (res?.statusCode === HTTP_STATUS_CODE.SUCCESS) {
          setModalDelete({ ...modalDelete, isOpenDeleteModal: false })
          refreshData()
          backToList()
          addNotification(res?.message, NOTIFICATION_TYPE.SUCCESS)
        } else {
          addNotification(res?.message, NOTIFICATION_TYPE.ERROR)
          setModalDelete({ ...modalDelete, isOpenDeleteModal: false })
        }
      },
    })
  }

  const { trigger: actionActive, isMutating: isLoadingActive } =
    useActiveLocation()
  const { trigger: actionInactive, isMuating: isLoadingInactive } =
    useInactiveLocation()

  const onSubmitChangeStatus = () => {
    const params = {
      id: modal?.tempItem?.code,
      status: modal?.tempItem?.status,
    }

    if (params.status === ACTIVE_STATUS_STRING.ACTIVE) {
      actionInactive(params, {
        onSuccess: (res) => {
          if (res?.statusCode === HTTP_STATUS_CODE.SUCCESS) {
            setModal({ ...modal, isOpenChangeStatusModal: false })
            refreshData()
            addNotification(res?.message, NOTIFICATION_TYPE.SUCCESS)
          } else {
            addNotification(res?.message, NOTIFICATION_TYPE.ERROR)
            setModal({ ...modal, isOpenChangeStatusModal: false })
          }
        },
      })
    }
    if (params.status === ACTIVE_STATUS_STRING.INACTIVE) {
      actionActive(params, {
        onSuccess: (res) => {
          if (res?.statusCode === HTTP_STATUS_CODE.SUCCESS) {
            setModal({ ...modal, isOpenChangeStatusModal: false })
            refreshData()
            addNotification(res?.message, NOTIFICATION_TYPE.SUCCESS)
          } else {
            addNotification(res?.message, NOTIFICATION_TYPE.ERROR)
            setModal({ ...modal, isOpenChangeStatusModal: false })
          }
        },
      })
    }
  }

  const actionBefore = () => {
    return (
      <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
        <Button
          variant="outlined"
          onClick={() => {
            setModal({ isOpenChangeStatusModal: true, tempItem: itemDetail })
          }}
          {...(itemDetail?.status === ACTIVE_STATUS_STRING.ACTIVE
            ? { icon: 'active', iconColor: 'error', color: 'error' }
            : { icon: 'inActive', iconColor: 'success', color: 'success' })}
        >
          {itemDetail?.status === ACTIVE_STATUS_STRING.ACTIVE
            ? t('location.lock')
            : t('location.unLock')}
        </Button>
      </Guard>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.locationDetail')}
      loading={
        isLoadingDetail ||
        isLoadingActive ||
        isLoadingInactive ||
        isLoadingDelete
      }
      onBack={backToList}
    >
      <HotKeys
        handlers={{
          onBack: backToList,
          ...(canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
            ? {
                onEdit: () =>
                  history.push(ROUTE.LOCATION.EDIT.PATH.replace(':id', id)),
              }
            : {}),
          ...(canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
            ? {
                onDelete: () => onClickDelete(),
              }
            : {}),
        }}
      />
      <ActionBar
        variant="top"
        elBefore={actionBefore}
        {...(canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
          ? {
              onEdit: () =>
                history.push(ROUTE.LOCATION.EDIT.PATH.replace(':id', id)),
            }
          : {})}
        {...(canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
          ? {
              onDelete: () =>
                setModalDelete({ ...modalDelete, isOpenDeleteModal: true }),
            }
          : {})}
        status={
          <Status
            options={ACTIVE_STATUS_STRING_OPTIONS}
            value={itemDetail?.status}
          />
        }
      />
      <Grid container justifyContent="center">
        <Grid item xl={12} xs={12}>
          <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV label={t('location.code')} value={itemDetail?.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('location.name')} value={itemDetail?.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('location.description')}
                value={itemDetail?.description}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DeleteDialog
        onSubmit={onSubmitDelete}
        modal={modalDelete}
        setModal={setModalDelete}
      />
      <DialogChangeStatus
        onSubmit={onSubmitChangeStatus}
        modal={modal}
        setModal={setModal}
      />
    </Page>
  )
}

export default LocationDetail
