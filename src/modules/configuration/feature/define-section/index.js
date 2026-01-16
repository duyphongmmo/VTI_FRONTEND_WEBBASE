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
  DEFINE_SECTION_ENUM,
  DEFINE_SECTION_ENUM_OPTIONS,
} from '../../constants'
import useDefineSection from '../../redux/hooks/useDefineSection'
import {
  exportSectionApi,
  getSectionTemplateApi,
  importSectionApi,
} from '../../redux/sagas/define-section/import-export'
import DialogApprove from './dialogs/approve'
import DialogChangeStatus from './dialogs/change-status'
import DialogDelete from './dialogs/delete'
import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'decentralization',
  },
  {
    route: ROUTE.DEFINE_SECTION.LIST.PATH,
    title: ROUTE.DEFINE_SECTION.LIST.TITLE,
  },
]
function DefineSection() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  // const { canAccess } = useApp()

  const [selectedRows, setSelectedRows] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])
  const [tempItem, setTempItem] = useState(null)
  const [isOpenChangeStatus, setIsOpenChangeStatus] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenApprove, setIsOpenApprove] = useState(false)

  const DEFAULT_FILTERS = {
    code: '',
    eName: '',
    vName: '',
    jName: '',
    // departmentIds: [],
    divisionIds: [],
    statusList: [],
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
    setMultiple,
    withSearch,
    setTab,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
    tab: '',
  })

  const {
    data: { list, isLoading, total },
    actions,
  } = useDefineSection()

  const columns = [
    {
      field: 'code',
      headerName: t('defineSection.code'),
      width: 100,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'eName',
      headerName: t('defineSection.enName'),
      width: 150,
      sortable: true,
      visible: 'always',
    },
    {
      field: 'vName',
      headerName: t('defineSection.viName'),
      width: 150,
      sortable: true,
    },
    {
      field: 'jName',
      headerName: t('defineSection.jpName'),
      width: 150,
      sortable: true,
    },
    {
      field: 'description',
      headerName: t('defineSection.description'),
      width: 150,
    },
    {
      field: 'division',
      headerName: t('defineSection.division'),
      width: 150,
      renderCell: (params) => {
        let { division } = params?.row
        return division?.vName
      },
    },
    // {
    //   field: 'division',
    //   headerName: t('defineSection.division'),
    //   width: 150,
    //   renderCell: (params) => params?.row?.division?.vName,
    // },
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
      field: 'status',
      headerName: t('general:common.status'),
      width: 100,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DEFINE_SECTION_ENUM_OPTIONS}
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
        const isActive = status === DEFINE_SECTION_ENUM.ACTIVE
        const isDraft = status === DEFINE_SECTION_ENUM.DRAFT
        return (
          <>
            {/* <Guard code={FUNCTION_CODE.DETAIL_SECTION}> */}
            <IconButton
              title={t('iconButtonHover.view')}
              onClick={() =>
                history.push(
                  withSearch(
                    ROUTE.DEFINE_SECTION.DETAIL.PATH.replace(':id', `${id}`),
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {/* </Guard> */}
            {/* <Guard code={FUNCTION_CODE.UPDATE_SECTION}> */}
            <IconButton
              title={t('iconButtonHover.update')}
              onClick={() =>
                history.push(
                  withSearch(
                    ROUTE.DEFINE_SECTION.EDIT.PATH.replace(':id', `${id}`),
                  ),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            {/* </Guard> */}
            {isDraft && (
              <>
                {/* <Guard code={FUNCTION_CODE.DELETE_SECTION}> */}
                <IconButton
                  title={t('iconButtonHover.delete')}
                  onClick={() => onClickDelete(params.row)}
                >
                  <Icon name="delete" />
                </IconButton>
                {/* </Guard> */}
                {/* <Guard code={FUNCTION_CODE.COST_CENTER_APPROVE_SECTION}> */}
                <IconButton
                  title={t('iconButtonHover.approve')}
                  onClick={() => onClickApprove(params.row)}
                >
                  <Icon name="tick" />
                </IconButton>
                {/* </Guard> */}
              </>
            )}
            {/* <Guard
              code={
                FUNCTION_CODE.COST_CENTER_INACTIVE_SECTION ||
                FUNCTION_CODE.COST_CENTER_ACTIVE_SECTION
              }
            > */}
            {!isDraft && (
              <IconButton
                title={t(`iconButtonHover.${isActive ? 'inActive' : 'active'}`)}
                onClick={() => onClickChangeStatus(params.row)}
              >
                <Icon name={isActive ? 'active' : 'inActive'} />
              </IconButton>
            )}
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
      value: DEFINE_SECTION_ENUM.DRAFT,
      label: t('defineDivision.status.draft'),
    },
    {
      value: DEFINE_SECTION_ENUM.INACTIVE,
      label: t('defineDivision.status.inactive'),
    },
    {
      value: DEFINE_SECTION_ENUM.ACTIVE,
      label: t('defineDivision.status.active'),
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
      // code: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          code: keyword.trim(),
          divisionIds: filters?.divisionIds?.map((item) => item?.id)?.join(','),
          statusList: isTabAll ? filters?.statusList?.toString() : tab,
          createdBy: filters?.createdBy?.id,
          updatedBy: filters?.updatedBy?.id,
        },
        [
          { field: 'createdAt', filterFormat: 'date' },
          { field: 'updatedAt', filterFormat: 'date' },
        ],
      ),
      sort: convertSortParams(sort),
    }

    actions.searchDefineSection(params)
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
    actions.changeStatusDefineSection(
      {
        id: tempItem?.id,
        type:
          tempItem?.status === DEFINE_SECTION_ENUM.ACTIVE
            ? DEFINE_SECTION_ENUM.INACTIVE
            : DEFINE_SECTION_ENUM.ACTIVE,
      },
      refreshData,
    )
    setTempItem(null)
    setIsOpenChangeStatus(false)
  }

  const onSubmitDelete = () => {
    actions.deleteDefineSection(tempItem?.id, () => {
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
    actions.changeStatusDefineSection(
      { id: tempItem?.id, type: DEFINE_SECTION_ENUM.ACTIVE },
      refreshData,
    )
    setTempItem(null)
    setIsOpenApprove(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineSection')}
      loading={isLoading}
      fitScreen
    >
      <HotKeys
        handlers={{
          // ...(canAccess(FUNCTION_CODE.CREATE_SECTION)
          //   ? {
          //       onCreate: () =>
          //         history.push(withSearch(ROUTE.DEFINE_SECTION.CREATE.PATH)),
          //     }
          //   : {}),
          onCreate: () =>
            history.push(withSearch(ROUTE.DEFINE_SECTION.CREATE.PATH)),
        }}
      />

      <TaskBar>
        {/* <Guard code={FUNCTION_CODE.CREATE_SECTION}> */}
        <Button
          onClick={() =>
            history.push(withSearch(ROUTE.DEFINE_SECTION.CREATE.PATH))
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
          name={t('menu.defineSection')}
          // {...(canAccess(FUNCTION_CODE.IMPORT_SECTION)
          //   ? { onImport: (params) => importSectionApi(params) }
          //   : {})}
          onImport={(params) => importSectionApi(params)}
          onDownloadTemplate={() =>
            getSectionTemplateApi(COST_CENTER_TYPE_TEMPLATE.SECTION)
          }
          // {...(canAccess(FUNCTION_CODE.EXPORT_SECTION)
          //   ? {
          //       onExport: () =>
          //         exportSectionApi({
          //           keyword: keyword.trim(),
          //           columnSettings: JSON.stringify(columnsSettings),
          //           filter: convertFilterParams(
          //             {
          //               ...filters,
          //               departmentIds: filters?.departmentIds
          //                 ?.map((item) => item?.id)
          //                 ?.join(','),
          //               divisionIds: filters?.divisionIds
          //                 ?.map((item) => item?.id)
          //                 ?.join(','),
          //               statusList: isTabAll
          //                 ? filters?.statusList?.toString()
          //                 : tab,
          //               createdBy: filters?.createdBy?.id,
          //               updatedBy: filters?.updatedBy?.id,
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
          //           type: COST_CENTER_TYPE_EXPORT.SECTION,
          //         }),
          //     }
          //   : {})}
          onExport={() =>
            exportSectionApi({
              keyword: keyword.trim(),
              columnSettings: JSON.stringify(columnsSettings),
              filter: convertFilterParams(
                {
                  ...filters,
                  departmentIds: filters?.departmentIds
                    ?.map((item) => item?.id)
                    ?.join(','),
                  divisionIds: filters?.divisionIds
                    ?.map((item) => item?.id)
                    ?.join(','),
                  statusList: isTabAll ? filters?.statusList?.toString() : tab,
                  createdBy: filters?.createdBy?.id,
                  updatedBy: filters?.updatedBy?.id,
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
              type: COST_CENTER_TYPE_EXPORT.SECTION,
            })
          }
          onRefresh={refreshData}
        />
      </TaskBar>

      <FilterArea
        values={{ keyword, ...filters }}
        onApply={({ keyword: k, ...f }) => {
          if (f?.statusList?.length > 1) {
            setMultiple({
              tab: tabList[0].value,
              keyword: k,
              filters: f,
            })
            return
          }

          if (f?.statusList?.length === 1 && f?.statusList?.[0] !== tab) {
            setMultiple({
              tab: f?.statusList?.[0],
              keyword: k,
              filters: f,
            })
            return
          }

          setMultiple({ keyword: k, filters: f })
        }}
        defaultValues={DEFAULT_FILTERS}
        searchPlaceholder={t('defineSection.code')}
        form={<FilterForm />}
      />

      <DataTable
        title={t('defineSection.title')}
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

export default DefineSection
