import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/common/constants'
// import { FUNCTION_CODE } from '~/common/constants/functionCode'
import {
  USER_TYPE_EXPORT,
  USER_TYPE_TEMPLATE,
} from '~/common/constants/import-export'
import { useQueryState } from '~/common/hooks'
// import { useApp } from '~/common/hooks/useApp'
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
import useDepartmentList from '~/modules/configuration/redux/hooks/useDepartmentList'
import {
  exportDepartmentApi,
  getDepartmentTemplateApi,
  importDepartmentApi,
} from '~/modules/configuration/redux/sagas/department-list/import-export-deparment'
import { ROUTE } from '~/modules/configuration/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'decentralization',
  },
  {
    route: ROUTE.DEPARTMENT_LIST.LIST.PATH,
    title: ROUTE.DEPARTMENT_LIST.LIST.TITLE,
  },
]
const DepartmentList = () => {
  const { t } = useTranslation(['configuration'])
  const [tempItem, setTempItem] = useState(null)
  // const { canAccess } = useApp()
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const {
    data: { departmentList, isLoading, total },
    actions,
  } = useDepartmentList()

  const DEFAULT_FILTERS = {
    keyword: '',
    enName: '',
    vnName: '',
    createdAt: null,
    createdBy: null,
    updatedAt: null,
    updatedBy: null,
    jpName: '',
  }

  const history = useHistory()

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

  const columns = [
    {
      field: 'code',
      headerName: t('departmentList.code'),
      width: 150,
      sortable: true,
    },
    {
      field: 'enName',
      headerName: t('departmentList.englishName'),
      width: 150,
    },
    {
      field: 'vnName',
      headerName: t('departmentList.vnName'),
      width: 150,
    },
    {
      field: 'jpName',
      headerName: t('departmentList.japanName'),
      width: 150,
    },
    {
      field: 'description',
      headerName: t('departmentList.description'),
      width: 150,
    },
    // {
    //   field: 'factories',
    //   headerName: t('departmentList.factory'),
    //   width: 200,
    //   renderCell: (params) => {
    //     const factories = params.row?.factories
    //       ?.map((item) => item.name)
    //       ?.join(', ')
    //     return factories
    //   },
    // },
    // {
    //   field: 'holon',
    //   headerName: t('departmentList.holon'),
    //   width: 200,
    // },
    // {
    //   field: 'description',
    //   headerName: t('departmentList.description'),
    //   width: 150,
    // },
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
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={ACTIVE_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'actions',
      headerName: t('general:common.action'),
      width: 150,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      growUp: false,
      renderCell: (params) => {
        const { id, status } = params?.row
        const isActive = status === ACTIVE_STATUS.ACTIVE
        return (
          <>
            {/* <Guard code={FUNCTION_CODE.USER_DETAIL_DEPARTMENT_SETTING}> */}
            <IconButton
              title={t('iconButtonHover.view')}
              onClick={() =>
                history.push(
                  withSearch(
                    ROUTE.DEPARTMENT_LIST.DETAIL.PATH.replace(':id', `${id}`),
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {/* </Guard> */}
            {/* <Guard code={FUNCTION_CODE.USER_UPDATE_DEPARTMENT_SETTING}> */}
            <IconButton
              title={t('iconButtonHover.update')}
              onClick={() =>
                history.push(
                  withSearch(
                    ROUTE.DEPARTMENT_LIST.EDIT.PATH.replace(':id', `${id}`),
                  ),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            {/* </Guard> */}
            {isActive && (
              // <Guard code={FUNCTION_CODE.USER_UPDATE_STATUS_DEPARTMENT_SETTING}>
              <IconButton
                title={t('iconButtonHover.inActive')}
                onClick={() => onClickActive(params.row)}
              >
                <Icon name="locked" />
              </IconButton>
              // </Guard>
            )}
            {!isActive && (
              // <Guard code={FUNCTION_CODE.USER_UPDATE_STATUS_DEPARTMENT_SETTING}>
              <IconButton
                title={t('iconButtonHover.active')}
                onClick={() => onClickInActive(params.row)}
              >
                <Icon name="unlock" />
              </IconButton>
              // </Guard>
            )}
            {/* <Guard
              code={
                FUNCTION_CODE.USER_DECENTRALIZATION_PERMISSION_GROUP_DEPARTMENT_SETTING
              }
            > */}
            <IconButton
              title={t('iconButtonHover.assign')}
              onClick={() =>
                history.push(
                  withSearch(
                    ROUTE.DEPARTMENT_LIST.ASSIGN.PATH.replace(':id', `${id}`),
                  ),
                )
              }
            >
              <Icon name="assign" />
            </IconButton>
            {/* </Guard> */}
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
      label: t('general:common.active'),
      value: ACTIVE_STATUS.ACTIVE,
    },
    {
      label: t('general:common.inActive'),
      value: ACTIVE_STATUS.INACTIVE,
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          status: tab,
          updatedBy: filters?.updatedBy?.id,
          createdBy: filters?.createdBy?.id,
        },
        [
          { field: 'createdAt', filterFormat: 'date' },
          { field: 'updatedAt', filterFormat: 'date' },
        ],
      ),
      sort: convertSortParams(
        sort || {
          orderBy: 'createdAt',
          order: 'DESC',
        },
      ),
    }
    actions.searchDepartmentList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, tab])

  const onClickActive = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenActive(true)
  }

  const onClickInActive = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenInActive(true)
  }

  const onSubmitActive = () => {
    actions.deactiveDepartmentById(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.activeDepartmentById(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineDepartment')}
      loading={isLoading}
      fitScreen
    >
      <HotKeys
        // handlers={{
        //   ...(canAccess(FUNCTION_CODE.USER_CREATE_DEPARTMENT_SETTING)
        //     ? {
        //         onCreate: () =>
        //           history.push(withSearch(ROUTE.DEPARTMENT_LIST.CREATE.PATH)),
        //       }
        //     : {}),
        // }}
        onCreate={() =>
          history.push(withSearch(ROUTE.DEPARTMENT_LIST.CREATE.PATH))
        }
      />
      <TaskBar>
        {/* <Guard code={FUNCTION_CODE.USER_CREATE_DEPARTMENT_SETTING}> */}
        <Button
          onClick={() =>
            history.push(withSearch(ROUTE.DEPARTMENT_LIST.CREATE.PATH))
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
          name={t('menu.defineDepartment')}
          onDownloadTemplate={() =>
            getDepartmentTemplateApi(USER_TYPE_TEMPLATE.DEPARTMENT_SETTING)
          }
          // {...(canAccess(FUNCTION_CODE.USER_IMPORT_DEPARTMENT_SETTING)
          //   ? {
          //       onImport: (file) => importDepartmentApi(file),
          //     }
          //   : {})}
          // {...(canAccess(FUNCTION_CODE.USER_EXPORT_DEPARTMENT_SETTING)
          //   ? {
          //       onExport: () =>
          //         exportDepartmentApi({
          //           columnSettings: JSON.stringify(columnsSettings),
          //           queryIds: JSON.stringify(
          //             selectedRows?.map((x) => ({ id: x?.id })),
          //           ),
          //           keyword: keyword.trim(),
          //           filter: convertFilterParams(
          //             {
          //               ...filters,
          //               status: tab,
          //               updatedBy: filters?.updatedBy?.id,
          //               createdBy: filters?.createdBy?.id,
          //             },
          //             [
          //               { field: 'createdAt', filterFormat: 'date' },
          //               { field: 'updatedAt', filterFormat: 'date' },
          //             ],
          //           ),
          //           sort: convertSortParams(
          //             sort || {
          //               orderBy: 'createdAt',
          //               order: 'DESC',
          //             },
          //           ),
          //           type: USER_TYPE_EXPORT.DEPARTMENT_SETTING,
          //         }),
          //     }
          //   : {})}
          onExport={() =>
            exportDepartmentApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: x?.id })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(
                {
                  ...filters,
                  status: tab,
                  updatedBy: filters?.updatedBy?.id,
                  createdBy: filters?.createdBy?.id,
                },
                [
                  { field: 'createdAt', filterFormat: 'date' },
                  { field: 'updatedAt', filterFormat: 'date' },
                ],
              ),
              sort: convertSortParams(
                sort || {
                  orderBy: 'createdAt',
                  order: 'DESC',
                },
              ),
              type: USER_TYPE_EXPORT.DEPARTMENT_SETTING,
            })
          }
          onImport={(file) => importDepartmentApi(file)}
          onRefresh={refreshData}
        />
      </TaskBar>

      <FilterArea
        values={{ keyword, ...filters }}
        onApply={({ keyword: k, ...f }) =>
          setMultiple({ keyword: k, filters: f })
        }
        searchPlaceholder={t('departmentList.codeOrName')}
        form={<FilterForm />}
        defaultValues={DEFAULT_FILTERS}
      />

      <DataTable
        title={t('departmentList.title')}
        columns={columns}
        rows={departmentList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        total={total}
        sort={sort}
        selected={selectedRows}
        onSelectionChange={setSelectedRows}
        tabs={<Tabs list={tabList} value={tab} onChange={setTab} />}
      />
      <DialogActive
        open={isOpenActive}
        onCancel={() => setIsOpenActive(false)}
        onSubmit={onSubmitActive}
        tempItem={tempItem}
      />
      <DialogInActive
        open={isOpenInActive}
        onCancel={() => setIsOpenInActive(false)}
        onSubmit={onSubmitInActive}
        tempItem={tempItem}
      />
    </Page>
  )
}

export default DepartmentList
