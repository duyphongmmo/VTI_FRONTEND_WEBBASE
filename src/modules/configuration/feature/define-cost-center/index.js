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

import { COST_CENTER_STATUS, COST_CENTER_STATUS_OPTIONS } from '../../constants'
import useDefineCostCenter from '../../redux/hooks/useCostCenter'
import {
  exportCostCenterApi,
  getCostCenterTemplateApi,
  importCostCenterApi,
} from '../../redux/sagas/define-cost-center/import-export'
import DialogApprove from './dialogs/approve'
import DialogChangeStatus from './dialogs/change-status'
import DialogDelete from './dialogs/delete'
import DialogUpdateStatus from './dialogs/update'

const breadcrumbs = [
  {
    title: 'decentralization',
  },
  {
    route: ROUTE.DEFINE_COST_CENTER.LIST.PATH,
    title: ROUTE.DEFINE_COST_CENTER.LIST.TITLE,
  },
]

function DefineCostCenter() {
  const { t } = useTranslation('configuration')
  const history = useHistory()
  const {
    data: { list, total, isLoading },
    actions,
  } = useDefineCostCenter()

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
    selectedRowsDeps,
    setTab,
    setMultiple,
  } = useQueryState({
    tab: '',
  })

  const [tempItem, setTempItem] = useState(null)
  const [isOpenChangeStatus, setIsOpenChangeStatus] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenApprove, setIsOpenApprove] = useState(false)
  const [isOpenUpdateStatus, setIsOpenUpdateStatus] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])
  const { canAccess } = useApp()

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

  const onClickUpdateStatus = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenUpdateStatus(true)
  }

  const onSubmitChangeStatus = () => {
    actions.changeStatusCostCenter(
      {
        id: tempItem?.id,
        type:
          tempItem?.status === COST_CENTER_STATUS.ACTIVE
            ? COST_CENTER_STATUS.INACTIVE
            : COST_CENTER_STATUS.ACTIVE,
      },
      refreshData,
    )
    setTempItem(null)
    setIsOpenChangeStatus(false)
  }

  const onSubmitDelete = () => {
    actions.deleteCostCenter(tempItem?.id, () => {
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

  const onSubmitApprove = (values) => {
    actions.changeStatusCostCenter(
      {
        id: tempItem?.id,
        type: COST_CENTER_STATUS.ACTIVE,
        payload: {
          holonId: values?.holon?.id,
          usingDate: values?.usingDate,
        },
      },
      refreshData,
    )
    setTempItem(null)
    setIsOpenApprove(false)
  }

  const onSubmitUpdateStatus = (values) => {
    actions.changeStatusCostCenter(
      {
        id: tempItem?.id,
        type: COST_CENTER_STATUS.ACTIVE,
        payload: {
          usingDate: values?.usingDate,
        },
      },
      refreshData,
    )
    setTempItem(null)
    setIsOpenUpdateStatus(false)
  }

  const columns = [
    {
      field: 'code',
      headerName: t('defineCostCenter.code'),
      width: 120,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'name',
      headerName: t('defineCostCenter.name'),
      width: 120,
      visible: 'always',
      renderCell: (params) => {
        return params.row?.name
      },
    },
    {
      field: 'location',
      headerName: t('defineCostCenter.location'),
      width: 120,
      visible: 'always',
      renderCell: (params) => {
        return params.row?.location?.name
      },
    },
    {
      field: 'accountingLocationCode',
      headerName: t('defineCostCenter.accountingLocationCode'),
      width: 120,
      visible: 'always',
      renderCell: (params) => {
        return params.row?.accLocCode
      },
    },
    {
      field: 'accountingCodeCenter',
      headerName: t('defineCostCenter.accountingCodeCenter'),
      width: 120,
      visible: 'always',
      renderCell: (params) => {
        return params.row?.accCodeCenter
      },
    },
    {
      field: 'description',
      headerName: t('defineCostCenter.description'),
      width: 120,
      visible: 'always',
      renderCell: (params) => {
        return params.row?.description
      },
    },
    {
      field: 'status',
      headerName: t('general:common.status'),
      width: 100,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={COST_CENTER_STATUS_OPTIONS}
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
        const { id, status, usingDate } = params?.row
        return (
          <div>
            <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
              <IconButton
                title={t('iconButtonHover.view')}
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEFINE_COST_CENTER.DETAIL.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>

            <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
              <IconButton
                title={t('iconButtonHover.update')}
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.DEFINE_COST_CENTER.EDIT.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>

            {COST_CENTER_STATUS.DRAFT === status && (
              <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
                <IconButton
                  title={t('iconButtonHover. approve')}
                  onClick={() => onClickApprove(params?.row)}
                >
                  <Icon name="tick" />
                </IconButton>
              </Guard>
            )}

            {COST_CENTER_STATUS.DRAFT === status && (
              <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
                <IconButton
                  title={t('iconButtonHover.delete')}
                  onClick={() => onClickDelete(params?.row)}
                >
                  <Icon name="delete" />
                </IconButton>
              </Guard>
            )}

            {COST_CENTER_STATUS.ACTIVE === status && (
              <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
                <IconButton
                  title={t('iconButtonHover.inActive')}
                  onClick={() => onClickChangeStatus(params?.row)}
                >
                  <Icon name="active" />
                </IconButton>
              </Guard>
            )}

            {COST_CENTER_STATUS.INACTIVE === status && (
              <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
                <IconButton
                  title={t('iconButtonHover.active')}
                  onClick={() =>
                    usingDate > new Date().toISOString()
                      ? onClickUpdateStatus(params?.row)
                      : onClickChangeStatus(params?.row)
                  }
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
      value: COST_CENTER_STATUS.INACTIVE,
      label: t('defineCostCenter.status.inactive'),
    },
    {
      value: COST_CENTER_STATUS.ACTIVE,
      label: t('defineCostCenter.status.active'),
    },
  ]

  const isTabAll = tab === tabList[0].value
  const isTabUnsuitable =
    !isTabAll &&
    filters?.statusList?.length &&
    !filters?.statusList?.includes(tab)

  const refreshData = () => {
    if (isTabUnsuitable) return // do nothing

    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          totalizingNames: filters?.totalizingNames?.join(','),
          types: filters?.types?.join(','),
          statusList: isTabAll ? filters?.statusList?.toString() : tab,
          createdUserId: filters?.createdUserId?.id,
          holonId: filters?.holonId?.id,
        },
        columns,
      ),
      sort: convertSortParams(sort),
    }
    actions.searchCostCenters(params)
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
      title={t('menu.defineCostCenter')}
      loading={isLoading}
      fitScreen
    >
      <HotKeys
        handlers={{
          ...(canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
            ? {
                onCreate: () =>
                  history.push(
                    withSearch(ROUTE.DEFINE_COST_CENTER.CREATE.PATH),
                  ),
              }
            : {}),
        }}
      />
      <TaskBar>
        <Guard code={FUNCTION_CODE.ADMIN_ROLE_ADMIN}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.DEFINE_COST_CENTER.CREATE.PATH))
            }
            icon="add"
            iconColor="primary"
            variant="text"
            color="text"
          >
            {t('general:common.create')}
          </Button>
        </Guard>
        <ImportExport
          name={t('defineCostCenter.export')}
          {...(canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
            ? { onImport: (file) => importCostCenterApi(file) }
            : {})}
          {...(canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN)
            ? {
                onExport: () =>
                  exportCostCenterApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: x?.id })),
                    ),
                    keyword: keyword.trim(),
                    filter: convertFilterParams(
                      {
                        statusList: isTabAll
                          ? filters?.statusList?.toString()
                          : tab,
                      },
                      columns,
                    ),
                    sort: convertSortParams(sort),
                    type: COST_CENTER_TYPE_EXPORT.COST_CENTER,
                  }),
              }
            : {})}
          onDownloadTemplate={() =>
            getCostCenterTemplateApi(COST_CENTER_TYPE_TEMPLATE.COST_CENTER)
          }
          onRefresh={refreshData}
        />
      </TaskBar>

      <FilterArea
        values={filters}
        searchPlaceholder={t('common.searchPlaceHolder')}
        onApply={({ keyword: k, ...f }) => {
          setMultiple({ keyword: k, filters: f })
        }}
      />
      <DataTable
        title={t('defineCostCenter.title')}
        rows={isTabUnsuitable ? [] : list}
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
      <DialogUpdateStatus
        open={isOpenUpdateStatus}
        onCancel={() => setIsOpenUpdateStatus(false)}
        onSubmit={onSubmitUpdateStatus}
        tempItem={tempItem}
      />
    </Page>
  )
}

export default DefineCostCenter
