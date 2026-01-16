import React, { useEffect, useMemo, useState } from 'react'

import { isEmpty, map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import {
  ACTIVE_STATUS,
  NOTIFICATION_TYPE,
  SUPER_ADMIN_CODE,
} from '~/common/constants'
// import { FUNCTION_CODE } from '~/common/constants/functionCode'
import {
  PRODUCES_TYPE_TEMPLATE,
  USER_TYPE_EXPORT,
} from '~/common/constants/import-export'
import { useQueryState } from '~/common/hooks'
// import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import FilterArea from '~/components/FilterArea'
// import Guard from '~/components/Guard'
import HotKeys from '~/components/HotKeys'
import Icon from '~/components/Icon'
import IconButton from '~/components/IconButton'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TaskBar from '~/components/TaskBar'
import useUserManagement from '~/modules/configuration/redux/hooks/useUserManagement'
import { ROUTE } from '~/modules/configuration/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'
import qs from '~/utils/qs'
import addNotification from '~/utils/toast'

import { STATUS_TYPE, USER_MANAGEMENT_STATUS_OPTIONS } from '../../constants'
import {
  exportUserApi,
  importUserApi,
} from '../../redux/sagas/user-management/import-export-user'
import { getTemplateImport } from '../user-info/api'
import { useActiveUser, useInActiveUser } from './api'
import FilterForm from './filter-form'
import { getUserPositionByCostCenters } from './utils'
const breadcrumbs = [
  {
    title: ROUTE.DECENTRALIZATION.TITLE,
  },
  {
    route: ROUTE.USER_MANAGEMENT.LIST.PATH,
    title: ROUTE.USER_MANAGEMENT.LIST.TITLE,
  },
]

function UserManagement() {
  const { t } = useTranslation('configuration')
  const history = useHistory()
  const location = useLocation()
  const { factoryId } = qs.parse(location.search)
  // const { canAccess } = useApp()

  const DEFAULT_FILTERS = {
    keyword: '',
    fullName: '',
    email: '',
    costCenterIds: [],
    departmentIds: [],
    sectionIds: [],
    divisionIds: [],
    roleIds: [],
    warehouseIds: [],
    createdAt: null,
    createdBy: null,
    updatedAt: null,
    updatedBy: null,
  }

  const { trigger: actionActive, isMutating: isLoadingActive } = useActiveUser()
  const { trigger: actionInActive, isMutating: isLoadingInActive } =
    useInActiveUser()

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
    filters: DEFAULT_FILTERS,
    tab: '',
  })

  const {
    data: { userList, total, isLoading },
    actions,
  } = useUserManagement()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isActiveModal: false,
  })
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const onClickUpdateStatus = (tempItem) => {
    setModal({ ...modal, isActiveModal: true, tempItem: tempItem })
  }

  const onSubmitUpdateStatus = () => {
    const onSuccess = (res) => {
      refreshData()
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

  const columns = [
    {
      field: 'code',
      headerName: t('userManagement.code'),
      width: 100,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'username',
      headerName: t('userManagement.username'),
      width: 100,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'fullName',
      headerName: t('userManagement.fullName'),
      width: 150,
      visible: 'always',
    },
    {
      field: 'email',
      headerName: t('userManagement.email'),
      width: 150,
      sortable: false,
    },
    {
      field: 'departmentName',
      headerName: t('userManagement.department'),
      width: 150,
      sortable: false,
      renderCell: (params) =>
        params.row?.department?.map((item) => item?.name).join(', '),
    },
    {
      field: 'section',
      headerName: t('userManagement.section'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params.row?.sections
          ?.map((item) => item?.division?.code)
          .join(', ')
      },
    },
    {
      field: 'division',
      headerName: t('userManagement.division'),
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return params.row?.sections?.map((item) => item?.vName).join(', ')
      },
    },
    {
      field: 'role',
      headerName: t('userManagement.role'),
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return params.row?.userRoleSettings?.map((m) => m?.name)?.join(', ')
      },
    },
    {
      field: 'nameWarehouse',
      headerName: t('userManagement.warehouse'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const warehousesName = params.row.userWarehouses
          ?.map((warehouse) => warehouse?.code)
          ?.join(', ')
        return warehousesName
      },
    },
    {
      field: 'updatedAt',
      headerName: t('userManagement.updatedAt'),
      width: 100,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params.row?.updatedAt)
      },
    },
    {
      field: 'updatedBy',
      headerName: t('userManagement.updatedBy'),
      width: 100,
      filterFormat: 'date',
      renderCell: (params) => {
        return params.row?.updatedBy?.fullName
      },
    },
    {
      field: 'createdAt',
      headerName: t('userManagement.createdAt'),
      width: 100,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params.row?.createdAt)
      },
    },
    {
      field: 'createdBy',
      headerName: t('userManagement.createdBy'),
      width: 100,
      filterFormat: 'date',
      renderCell: (params) => {
        return params.row?.createdBy?.fullName
      },
    },
    {
      field: 'status',
      headerName: t('userManagement.status'),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={USER_MANAGEMENT_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('userManagement.action'),
      width: 150,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      growUp: false,
      renderCell: (params) => {
        const { id, status } = params?.row
        const isShowAction = params?.row?.code !== SUPER_ADMIN_CODE
        const isLocked = status === STATUS_TYPE.ACTIVE
        return (
          <div>
            {/* <Guard
              code={
                isLocked
                  ? FUNCTION_CODE.USER_ACTIVE_USER
                  : FUNCTION_CODE.USER_INACTIVE_USER
              }
            > */}
            <IconButton
              title={t(`iconButtonHover.${isLocked ? 'inActive' : 'active'}`)}
              onClick={() => onClickUpdateStatus(params.row)}
            >
              <Icon name={isLocked ? 'locked' : 'unlock'} />
            </IconButton>
            {/* </Guard> */}
            {/* <Guard code={FUNCTION_CODE.USER_DETAIL_USER}> */}
            <IconButton
              title={t('iconButtonHover.view')}
              onClick={() =>
                history.push(
                  withSearch(
                    ROUTE.USER_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`),
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {/* </Guard> */}
            {isShowAction && (
              // <Guard code={FUNCTION_CODE.USER_UPDATE_USER}>
              <IconButton
                title={t('iconButtonHover.update')}
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.USER_MANAGEMENT.EDIT.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
              // </Guard>
            )}

            {isShowAction && (
              // <Guard code={FUNCTION_CODE.USER_CREATE_USER}>
              <IconButton
                title={t('iconButtonHover.clone')}
                onClick={() =>
                  history.push(
                    withSearch(
                      `${ROUTE.USER_MANAGEMENT.CREATE.PATH}?cloneId=${id}`,
                    ),
                  )
                }
              >
                <Icon name="clone" />
              </IconButton>
              // </Guard>
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
          costCenterIds: filters?.costCenterIds?.map((item) => item?.id),
          departmentIds: filters?.departmentIds?.map((item) => item?.id),
          roleIds: filters?.roleIds?.map((item) => item?.id),
          warehouseIds: filters?.warehouseIds?.map((item) => item?.id),
          divisionIds: filters?.divisionIds?.map((item) => item?.id),
          sectionIds: filters?.sectionIds?.map((item) => item?.id),
          updatedBy: filters?.updatedBy?.id,
          createdBy: filters?.createdBy?.id,
        },
        [
          { field: 'createdAt', filterFormat: 'date' },
          { field: 'updatedAt', filterFormat: 'date' },
        ],
      ),
      sort: convertSortParams(sort),
    }
    actions.searchUsers(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, tab])

  useEffect(() => {
    setSelectedRows([])
  }, [selectedRowsDeps, tab])

  const onSubmitDelete = () => {
    actions.deleteUser(modal?.tempItem?.id, () => {
      refreshData()
      if (
        !isEmpty(selectedRows) &&
        map(selectedRows, 'id')?.includes(modal?.tempItem?.id)
      ) {
        setSelectedRows(
          selectedRows.filter((row) => row?.id !== modal.tempItem?.id),
        )
      }
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const mapData = useMemo(() => {
    return userList?.map((item) => {
      const { costCenters } = item
      const position = getUserPositionByCostCenters(costCenters)
      return {
        ...item,
        division: position?.division,
        department: item?.departmentSettings ?? position?.department,
        section: position?.section,
      }
    })
  }, [userList])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.userManagement')}
      loading={isLoading || isLoadingActive || isLoadingInActive}
      {...(factoryId
        ? { onBack: () => history.push(ROUTE.COMPANY_CHART.LIST.PATH) }
        : {})}
      fitScreen
    >
      <HotKeys
        handlers={{
          // ...(canAccess(FUNCTION_CODE.USER_CREATE_USER)
          //   ? {
          //       onCreate: () =>
          //         history.push(withSearch(ROUTE.USER_MANAGEMENT.CREATE.PATH)),
          //     }
          //   : {}),
          onCreate: () =>
            history.push(withSearch(ROUTE.USER_MANAGEMENT.CREATE.PATH)),
        }}
      />
      <TaskBar>
        {/* <Guard code={FUNCTION_CODE.USER_CREATE_USER}> */}
        <Button
          onClick={() =>
            history.push(withSearch(ROUTE.USER_MANAGEMENT.CREATE.PATH))
          }
          icon="add"
          iconColor="primary"
          variant="text"
          color="text"
        >
          {t('general:common.create')}
        </Button>
        {/* </Guard> */}

        {/* <Guard code={FUNCTION_CODE.USER_DELETE_USER}>
          <BulkActions
            handler={{
              actions: [BULK_ACTION.DELETE],
              apiUrl: API_URL.USER,
              onSuccess: () => {
                if (page === 1) {
                  refreshData()
                } else {
                  setPage(1)
                }
                setSelectedRows([])
              },
            }}
            selected={selectedRows}
          />
        </Guard> */}

        <ImportExport
          name={t('menu.userManagement')}
          // {...(canAccess(FUNCTION_CODE.USER_IMPORT_USER)
          //   ? {
          //       onImport: (params) => importUserApi(params),
          //     }
          //   : {})}
          // {...(canAccess(FUNCTION_CODE.USER_EXPORT_USER)
          //   ? {
          //       onExport: () => {
          //         return exportUserApi({
          //           columnSettings: JSON.stringify(columnsSettings),
          //           queryIds: JSON.stringify(
          //             selectedRows?.map((x) => ({ id: x?.id })),
          //           ),
          //           keyword: keyword.trim(),
          //           filter: convertFilterParams(
          //             {
          //               ...filters,
          //               status: tab,
          //               costCenterIds: filters?.costCenterIds?.map(
          //                 (item) => item?.id,
          //               ),
          //               departmentIds: filters?.departmentIds?.map(
          //                 (item) => item?.id,
          //               ),
          //               roleIds: filters?.roleIds?.map((item) => item?.id),
          //               warehouseIds: filters?.warehouseIds?.map(
          //                 (item) => item?.id,
          //               ),
          //               sectionIds: filters?.sectionIds?.map(
          //                 (item) => item?.id,
          //               ),
          //               divisionIds: filters?.divisionIds?.map(
          //                 (item) => item?.id,
          //               ),
          //               updatedBy: filters?.updatedBy?.id,
          //               createdBy: filters?.createdBy?.id,
          //             },
          //             [
          //               { field: 'createdAt', filterFormat: 'date' },
          //               { field: 'updatedAt', filterFormat: 'date' },
          //             ],
          //           ),
          //           sort: convertSortParams(sort),
          //           type: USER_TYPE_EXPORT.USER_MANAGEMENT,
          //         })
          //       },
          //     }
          //   : {})}
          onImport={(params) => importUserApi(params)}
          onExport={() => {
            return exportUserApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: x?.id })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(
                {
                  ...filters,
                  status: tab,
                  costCenterIds: filters?.costCenterIds?.map(
                    (item) => item?.id,
                  ),
                  departmentIds: filters?.departmentIds?.map(
                    (item) => item?.id,
                  ),
                  roleIds: filters?.roleIds?.map((item) => item?.id),
                  warehouseIds: filters?.warehouseIds?.map((item) => item?.id),
                  sectionIds: filters?.sectionIds?.map((item) => item?.id),
                  divisionIds: filters?.divisionIds?.map((item) => item?.id),
                  updatedBy: filters?.updatedBy?.id,
                  createdBy: filters?.createdBy?.id,
                },
                [
                  { field: 'createdAt', filterFormat: 'date' },
                  { field: 'updatedAt', filterFormat: 'date' },
                ],
              ),
              sort: convertSortParams(sort),
              type: USER_TYPE_EXPORT.USER_MANAGEMENT,
            })
          }}
          onDownloadTemplate={() =>
            getTemplateImport(PRODUCES_TYPE_TEMPLATE.PRODUCTION_LINE)
          }
          onRefresh={refreshData}
        />
      </TaskBar>

      <FilterArea
        values={{ keyword, ...filters }}
        onApply={({ keyword: k, ...f }) =>
          setMultiple({ keyword: k, filters: f })
        }
        searchPlaceholder={t('userManagement.codeOrName')}
        form={<FilterForm />}
        defaultValues={DEFAULT_FILTERS}
      />

      <DataTable
        title={t('userManagement.title')}
        rows={mapData}
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
          value={modal?.tempItem?.username}
          sx={{ mt: 1 }}
        />
        <LV
          label={t('userManagement.fullName')}
          value={modal?.tempItem?.fullName}
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

export default UserManagement
