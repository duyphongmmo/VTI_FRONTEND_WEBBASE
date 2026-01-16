import React, { useState, useEffect } from 'react'

import { isEmpty, map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { FUNCTION_CODE } from '~/common/constants/functionCode'
import {
  COST_CENTER_TYPE_EXPORT,
  COST_CENTER_TYPE_TEMPLATE,
} from '~/common/constants/import-export'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import FilterArea from '~/components/FilterArea'
import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import IconButton from '~/components/IconButton'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TaskBar from '~/components/TaskBar'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import { HOLON_STATUS, HOLON_STATUS_OPTIONS } from '../../../constants'
import useHolon from '../../../redux/hooks/useHolon'
import {
  exportHolonApi,
  getHolonTemplateApi,
  importHolonApi,
} from '../../../redux/sagas/holon/import-export'
import DialogApprove from './dialogs/approve'
import DialogChangeStatus from './dialogs/change-status'
import DialogDelete from './dialogs/delete'
import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'decentralization',
  },
  {
    route: ROUTE.HOLON.LIST.PATH,
    title: ROUTE.HOLON.LIST.TITLE,
  },
]

const DEFAULT_FILTERS = {
  keyword: '',
  statuses: [],
}

function Holon() {
  const { t } = useTranslation('configuration')
  const history = useHistory()
  const { canAccess } = useApp()
  const {
    data: { holonList, total, isLoading },
    actions,
  } = useHolon()

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
    withSearch,
    setMultiple,
    selectedRowsDeps,
    setTab,
  } = useQueryState({
    tab: '',
  })

  const [tempItem, setTempItem] = useState(null)
  const [isOpenChangeStatus, setIsOpenChangeStatus] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenApprove, setIsOpenApprove] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])

  const onClickChangeStatus = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenChangeStatus(true)
  }

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDelete(true)
  }

  const onClickApprove = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenApprove(true)
  }

  const onSubmitChangeStatus = () => {
    actions.changeStatusHolon(
      {
        id: tempItem?.id,
        type:
          tempItem?.status === HOLON_STATUS.ACTIVE
            ? HOLON_STATUS.INACTIVE
            : HOLON_STATUS.ACTIVE,
      },
      refreshData,
    )
    setTempItem(null)
    setIsOpenChangeStatus(false)
  }

  const onSubmitDelete = () => {
    actions.deleteHolon(tempItem?.id, () => {
      refreshData()
      if (
        !isEmpty(selectedRows) &&
        map(selectedRows, 'id')?.includes(tempItem?.id)
      ) {
        setSelectedRows(selectedRows.filter((row) => row?.id !== tempItem?.id))
      }
    })
    setTempItem(null)
    setIsOpenDelete(false)
  }

  const onSubmitApprove = () => {
    actions.changeStatusHolon(
      { id: tempItem?.id, type: HOLON_STATUS.ACTIVE },
      refreshData,
    )
    setTempItem(null)
    setIsOpenApprove(false)
  }

  const columns = [
    {
      field: 'code',
      headerName: t('holon.code'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('holon.name'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'description',
      headerName: t('holon.description'),
      width: 200,
      sortable: true,
    },
    {
      field: 'status',
      headerName: t('general:common.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={HOLON_STATUS_OPTIONS}
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
        const { id, status } = params?.row
        return (
          <div>
            <Guard code={FUNCTION_CODE.DETAIL_HOLON}>
              <IconButton
                title={t('iconButtonHover.view')}
                onClick={() =>
                  history.push(
                    withSearch(ROUTE.HOLON.DETAIL.PATH.replace(':id', `${id}`)),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>

            <Guard code={FUNCTION_CODE.UPDATE_HOLON}>
              <IconButton
                title={t('iconButtonHover.update')}
                onClick={() =>
                  history.push(
                    withSearch(ROUTE.HOLON.EDIT.PATH.replace(':id', `${id}`)),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>

            {HOLON_STATUS.DRAFT === status && (
              <Guard code={FUNCTION_CODE.CHANGE_STATUS_HOLON}>
                <IconButton
                  title={t('iconButtonHover.approve')}
                  onClick={() => onClickApprove(params?.row)}
                >
                  <Icon name="tick" />
                </IconButton>
              </Guard>
            )}

            {HOLON_STATUS.DRAFT === status && (
              <Guard code={FUNCTION_CODE.DELETE_HOLON}>
                <IconButton
                  title={t('iconButtonHover.delete')}
                  onClick={() => onClickDelete(params?.row)}
                >
                  <Icon name="delete" />
                </IconButton>
              </Guard>
            )}

            {HOLON_STATUS.ACTIVE === status && (
              <Guard code={FUNCTION_CODE.CHANGE_STATUS_HOLON}>
                <IconButton
                  title={t('iconButtonHover.inActive')}
                  onClick={() => onClickChangeStatus(params?.row)}
                >
                  <Icon name="active" />
                </IconButton>
              </Guard>
            )}

            {HOLON_STATUS.INACTIVE === status && (
              <Guard code={FUNCTION_CODE.CHANGE_STATUS_HOLON}>
                <IconButton
                  title={t('iconButtonHover.active')}
                  onClick={() => onClickChangeStatus(params?.row)}
                >
                  <Icon name="inActive" />
                </IconButton>
              </Guard>
            )}
          </div>
        )
      },
    },
  ]

  const tabList = [
    {
      label: t('general:common.all'),
      value: '',
    },
    {
      value: HOLON_STATUS.DRAFT,
      label: t('holon.status.draft'),
    },
    {
      value: HOLON_STATUS.ACTIVE,
      label: t('holon.status.active'),
    },
    {
      value: HOLON_STATUS.INACTIVE,
      label: t('holon.status.inactive'),
    },
  ]

  const isTabAll = tab === tabList[0].value
  const isTabUnsuitable =
    !isTabAll && filters?.statuses?.length && !filters?.statuses?.includes(tab)

  const refreshData = () => {
    if (isTabUnsuitable) return // do nothing

    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          statuses: isTabAll ? filters?.statuses?.toString() : tab,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchHolons(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, tab])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps, tab])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.holon')}
      loading={isLoading}
      fitScreen
    >
      <HotKeys
        handlers={{
          ...(canAccess(FUNCTION_CODE.CREATE_HOLON)
            ? {
                onCreate: () =>
                  history.push(withSearch(ROUTE.HOLON.CREATE.PATH)),
              }
            : {}),
        }}
      />
      <TaskBar>
        <Guard code={FUNCTION_CODE.CREATE_HOLON}>
          <Button
            onClick={() => history.push(withSearch(ROUTE.HOLON.CREATE.PATH))}
            icon="add"
            iconColor="primary"
            variant="text"
            color="text"
          >
            {t('general:common.create')}
          </Button>
        </Guard>
        <ImportExport
          name={t('holon.export')}
          {...(canAccess(FUNCTION_CODE.IMPORT_HOLON)
            ? {
                onImport: (files) => {
                  return importHolonApi(files)
                },
              }
            : {})}
          {...(canAccess(FUNCTION_CODE.EXPORT_HOLON)
            ? {
                onExport: () =>
                  exportHolonApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: x?.id })),
                    ),
                    keyword: keyword.trim(),
                    filter: convertFilterParams(
                      {
                        ...filters,
                        statuses: isTabAll
                          ? filters?.statuses?.toString()
                          : tab,
                      },
                      columns,
                    ),
                    sort: convertSortParams(sort),
                    type: COST_CENTER_TYPE_EXPORT.HOLON,
                  }),
              }
            : {})}
          onDownloadTemplate={() =>
            getHolonTemplateApi(COST_CENTER_TYPE_TEMPLATE.HOLON)
          }
          onRefresh={refreshData}
        />
      </TaskBar>

      <FilterArea
        values={{ keyword, ...filters }}
        onApply={({ keyword: k, ...f }) => {
          if (f?.statuses?.length > 1) {
            setMultiple({
              tab: tabList[0].value,
              keyword: k,
              filters: f,
            })
            return
          }

          if (f?.statuses?.length === 1 && f?.statuses?.[0] !== tab) {
            setMultiple({
              tab: f?.statuses?.[0],
              keyword: k,
              filters: f,
            })
            return
          }

          setMultiple({ keyword: k, filters: f })
        }}
        defaultValues={DEFAULT_FILTERS}
        searchPlaceholder={t('holon.searchCodeOrNamePlaceholder')}
        form={<FilterForm />}
      />

      <DataTable
        title={t('holon.title')}
        rows={isTabUnsuitable ? [] : holonList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSelectionChange={setSelectedRows}
        onSettingChange={setColumnsSettings}
        selected={selectedRows}
        total={total}
        sort={sort}
        tabs={<Tabs list={tabList} value={tab} onChange={setTab} />}
      />
      <DialogChangeStatus
        open={isOpenChangeStatus}
        onCancel={() => setIsOpenChangeStatus(false)}
        onSubmit={onSubmitChangeStatus}
        tempItem={tempItem}
      />
      <DialogDelete
        open={isOpenDelete}
        onCancel={() => setIsOpenDelete(false)}
        onSubmit={onSubmitDelete}
        tempItem={tempItem}
      />
      <DialogApprove
        open={isOpenApprove}
        onCancel={() => setIsOpenApprove(false)}
        onSubmit={onSubmitApprove}
        tempItem={tempItem}
      />
    </Page>
  )
}

export default Holon
