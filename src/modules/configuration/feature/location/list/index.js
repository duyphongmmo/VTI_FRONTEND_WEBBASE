import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import {
  ACTIVE_STATUS_STRING,
  ACTIVE_STATUS_STRING_OPTIONS,
  HTTP_STATUS_CODE,
  NOTIFICATION_TYPE,
} from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import FilterArea from '~/components/FilterArea'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import IconButton from '~/components/IconButton'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TaskBar from '~/components/TaskBar'
import TextLink from '~/components/TextLink'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertFilterQuery } from '~/modules/pmsx/utils'
import { convertSortParams } from '~/utils'
import addNotification from '~/utils/toast'

import { useDeleteLocation, useSearchLocation } from '../api'
import { useActiveLocation } from '../api/active'
import { useInactiveLocation } from '../api/inactive'
import DialogChangeStatus from './dialog/change-status'
import DeleteDialog from './dialog/delete'

const breadcrumbs = [
  {
    route: ROUTE.LOCATION.LIST.PATH,
    title: ROUTE.LOCATION.LIST.TITLE,
  },
]

const Location = () => {
  const { t } = useTranslation(['configuration'])
  const [selectedRows, setSelectedRows] = useState([])
  const history = useHistory()
  const { canAccess } = useApp()

  const [modalDelete, setModalDelete] = useState({
    id: null,
    isOpenDeleteModal: false,
    tempItem: null,
  })

  const [modal, setModal] = useState({
    id: null,
    isOpenDeleteModal: false,
    isOpenChangeStatusModal: false,
    tempItem: null,
  })

  const DEFAULT_FILTERS = {
    keyword: '',
    code: '',
    name: '',
  }

  const {
    page,
    pageSize,
    sort,
    filters,
    keyword,
    tab,
    setPage,
    setPageSize,
    setSort,
    setMultiple,
    withSearch,
    setTab,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
    tab: '',
  })

  const tabList = [
    {
      label: t('general:common.all'),
      value: '',
    },
    {
      label: t('general:common.active'),
      value: ACTIVE_STATUS_STRING.ACTIVE,
    },
    {
      label: t('general:common.inActive'),
      value: ACTIVE_STATUS_STRING.INACTIVE,
    },
  ]

  const isTabAll = tab === tabList[0].value

  const params = {
    pagination: {
      page,
      limit: pageSize,
    },
    filters: convertFilterQuery({
      keyword: keyword,
      status: isTabAll ? filters?.status : tab,
    }),
    sorts: convertSortParams(sort),
  }

  const {
    isValidating: isLoading,
    total,
    list,
    mutate: refreshData,
  } = useSearchLocation(params)

  const { trigger: actionDelete, isMutating: isLoadingDelete } =
    useDeleteLocation()

  const onClickDelete = (tempItem) => {
    setModalDelete({ tempItem, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    const params = {
      id: modalDelete?.tempItem?.code,
    }
    actionDelete(params, {
      onSuccess: (res) => {
        if (res?.statusCode === HTTP_STATUS_CODE.SUCCESS) {
          setModalDelete({ ...modalDelete, isOpenDeleteModal: false })
          refreshData()
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

  const onClickLocked = (tempItem) => {
    setModal({ tempItem, isOpenChangeStatusModal: true })
  }

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

  const columns = [
    {
      field: 'code',
      headerName: t('location.code'),
      width: 150,
      sortable: true,
      visible: 'always',
      renderCell: ({ row }) =>
        canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN) ? (
          <TextLink
            to={withSearch(
              ROUTE.LOCATION.DETAIL.PATH.replace(':id', `${row?.code}`),
            )}
          >
            {row?.code}
          </TextLink>
        ) : (
          row?.code
        ),
    },
    {
      field: 'name',
      headerName: t('location.name'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'description',
      headerName: t('location.description'),
      width: 150,
      visible: 'always',
    },
    {
      field: 'statusa',
      headerName: t('general:common.status'),
      width: 150,
      renderCell: (params) => {
        const { status } = params?.row
        return (
          <Status
            options={ACTIVE_STATUS_STRING_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 150,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      growUp: false,
      renderCell: (params) => {
        const { code, status } = params?.row
        return (
          <div>
            <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
              <IconButton
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.LOCATION.EDIT.PATH.replace(':id', `${code}`),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
              <IconButton
                onClick={() => {
                  onClickDelete(params?.row)
                }}
              >
                <Icon name="delete" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
              <IconButton
                onClick={() => {
                  onClickLocked(params?.row)
                }}
              >
                <Icon
                  name={
                    status === ACTIVE_STATUS_STRING.ACTIVE ? 'locked' : 'unlock'
                  }
                />
              </IconButton>
            </Guard>
          </div>
        )
      },
    },
  ]

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.location')}
      loading={
        isLoading || isLoadingDelete || isLoadingActive || isLoadingInactive
      }
      fitScreen
    >
      <HotKeys
        handlers={{
          onCreate: () => history.push(withSearch(ROUTE.LOCATION.CREATE.PATH)),
        }}
      />
      <TaskBar>
        <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
          <Button
            onClick={() => history.push(withSearch(ROUTE.LOCATION.CREATE.PATH))}
            icon="add"
            iconColor="primary"
            variant="text"
            color="text"
          >
            {t('general:common.create')}
          </Button>
        </Guard>
      </TaskBar>

      <FilterArea
        values={{ keyword, ...filters }}
        onApply={({ keyword: k, ...f }) =>
          setMultiple({ keyword: k, filters: f })
        }
        searchPlaceholder={t('location.searchPlaceholder')}
        defaultValues={DEFAULT_FILTERS}
      />

      <DataTable
        columns={columns}
        rows={list}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        tabs={<Tabs list={tabList} value={tab} onChange={setTab} />}
      />
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

export default Location
