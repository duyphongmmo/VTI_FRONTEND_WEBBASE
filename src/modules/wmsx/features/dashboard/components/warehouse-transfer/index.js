import { useEffect, useState } from 'react'

import { Pie } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import { TRANSFER_REQUEST_STATUS } from '~/modules/wmsx/constants'
import { getDashboardWarehouses } from '~/modules/wmsx/redux/sagas/dashboard'
const WarehouseTransfer = () => {
  const { t } = useTranslation(['wmsx'])
  const [warehouseId, setWarehouseId] = useState('')
  const [total, setTotal] = useState({})

  // const { data: saleOrderExports, actions } = useDashboardSaleOrderExports()

  // useEffect(() => {
  //   if (!isEmpty(warehouseId)) {
  //     actions.getSaleOrderExports({
  //       warehouseId: warehouseId?.id,
  //       from: fromDate?.toISOString(),
  //       to: toDate?.toISOString(),
  //     })
  //   } else {
  //     actions.getSaleOrderExports({
  //       from: fromDate?.toISOString(),
  //       to: toDate?.toISOString(),
  //     })
  //   }
  // }, [warehouseId, fromDate, toDate])

  // useEffect(() => {
  //   actions.getSaleOrderExports({
  //     from: fromDate?.toISOString(),
  //     to: toDate?.toISOString(),
  //   })
  // }, [])

  const mockData = [
    {
      status: TRANSFER_REQUEST_STATUS.PENDING,
      total: 50,
    },
    {
      status: TRANSFER_REQUEST_STATUS.CONFIRMED,
      total: 50,
    },
    {
      status: TRANSFER_REQUEST_STATUS.PICKING_UP,
      total: 50,
    },
    {
      status: TRANSFER_REQUEST_STATUS.WAITING_EXPORT,
      total: 50,
    },
    {
      status: TRANSFER_REQUEST_STATUS.WAITING_IMPORT,
      total: 50,
    },
    {
      status: TRANSFER_REQUEST_STATUS.REJECTED,
      total: 50,
    },
    {
      status: TRANSFER_REQUEST_STATUS.CANCEL,
      total: 50,
    },
    {
      status: TRANSFER_REQUEST_STATUS.COMPLETED,
      total: 32,
    },
  ]

  const calculateTotal = () => {
    let totalUnprocessed = 0
    let totalPickingUp = 0
    let totalWaitingExport = 0
    let totalWaitingImport = 0
    let totalRejectOrCancel = 0
    let totalReceived = 0 // Đã nhập kho
    let total = 0

    mockData.forEach((item) => {
      total += item.total
      switch (item?.status) {
        case TRANSFER_REQUEST_STATUS.PENDING:
        case TRANSFER_REQUEST_STATUS.CONFIRMED:
          totalUnprocessed += item?.total
          break
        case TRANSFER_REQUEST_STATUS.PICKING_UP:
          totalPickingUp += item?.total
          break
        case TRANSFER_REQUEST_STATUS.WAITING_EXPORT:
          totalWaitingExport += item?.total
          break
        case TRANSFER_REQUEST_STATUS.WAITING_IMPORT:
          totalWaitingImport += item?.total
          break
        case TRANSFER_REQUEST_STATUS.CANCEL:
        case TRANSFER_REQUEST_STATUS.REJECTED:
          totalRejectOrCancel += item?.total
          break
        case TRANSFER_REQUEST_STATUS.COMPLETED:
          totalReceived += item?.total
          break
        default:
          break
      }
    })

    setTotal({
      totalUnprocessed: totalUnprocessed / total,
      totalRejectOrCancel: totalRejectOrCancel / total,
      totalReceived: totalReceived / total,
      totalPickingUp: totalPickingUp / total,
      totalWaitingImport: totalWaitingImport / total,
      totalWaitingExport: totalWaitingExport / total,
    })
  }

  useEffect(() => {
    calculateTotal()
  }, [])

  const handleChangeWarehouse = (value) => {
    if (!isEmpty(value)) {
      setWarehouseId(value)
    } else {
      setWarehouseId('')
    }
  }
  const WAREHOUSE_TRANSFER_COLORS = [
    '#59AA76',
    '#67C587',
    '#88D1A1',
    '#A9DEBA',
    '#C9EAD4',
    '#EAF6ED',
  ]

  const data = [
    {
      type: t('dashboard.warehouseTransfer.unprocessed'),
      value: total?.totalUnprocessed,
    },
    {
      type: t('dashboard.warehouseTransfer.pickingItem'),
      value: total?.totalPickingUp,
    },
    {
      type: t('dashboard.warehouseTransfer.pendingExport'),
      value: total?.totalWaitingExport,
    },
    {
      type: t('dashboard.warehouseTransfer.waitingImportWarehouse'),
      value: total?.totalWaitingImport,
    },
    {
      type: t('dashboard.warehouseTransfer.rejectOrCancel'),
      value: total?.totalRejectOrCancel,
    },
    {
      type: t('dashboard.warehouseTransfer.received'),
      value: total?.totalReceived,
    },
  ]

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    color: WAREHOUSE_TRANSFER_COLORS,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        fill: '#333333',
      },
    },
    legend: {
      flipPage: false,
      maxRow: 5,
      marker: {
        symbol: 'square',
      },
      position: 'bottom',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  }

  // const columns = [
  //   {
  //     field: 'totalOrder',
  //     headerName: t('dashboard.warehouseTransfer.total'),
  //     align: 'right',
  //     headerAlign: 'left',
  //   },
  //   {
  //     field: 'totalInCollecting',
  //     headerName: t('dashboard.warehouseTransfer.pickingItem'),
  //     align: 'right',
  //     headerAlign: 'left',
  //   },
  //   {
  //     field: 'totalCollected',
  //     headerName: t('dashboard.warehouseTransfer.pendingExport'),
  //     align: 'right',
  //     headerAlign: 'left',
  //   },
  //   {
  //     field: 'totalCompleted',
  //     headerName: t('dashboard.warehouseTransfer.exported'),
  //     align: 'right',
  //     headerAlign: 'left',
  //   },
  //   {
  //     field: 'totalEbs',
  //     headerName: t('dashboard.warehouseTransfer.ebsExport'),
  //     align: 'right',
  //     headerAlign: 'left',
  //   },
  // ]

  return (
    <Card sx={{ p: 1, height: '100%' }}>
      <Typography variant="h2" sx={{ mb: 1.5 }}>
        {t('dashboard.warehouseTransfer.title')}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '25%' }}>
          <Autocomplete
            sx={{ mb: 1, width: '100%' }}
            name="businessTypeId"
            placeholder={t('dashboard.allBusinessType')}
          />
          <Autocomplete
            sx={{ mb: 1, width: '100%' }}
            name="warehouseId"
            placeholder={t('dashboard.allWarehouse')}
            asyncRequest={(s) =>
              getDashboardWarehouses({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            value={warehouseId}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            onChange={handleChangeWarehouse}
          />
        </Box>
        <Box sx={{ height: 240, width: '75%' }}>
          <Pie {...config} />
        </Box>
      </Box>
      {/* <DataTable
  hideFooter
  hideSetting
  rows={isEmpty(saleOrderExports) ? [] : [saleOrderExports]}
  columns={columns}
/> */}
    </Card>
  )
}

export default WarehouseTransfer
