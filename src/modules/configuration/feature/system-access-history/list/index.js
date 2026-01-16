import React, { useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACCESS_HISTORY_STATUS_OPTION,
} from '~/modules/configuration/constants'
import { ROUTE } from '~/modules/configuration/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import { useGetSystemAccessHistory } from './api'

const breadcrumbs = [
  {
    route: ROUTE.SYSTEM_ACCESS_HISTORY.LIST.PATH,
    title: ROUTE.SYSTEM_ACCESS_HISTORY.LIST.TITLE,
  },
]

const SystemAccessHistory = () => {
  const { t } = useTranslation(['configuration'])

  const { page, pageSize, setPage, setPageSize } = useQueryState()
  const [selectedRows, setSelectedRows] = useState([])
  const params = useMemo(
    () => ({
      page,
      limit: pageSize,
    }),
    [pageSize, page],
  )

  const {
    isLoading,
    list,
    total,
  } = useGetSystemAccessHistory(params)

  const columns = useMemo(() => [
    {
      field: 'username',
      headerName: t('systemAccessHistory.username'),
      width: 200,
      renderCell: (params) => {
        return params?.row?.username
      },
    },
    {
      field: 'browser',
      headerName: t('systemAccessHistory.browser'),
      width: 200,
      renderCell: (params) => {
        return params?.row?.browser
      },
    },
    {
      field: 'ipAddress',
      headerName: t('systemAccessHistory.ipAddress'),
      width: 200,
      renderCell: (params) => {
        return params?.row?.ipAddress
      },
    },
    {
      field: 'os',
      headerName: t('systemAccessHistory.os'),
      width: 200,
      renderCell: (params) => {
        return params?.row?.os
      },
    },
    {
      field: 'errorMessage',
      headerName: t('systemAccessHistory.errorMessage'),
      width: 200,
      renderCell: (params) => {
        return params?.row?.errorMessage
      },
    },
    {
      field: 'createdAt',
      headerName: t('systemAccessHistory.createdAt'),
      width: 200,
      renderCell: (params) => {
        return convertUtcDateTimeToLocalTz(params?.row?.createdAt)
      },
    },
    {
      field: 'status',
      headerName: t('systemAccessHistory.status'),
      width: 200,
      renderCell: (params) => {
        return (
          <Status
            options={ACCESS_HISTORY_STATUS_OPTION}
            value={params?.row?.status}
            variant="text"
          />
        )
      },
    },
  ])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.systemAccessHistory')}
      loading={isLoading}
      fitScreen
    >
      <DataTable
        title={t('systemAccessHistory.list')}
        rows={list}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
      />
    </Page>
  )
}

export default SystemAccessHistory
