import React, { useEffect, useMemo, useState } from 'react'

import { isEmpty, map } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { USER_TYPE_TEMPLATE } from '~/common/constants/import-export'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import FilterArea from '~/components/FilterArea'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import IconButton from '~/components/IconButton'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import TaskBar from '~/components/TaskBar'
import { EMAIL_FUNCTION_TYPE_MAP } from '~/modules/configuration/constants'
import { useEmailNotification } from '~/modules/configuration/redux/hooks/useEmailNotification'
import {
  getEmailNotificationTemplateApi,
  importEmailNotificationApi,
} from '~/modules/configuration/redux/sagas/email-notification/import-export'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import DeleteDialog from '../dialogs/delete'
import DetailDialog from '../dialogs/detail'
import FormDialog from '../dialogs/form'
import FilterForm from './filter-form'

const breadcrumbs = [
  {
    route: ROUTE.EMAIL_NOTIFICATION.LIST.PATH,
    title: ROUTE.EMAIL_NOTIFICATION.LIST.TITLE,
  },
]

const EmailNotification = () => {
  const { t } = useTranslation(['configuration'])
  const {
    data: { list, isLoading, total },
    actions,
  } = useEmailNotification()
  const DEFAULT_FILTERS = {
    type: [],
  }
  const [tempItem, setTempItem] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [detailModal, setDetailModal] = useState(false)
  const [formModal, setFormModal] = useState({
    isOpen: false,
    mode: MODAL_MODE.CREATE,
  })

  const [selectedRows, setSelectedRows] = useState([])
  const { refreshKey, clearRefreshKey } = useApp()

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
    setFilters,
    selectedRowsDeps,
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
  ]

  const columns = useMemo(() => [
    {
      field: 'type',
      headerName: t('emailNotification.function'),
      width: 200,
      visible: 'always',
      sortable: true,
      renderCell: (params) => {
        const { type } = params.row
        return t(EMAIL_FUNCTION_TYPE_MAP[type])
      },
    },
    {
      field: 'emails',
      headerName: t('emailNotification.email'),
      width: 300,
      renderCell: (params) => {
        const { emails } = params.row
        return emails?.map((email) => email?.name)?.join(', ')
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
        return (
          <>
            <Guard code={FUNCTION_CODE.DETAIL_PRODUCING_STEP}>
              <IconButton
                title={t('iconButtonHover.view')}
                onClick={() => {
                  setTempItem(params.row)
                  setDetailModal(true)
                }}
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.UPDATE_PRODUCING_STEP}>
              <IconButton
                title={t('iconButtonHover.update')}
                onClick={() => {
                  setTempItem(params.row)
                  setFormModal({
                    isOpen: true,
                    mode: MODAL_MODE.UPDATE,
                  })
                }}
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.DELETE_PRODUCING_STEP}>
              <IconButton
                title={t('iconButtonHover.delete')}
                onClick={() => {
                  setTempItem(params.row)
                  setDeleteModal(true)
                }}
              >
                <Icon name="delete" />
              </IconButton>
            </Guard>
          </>
        )
      },
    },
  ])

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword, tab])

  useEffect(() => {
    if (refreshKey) {
      if (list?.some((item) => item?.id === refreshKey)) {
        refreshData()
      }

      clearRefreshKey()
    }
  }, [refreshKey, list])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps, tab])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          status: tab,
          departmentIds: filters?.departmentIds
            ?.map((item) => item?.id)
            ?.join(','),
          costCenterIds: filters?.costCenterIds
            ?.map((item) => item?.id)
            ?.join(','),
          routingIds: filters?.routingIds?.map((item) => item?.id)?.join(','),
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchEmailNotification(params)
  }

  const onSubmitDelete = () => {
    actions.deleteEmailNotification(tempItem?.id, () => {
      refreshData()
      if (
        !isEmpty(selectedRows) &&
        map(selectedRows, 'id')?.includes(tempItem?.id)
      ) {
        setSelectedRows(selectedRows.filter((row) => row?.id !== tempItem.id))
      }
    })

    setTempItem(null)
    setDeleteModal(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.emailNotification')}
      loading={isLoading}
      fitScreen
    >
      {/* <HotKeys
        handlers={{
          ...(canAccess(FUNCTION_CODE.CREATE_PRODUCING_STEP)
            ? {
                onCreate: () => {
                  setFormModal({
                    isOpen: true,
                    mode: MODAL_MODE.CREATE,
                  })
                },
              }
            : {}),
        }}
      /> */}

      <TaskBar>
        {/* <Guard code={FUNCTION_CODE.CREATE_PRODUCING_STEP}> */}
        <Button
          onClick={() => {
            setFormModal({
              isOpen: true,
              mode: MODAL_MODE.CREATE,
            })
          }}
          icon="add"
          iconColor="primary"
          variant="text"
          color="text"
        >
          {t('emailNotification.setting')}
        </Button>
        {/* </Guard> */}
        <ImportExport
          name={t('menu.emailNotification')}
          onImport={(file) => importEmailNotificationApi(file)}
          onDownloadTemplate={() =>
            getEmailNotificationTemplateApi(
              USER_TYPE_TEMPLATE.EMAIL_NOTIFICATION,
            )
          }
          onRefresh={refreshData}
        />
      </TaskBar>

      <FilterArea
        values={filters}
        onApply={setFilters}
        form={<FilterForm />}
        defaultValues={DEFAULT_FILTERS}
      />

      <DataTable
        rows={list}
        pageSize={pageSize}
        page={page}
        columns={columns}
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
        open={deleteModal}
        onCancel={() => {
          setDeleteModal(false)
          setTempItem(null)
        }}
        onSubmit={onSubmitDelete}
        tempItem={tempItem}
      />

      <DetailDialog
        open={detailModal}
        tempItem={tempItem}
        onCancel={() => {
          setDetailModal(false)
          setTempItem(null)
        }}
        onEdit={() => {
          setTempItem(tempItem)
          setFormModal({
            isOpen: true,
            mode: MODAL_MODE.UPDATE,
          })
        }}
      />

      <FormDialog
        open={formModal.isOpen}
        onCancel={() => {
          setFormModal({
            isOpen: false,
            mode: null,
          })
          setTempItem(null)
        }}
        onSuccess={() => {
          setFormModal({
            isOpen: false,
            mode: null,
          })
          setTempItem(null)
          refreshData()
        }}
        mode={formModal.mode}
        tempItem={tempItem}
      />
    </Page>
  )
}

export default EmailNotification
