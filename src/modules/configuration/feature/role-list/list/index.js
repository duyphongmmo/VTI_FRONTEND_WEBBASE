import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
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
import useRoleManagement from '~/modules/configuration/redux/hooks/useRoleList'
import { ROUTE } from '~/modules/configuration/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import {
  getTemplateRoleListImportApi,
  importRoleListApi,
} from '../api/import-export'
import DialogActive from '../dialogs/active'
import DialogInActive from '../dialogs/in-active'
import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'decentralization',
  },
  {
    route: ROUTE.ROLE_LIST.LIST.PATH,
    title: ROUTE.ROLE_LIST.LIST.TITLE,
  },
]

const DEFAULT_FILTERS = {
  keyword: '',
  description: '',
  createdAt: null,
  createdBy: null,
  updatedAt: null,
  updatedBy: null,
}
const RoleList = () => {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()

  const {
    data: { roleList, isLoading, total },
    actions,
  } = useRoleManagement()

  const [tempItem, setTempItem] = useState(null)
  const [isOpenActive, setIsOpenActive] = useState(false)
  const [isOpenInActive, setIsOpenInActive] = useState(false)

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
    tab: '',
  })

  const columns = [
    {
      field: 'code',
      headerName: t('roleManagement.code'),
      width: 200,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('roleManagement.name'),
      width: 200,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('roleManagement.description'),
      width: 200,
      fixed: true,
    },
    {
      field: 'updatedAt',
      headerName: t('roleManagement.updatedAt'),
      width: 100,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params.row?.updatedAt)
      },
    },
    {
      field: 'updatedBy',
      headerName: t('roleManagement.updatedBy'),
      width: 100,
      filterFormat: 'date',
      renderCell: (params) => {
        return params.row?.updatedBy?.fullName
      },
    },
    {
      field: 'createdAt',
      headerName: t('roleManagement.createdAt'),
      width: 100,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params.row?.createdAt)
      },
    },
    {
      field: 'createdBy',
      headerName: t('roleManagement.createdBy'),
      width: 100,
      filterFormat: 'date',
      renderCell: (params) => {
        return params.row?.createdBy?.fullName
      },
    },
    {
      field: 'status',
      headerName: t('roleManagement.status'),
      width: 120,
      renderCell: (params) => {
        const status = Number(params?.row.status)
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
      width: 120,
      align: 'center',
      visible: 'always',
      sticky: 'right',
      growUp: false,
      renderCell: (params) => {
        const { id, status } = params?.row
        const isActive = status === ACTIVE_STATUS.ACTIVE
        return (
          <div>
            <Guard code={FUNCTION_CODE.USER_DETAIL_USER_ROLE_SETTING}>
              <IconButton
                title={t('iconButtonHover.view')}
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.ROLE_LIST.DETAIL.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.USER_UPDATE_USER_ROLE_SETTING}>
              <IconButton
                title={t('iconButtonHover.update')}
                onClick={() =>
                  history.push(
                    withSearch(
                      ROUTE.ROLE_LIST.EDIT.PATH.replace(':id', `${id}`),
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>

            <Guard
              code={
                isActive
                  ? FUNCTION_CODE.USER_LOCK_USER_ROLE_SETTING
                  : FUNCTION_CODE.USER_UNLOCK_USER_ROLE_SETTING
              }
            >
              {isActive ? (
                <IconButton
                  title={t('iconButtonHover.inActive')}
                  onClick={() => onClickInActive(params.row)}
                >
                  <Icon name="active" />
                </IconButton>
              ) : (
                <IconButton
                  title={t('iconButtonHover.active')}
                  onClick={() => onClickActive(params.row)}
                >
                  <Icon name="inActive" />
                </IconButton>
              )}
            </Guard>
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
    actions.searchRoleList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword, tab])

  const onClickActive = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenActive(true)
  }

  const onClickInActive = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenInActive(true)
  }

  const onSubmitActive = () => {
    actions.confirmRoleAssignById(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenActive(false)
  }

  const onSubmitInActive = () => {
    actions.rejectRoleAssignById(tempItem?.id, refreshData)
    setTempItem(null)
    setIsOpenInActive(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineRole')}
      loading={isLoading}
      fitScreen
    >
      <HotKeys
        handlers={{
          onCreate: () => history.push(withSearch(ROUTE.ROLE_LIST.CREATE.PATH)),
        }}
      />
      <TaskBar>
        <Guard code={FUNCTION_CODE.USER_CREATE_USER_ROLE_SETTING}>
          <Button
            onClick={() =>
              history.push(withSearch(ROUTE.ROLE_LIST.CREATE.PATH))
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
          name={t('menu.defineRole')}
          onImport={(params) => importRoleListApi(params)}
          onDownloadTemplate={() => getTemplateRoleListImportApi()}
          onRefresh={refreshData}
        />
      </TaskBar>

      <FilterArea
        values={{ keyword, ...filters }}
        onApply={({ keyword: k, ...f }) =>
          setMultiple({ keyword: k, filters: f })
        }
        defaultValues={DEFAULT_FILTERS}
        searchPlaceholder={t('roleManagement.searchCodeOrName')}
        form={<FilterForm />}
      />

      <DataTable
        title={t('roleManagement.title')}
        columns={columns}
        rows={roleList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
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

export default RoleList
