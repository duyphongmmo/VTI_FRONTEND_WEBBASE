import { useEffect, useState } from 'react'

import { isEmpty, map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

// import { FUNCTION_CODE } from '~/common/constants/functionCode'
import {
  COST_CENTER_TYPE_EXPORT,
  COST_CENTER_TYPE_TEMPLATE,
} from '~/common/constants/import-export'
// import { useApp } from '~/common/hooks/useApp'
import { useQueryState } from '~/common/hooks/useQueryState'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import FilterArea from '~/components/FilterArea'
// import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import IconButton from '~/components/IconButton'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TaskBar from '~/components/TaskBar'
import { ROUTE } from '~/modules/configuration/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import {
  DEFINE_DIVISION_ENUM,
  DEFINE_DIVISION_ENUM_OPTIONS,
} from '../../constants'
import useDefineDivision from '../../redux/hooks/useDefineDivision'
import {
  exportDivisionApi,
  getDivisionTemplateApi,
  importDivisionApi,
} from '../../redux/sagas/define-division/import-export'
import DialogApprove from './dialogs/approve'
import DialogChangeStatus from './dialogs/change-status'
import DialogDelete from './dialogs/delete'
import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'decentralization',
  },
  {
    route: ROUTE.DEFINE_DIVISION.LIST.PATH,
    title: ROUTE.DEFINE_DIVISION.LIST.TITLE,
  },
]
function DefineDivision() {
  const { t } = useTranslation('configuration')
  const history = useHistory()

  const [selectedRows, setSelectedRows] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])
  const [tempItem, setTempItem] = useState(null)
  const [isOpenChangeStatus, setIsOpenChangeStatus] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenApprove, setIsOpenApprove] = useState(false)
  // const { canAccess } = useApp()

  const DEFAULT_FILTERS = {
    code: '',
    eName: '',
    vName: '',
    jName: '',
    departmentIds: [],
    status: [],
    createdAt: null,
    createdBy: null,
    updatedAt: null,
    updatedBy: null,
  }

  const {
    page,
    pageSize,
    sort,
    filters,
    keyword,
    selectedRowsDeps,
    tab,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    withSearch,
    setTab,
    setMultiple,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
    tab: '',
  })

  const {
    data: { list, isLoading, total },
    actions,
  } = useDefineDivision()

  const columns = [
    {
      field: 'code',
      headerName: t('defineDivision.code'),
      width: 100,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'eName',
      headerName: t('defineDivision.eName'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'vName',
      headerName: t('defineDivision.vName'),
      width: 150,
      sortable: true,
    },
    {
      field: 'jName',
      headerName: t('defineDivision.jName'),
      width: 150,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('defineDivision.description'),
      width: 150,
    },
    {
      field: 'departmentVName',
      headerName: t('defineDivision.department'),
      width: 150,
      sortable: true,
      renderCell: (params) => params?.row?.department?.vnName,
    },
    {
      field: 'updatedAt',
      headerName: t('defineSection.updatedAt'),
      width: 100,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params.row?.updatedAt)
      },
    },
    {
      field: 'updatedBy',
      headerName: t('defineSection.updatedBy'),
      width: 100,
      filterFormat: 'date',
      renderCell: (params) => {
        return params.row?.updatedBy?.fullName
      },
    },
    {
      field: 'createdAt',
      headerName: t('defineSection.createdAt'),
      width: 100,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params.row?.createdAt)
      },
    },
    {
      field: 'createdBy',
      headerName: t('defineSection.createdBy'),
      width: 100,
      filterFormat: 'date',
      renderCell: (params) => {
        return params.row?.createdBy?.fullName
      },
    },
    {
      field: 'status',
      headerName: t('general:common.status'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DEFINE_DIVISION_ENUM_OPTIONS}
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
        const isActive = status === DEFINE_DIVISION_ENUM.ACTIVE
        const isDraft = status === DEFINE_DIVISION_ENUM.DRAFT
        return (
          <>
            {/* <Guard code={FUNCTION_CODE.DETAIL_DIVISION}> */}
            <IconButton
              title={t('iconButtonHover.view')}
              onClick={() =>
                history.push(
                  withSearch(
                    ROUTE.DEFINE_DIVISION.DETAIL.PATH.replace(':id', `${id}`),
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {/* </Guard> */}
            {/* <Guard code={FUNCTION_CODE.UPDATE_DIVISION}> */}
            <IconButton
              title={t('iconButtonHover.update')}
              onClick={() =>
                history.push(
                  withSearch(
                    ROUTE.DEFINE_DIVISION.EDIT.PATH.replace(':id', `${id}`),
                  ),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            {/* </Guard> */}
            {isDraft && (
              <>
                {/* <Guard code={FUNCTION_CODE.DELETE_DIVISION}> */}
                <IconButton
                  title={t('iconButtonHover.delete')}
                  onClick={() => onClickDelete(params.row)}
                >
                  <Icon name="delete" />
                </IconButton>
                {/* </Guard> */}
                {/* <Guard code={FUNCTION_CODE.APPROVE_DIVISION}> */}
                <IconButton
                  title={t('iconButtonHover.approve')}
                  onClick={() => onClickApprove(params.row)}
                >
                  <Icon name="tick" />
                </IconButton>
                {/* </Guard> */}
              </>
            )}
            {!isDraft && (
              // <Guard
              //   code={
              //     isActive
              //       ? FUNCTION_CODE.INACTIVE_DIVISION
              //       : FUNCTION_CODE.ACTIVE_DIVISION
              //   }
              // >
              <IconButton
                title={t(`iconButtonHover.${isActive ? 'inActive' : 'active'}`)}
                onClick={() => onClickChangeStatus(params.row)}
              >
                <Icon name={isActive ? 'locked' : 'unlock'} />
              </IconButton>
              // </Guard>
            )}
          </>
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
      value: DEFINE_DIVISION_ENUM.DRAFT,
      label: t('defineDivision.status.draft'),
    },
    {
      value: DEFINE_DIVISION_ENUM.INACTIVE,
      label: t('defineDivision.status.inactive'),
    },
    {
      value: DEFINE_DIVISION_ENUM.ACTIVE,
      label: t('defineDivision.status.active'),
    },
  ]

  const isTabAll = tab === tabList[0].value
  const isTabUnsuitable =
    !isTabAll && filters?.status?.length && !filters?.status?.includes(tab)

  const refreshData = () => {
    if (isTabUnsuitable) return // do nothing

    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          departmentIds: map(filters?.departmentIds, 'id'),
          createdBy: filters?.createdUserId?.id,
          updatedBy: filters?.updatedBy?.id,
          status: isTabAll ? filters?.status?.toString() : tab,
        },
        [
          { field: 'createdAt', filterFormat: 'date' },
          { field: 'updatedAt', filterFormat: 'date' },
        ],
      ),
      sort: convertSortParams(sort),
    }

    actions.searchDefineDivision(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, tab])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps, tab])

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
    actions.changeStatusDefineDivision(
      {
        id: tempItem?.id,
        type:
          tempItem?.status === DEFINE_DIVISION_ENUM.ACTIVE
            ? DEFINE_DIVISION_ENUM.INACTIVE
            : DEFINE_DIVISION_ENUM.ACTIVE,
      },
      refreshData,
    )
    setTempItem(null)
    setIsOpenChangeStatus(false)
  }

  const onSubmitDelete = () => {
    actions.deleteDefineDivision(tempItem?.id, () => {
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
    actions.changeStatusDefineDivision(
      { id: tempItem?.id, type: DEFINE_DIVISION_ENUM.ACTIVE },
      refreshData,
    )
    setTempItem(null)
    setIsOpenApprove(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineDivision')}
      loading={isLoading}
      fitScreen
    >
      <HotKeys
        handlers={{
          // ...(canAccess(FUNCTION_CODE.CREATE_DIVISION)
          //   ? {
          //       onCreate: () =>
          //         history.push(withSearch(ROUTE.DEFINE_DIVISION.CREATE.PATH)),
          //     }
          //   : {}),
          onCreate: () =>
            history.push(withSearch(ROUTE.DEFINE_DIVISION.CREATE.PATH)),
        }}
      />

      <TaskBar>
        {/* <Guard code={FUNCTION_CODE.CREATE_DIVISION}> */}
        <Button
          onClick={() =>
            history.push(withSearch(ROUTE.DEFINE_DIVISION.CREATE.PATH))
          }
          icon="add"
          iconColor="primary"
          variant="text"
          color="text"
        >
          {t('general:common.create')}
        </Button>
        {/* </Guard> */}
        <ImportExport
          name={t('menu.defineDivision')}
          // {...(canAccess(FUNCTION_CODE.IMPORT_DIVISION)
          //   ? {
          //       onImport: (params) => importDivisionApi(params),
          //       onDownloadTemplate: () =>
          //         getDivisionTemplateApi(COST_CENTER_TYPE_TEMPLATE.DIVISION),
          //     }
          //   : {})}
          // {...(canAccess(FUNCTION_CODE.EXPORT_DIVISION)
          //   ? {
          //       onExport: () =>
          //         exportDivisionApi({
          //           keyword: keyword.trim(),
          //           columnSettings: JSON.stringify(columnsSettings),
          //           filter: convertFilterParams(
          //             {
          //               ...filters,
          //               departmentIds: map(filters?.departmentIds, 'id'),
          //               createdBy: filters?.createdUserId?.id,
          //               updatedBy: filters?.updatedBy?.id,
          //               status: isTabAll ? filters?.status?.toString() : tab,
          //             },
          //             [
          //               { field: 'createdAt', filterFormat: 'date' },
          //               { field: 'updatedAt', filterFormat: 'date' },
          //             ],
          //           ),
          //           queryIds: JSON.stringify(
          //             selectedRows?.map((x) => ({ id: x?.id })),
          //           ),
          //           page,
          //           limit: pageSize,
          //           sort: convertSortParams(sort),
          //           type: COST_CENTER_TYPE_EXPORT.DIVISION,
          //         }),
          //     }
          //   : {})}
          onImport={(params) => importDivisionApi(params)}
          onDownloadTemplate={() =>
            getDivisionTemplateApi(COST_CENTER_TYPE_TEMPLATE.DIVISION)
          }
          onExport={() =>
            exportDivisionApi({
              keyword: keyword.trim(),
              columnSettings: JSON.stringify(columnsSettings),
              filter: convertFilterParams(
                {
                  ...filters,
                  departmentIds: map(filters?.departmentIds, 'id'),
                  createdBy: filters?.createdUserId?.id,
                  updatedBy: filters?.updatedBy?.id,
                  status: isTabAll ? filters?.status?.toString() : tab,
                },
                [
                  { field: 'createdAt', filterFormat: 'date' },
                  { field: 'updatedAt', filterFormat: 'date' },
                ],
              ),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: x?.id })),
              ),
              page,
              limit: pageSize,
              sort: convertSortParams(sort),
              type: COST_CENTER_TYPE_EXPORT.DIVISION,
            })
          }
          onRefresh={refreshData}
        />
      </TaskBar>

      <FilterArea
        values={filters}
        onApply={(f) => {
          if (f?.status?.length > 1) {
            setMultiple({
              tab: tabList[0].value,
              filters: f,
            })
            return
          }

          if (f?.status?.length === 1 && f?.status?.[0] !== tab) {
            setMultiple({
              tab: f?.status?.[0],
              filters: f,
            })
            return
          }

          setFilters(f)
        }}
        form={<FilterForm />}
        defaultValues={DEFAULT_FILTERS}
      />

      <DataTable
        title={t('defineDivision.title')}
        rows={isTabUnsuitable ? [] : list}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
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

export default DefineDivision
