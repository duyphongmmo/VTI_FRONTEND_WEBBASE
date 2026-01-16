import React, { useEffect, useMemo, useState } from 'react'

import { FormControlLabel, Box, Typography } from '@mui/material'
import { flatten, map, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import {
  ACTIVE_STATUS,
  MODAL_MODE,
  ROWS_PER_PAGE_OPTIONS,
  SUPER_ADMIN_CODE,
} from '~/common/constants'
// import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
// import { useApp } from '~/common/hooks/useApp'
import ActionBar from '~/components/ActionBar'
import Checkbox from '~/components/Checkbox'
import DataTableCollapse from '~/components/DataTableCollapse'
import FilterArea from '~/components/FilterArea'
import Page from '~/components/Page'
import useUserPermission from '~/modules/configuration/redux/hooks/useUserPermission'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertFilterParams } from '~/utils'

import useUserInfo from '../../redux/hooks/useUserInfo'
import FilterForm from './filter-form'
import { validationSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'decentralization',
  },
  {
    route: ROUTE.USER_PERMISSION.PATH,
    title: ROUTE.USER_PERMISSION.TITLE,
  },
]
const DEFAULT_FILTERS = {
  department: null,
  role: null,
  feature: '',
}
function UserPermission() {
  const { t } = useTranslation(['configuration'])

  const [permissionList, setPermissionList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE_OPTIONS[0])

  // const { canAccess } = useApp()
  const canUpdate = useMemo(
    () => true,
    //|| canAccess(FUNCTION_CODE.ADMIN_ROLE_ADMIN),
    // [canAccess],
    [],
  )

  const { filters, setFilters } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const {
    data: { permissionDetails, isLoading, total },
    actions,
  } = useUserPermission()

  const {
    data: { userInfo },
    actions: userActions,
  } = useUserInfo()

  useEffect(() => {
    refreshData()

    return () => {
      actions.resetUserPermissionDetailsState()
    }
  }, [filters])

  const refreshData = () => {
    if (filters?.department && filters?.role) {
      actions.getUserPermissionDetails({
        page,
        limit: pageSize,
        departmentId: filters?.department?.id,
        roleId: filters?.role?.id,
        filter: convertFilterParams({
          groupPermissionName: filters?.feature,
          status: ACTIVE_STATUS.ACTIVE,
        }),
      })
      setPage(1)
    }
  }

  const pageData = useMemo(() => {
    const group = permissionDetails?.groupPermissions || []
    const total = group.length || 0
    const start = total ? pageSize * (page - 1) : 0
    const end = total ? Math.min(pageSize * page, total) : 0
    if (permissionDetails?.groupPermissions?.length > 0)
      return [
        {
          id: 'All',
          name: t('departmentAssign.all'),
        },
        ...(group.slice(start, end) ?? []),
      ]
    else return []
  }, [permissionDetails?.groupPermissions, page, pageSize, t])

  const flattenPermissions = useMemo(
    () =>
      flatten(
        map(
          permissionDetails?.groupPermissions,
          (per) => per.permissionSettings,
        ),
      ),
    [permissionDetails?.groupPermissions],
  )

  useEffect(() => {
    setPermissionList(flattenPermissions)
  }, [flattenPermissions])

  const handleChangeCheckbox = (e, code) => {
    const newPermission = permissionList.map((permission) => {
      if (permission.code === code) {
        return {
          ...permission,
          status: e.target.checked ? 1 : 0,
        }
      }
      return { ...permission }
    })
    setPermissionList(newPermission)
  }

  const handleChangeAll = (e, permissionSettings) => {
    const permissionIdList = permissionSettings.map((item) => item.code)
    const newPermissionAll = permissionList.map((permission) => {
      if (permissionIdList.includes(permission.code)) {
        return {
          ...permission,
          status: e.target.checked ? 1 : 0,
        }
      }
      return { ...permission }
    })
    setPermissionList(newPermissionAll)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const params = {
      departmentId: filters.department?.id,
      roleId: filters.role?.id,
      permissions: permissionList,
    }
    actions.updateUserPermission(params, () => {
      refreshData()
      if (userInfo?.code !== SUPER_ADMIN_CODE) {
        userActions.getUserInfo()
      }
    })
  }

  const renderActionBar = () => {
    return (
      canUpdate && (
        <ActionBar
          onCancel={() => setPermissionList(flattenPermissions)}
          mode={MODAL_MODE.UPDATE}
        />
      )
    )
  }
  const handleCheckAll = (e) => {
    const newPermission = permissionList.map((permission) => {
      return {
        ...permission,
        status: e.target.checked ? 1 : 0,
      }
    })
    setPermissionList(newPermission)
  }
  const columns = [
    {
      field: 'feature',
      headerName: t('userPermission.feature'),
      align: 'left',
      renderCell: (params) => {
        const { id } = params.row
        return (
          <Box
            sx={{
              ml: id === 'All' ? 3.3 : 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: id === 'All' ? 600 : 400,
              }}
            >
              {params?.row?.name}
            </Typography>
          </Box>
        )
      },
    },
    {
      field: 'assign',
      // headerName: () => {
      //   const isCheckAll =
      //     permissionList?.filter((item) => item.status === 1).length ===
      //     permissionList?.length
      //   return (
      //     <Box
      //       sx={{
      //         display: 'flex',
      //         alignItems: 'center',
      //       }}
      //     >
      //       <Box>
      //         <FormControlLabel
      //           label=""
      //           control={
      //             <Checkbox
      //               sx={{
      //                 color: 'primary.main',
      //               }}
      //               onChange={handleCheckAll}
      //               name="statusAll"
      //               checked={isCheckAll}
      //             />
      //           }
      //         />
      //       </Box>

      //       <Typography
      //         sx={{
      //           fontWeight: 600,
      //         }}
      //       >
      //         {t('userPermission.assign')}
      //       </Typography>
      //     </Box>
      //   )
      // },
      headerName: t('userPermission.assign'),
      width: 150,
      renderCell: (params) => {
        const { permissionSettings, id } = params.row
        const checkedPermissions = (permissionList || [])
          .filter((item) => item.status === 1)
          .map((per) => per.code)

        const isCheck = permissionSettings?.every((item) => {
          return checkedPermissions.includes(item.code)
        })
        const isCheckAll = permissionList?.every((item) => item.status === 1)
        const checked = id === 'All' ? isCheckAll : isCheck
        const isSomeChecked =
          checkedPermissions?.length > 0 && id === 'All' && !isCheckAll
        return (
          <FormControlLabel
            label=""
            control={
              <Checkbox
                checked={Boolean(checked)}
                indeterminate={isSomeChecked}
                onChange={(e) => {
                  if (id === 'All') {
                    handleCheckAll(e)
                  } else {
                    handleChangeAll(e, permissionSettings)
                  }
                }}
                name={
                  id === 'All'
                    ? 'statusAll'
                    : `status_${params.row.code}_${params.row.id}`
                }
                disabled={!canUpdate}
              />
            }
          />
        )
      },
    },
  ]

  const subColumns = [
    {
      field: 'permissionSetting',
      renderCell: (params) => {
        return params?.row?.name
      },
    },
    {
      field: 'status',
      width: 150,
      renderCell: (params) => {
        const { code } = params.row
        const isChecked = permissionList?.some(
          (item) => item?.code === code && !!item?.status,
        )
        return (
          <FormControlLabel
            label=""
            control={
              <Checkbox
                onChange={(e) => handleChangeCheckbox(e, code)}
                checked={isChecked}
                name="status"
                disabled={!canUpdate}
              />
            }
          />
        )
      },
    },
  ]

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.userPermission')}
      loading={isLoading}
      fitScreen
    >
      <FilterArea
        values={filters}
        onApply={setFilters}
        form={<FilterForm />}
        defaultValues={DEFAULT_FILTERS}
        validationSchema={validationSchema(t)}
      />

      {!isEmpty(pageData) && (
        <form
          onSubmit={onSubmit}
          key={`${filters?.department?.id}_${filters?.role?.id}`}
          style={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DataTableCollapse
            rows={pageData}
            columns={columns}
            subColumns={subColumns}
            subDataKey="permissionSettings"
            total={total}
            page={page}
            pageSize={pageSize}
            onPageChange={(page) => setPage(page)}
            onPageSizeChange={(pageSize) => {
              setPage(1)
              setPageSize(pageSize)
            }}
            hideSetting
          />

          {renderActionBar()}
        </form>
      )}
    </Page>
  )
}

export default UserPermission
