import { useEffect, useState } from 'react'

import { Pie } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import { WAREHOUSE_EXPORT_RECEIPT_STATUS } from '~/modules/wmsx/constants'
import { getDashboardWarehouses } from '~/modules/wmsx/redux/sagas/dashboard'
const ExportReceipt = () =>
  // { fromDate, toDate }
  {
    const { t } = useTranslation(['wmsx'])
    const [warehouseId, setWarehouseId] = useState('')
    const [total, setTotal] = useState({})

    // const { data: saleOrderExports, actions } = useDashboardSaleOrderExports()

    const mockData = [
      {
        status: WAREHOUSE_EXPORT_RECEIPT_STATUS.PENDING,
        total: 50,
      },
      {
        status: WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED,
        total: 50,
      },
      {
        status: WAREHOUSE_EXPORT_RECEIPT_STATUS.PICKING,
        total: 50,
      },
      {
        status: WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETE_PICK,
        total: 50,
      },
      {
        status: WAREHOUSE_EXPORT_RECEIPT_STATUS.TO_PACK,
        total: 50,
      },
      {
        status: WAREHOUSE_EXPORT_RECEIPT_STATUS.WAITING_IMPORT_WAREHOUSE_SCENCE,
        total: 50,
      },
      {
        status: WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETE_EXPORT,
        total: 50,
      },
      {
        status: WAREHOUSE_EXPORT_RECEIPT_STATUS.WAITING_IMPORT_WAREHOUSE_SCENCE,
        total: 25,
      },
      {
        status: WAREHOUSE_EXPORT_RECEIPT_STATUS.REJECTED,
        total: 24,
      },
      {
        status: WAREHOUSE_EXPORT_RECEIPT_STATUS.CANCEL,
        total: 24,
      },
      {
        status: WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETED,
        total: 32,
      },
    ]

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

    const calculateTotal = () => {
      let totalUnprocessed = 0
      let totalRejectOrCancel = 0
      let totalReceived = 0
      let totalPicking = 0
      let totalPack = 0
      let totalWaitingImport = 0
      let totalCompletePick = 0
      let total = 0

      mockData.forEach((item) => {
        total += item.total
        switch (item?.status) {
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.PENDING:
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED:
            totalUnprocessed += item?.total
            break
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.PICKING:
            totalPicking += item?.total
            break
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.TO_PACK:
            totalPack += item?.total
            break
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.WAITING_IMPORT_WAREHOUSE_SCENCE:
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETE_EXPORT:
            totalWaitingImport += item?.total
            break
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETE_PICK:
            totalCompletePick += item?.total
            break
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.CANCELED:
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.REJECTED:
            totalRejectOrCancel += item?.total
            break
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETED:
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
        totalPicking: totalPicking / total,
        totalPack: totalPack / total,
        totalWaitingImport: totalWaitingImport / total,
        totalCompletePick: totalCompletePick / total,
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
    const EXPORT_RECEIPT_COLORS = [
      '#472EA3',
      '#5E3FBE',
      '#886BD8',
      '#A88DEB',
      '#CBB6F8',
      '#E5DAFB',
      '#F4F0FD',
    ]

    const data = [
      {
        type: t('dashboard.exportReceipt.unprocessed'),
        value: total?.totalUnprocessed,
      },
      {
        type: t('dashboard.exportReceipt.pickingItem'),
        value: total?.totalPicking,
      },
      {
        type: t('dashboard.exportReceipt.package'),
        value: total?.totalPack,
      },
      {
        type: t('dashboard.exportReceipt.pendingExport'),
        value: total?.totalCompletePick,
      },
      {
        type: t('dashboard.exportReceipt.waitingImportWarehouseScene'),
        value: total?.totalWaitingImport,
      },
      {
        type: t('dashboard.exportReceipt.rejectOrCancel'),
        value: total?.totalRejectOrCancel,
      },
      {
        type: t('dashboard.exportReceipt.exported'),
        value: total?.totalCompletePick,
      },
    ]

    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      color: EXPORT_RECEIPT_COLORS,
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
    //     headerName: t('dashboard.exportReceipt.total'),
    //     align: 'right',
    //     headerAlign: 'left',
    //   },
    //   {
    //     field: 'totalInCollecting',
    //     headerName: t('dashboard.exportReceipt.pickingItem'),
    //     align: 'right',
    //     headerAlign: 'left',
    //   },
    //   {
    //     field: 'totalCollected',
    //     headerName: t('dashboard.exportReceipt.pendingExport'),
    //     align: 'right',
    //     headerAlign: 'left',
    //   },
    //   {
    //     field: 'totalCompleted',
    //     headerName: t('dashboard.exportReceipt.exported'),
    //     align: 'right',
    //     headerAlign: 'left',
    //   },
    //   {
    //     field: 'totalEbs',
    //     headerName: t('dashboard.exportReceipt.ebsExport'),
    //     align: 'right',
    //     headerAlign: 'left',
    //   },
    // ]

    return (
      <Card sx={{ p: 1, height: '100%' }}>
        <Typography variant="h2" sx={{ mb: 1.5 }}>
          {t('dashboard.exportReceipt.title')}
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

export default ExportReceipt
