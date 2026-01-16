import { useEffect, useState } from 'react'

import { Pie } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import {
  WAREHOUSE_EXPORT_RECEIPT_STATUS,
  WAREHOUSE_IMPORT_RECEIPT_STATUS,
} from '~/modules/wmsx/constants'
import { getDashboardWarehouses } from '~/modules/wmsx/redux/sagas/dashboard'
const ImportReceipt = () =>
  // { fromDate, toDate }
  {
    const { t } = useTranslation(['wmsx'])
    const [warehouseId, setWarehouseId] = useState('')
    const [total, setTotal] = useState({})
    // const { data: purchasedOrderImports, actions } =
    //   useDashboardPurchasedOrderImports()

    const mockData = [
      {
        status: WAREHOUSE_IMPORT_RECEIPT_STATUS.PENDING,
        total: 4,
      },
      {
        status: WAREHOUSE_IMPORT_RECEIPT_STATUS.CONFIRMED,
        total: 16,
      },
      {
        status: WAREHOUSE_IMPORT_RECEIPT_STATUS.REJECTED,
        total: 24,
      },
      {
        status: WAREHOUSE_IMPORT_RECEIPT_STATUS.COMPLETED,
        total: 32,
      },
    ]

    const calculateTotal = () => {
      let totalUnprocessed = 0
      let totalRejectOrCancel = 0
      let totalReceived = 0
      let total = 0

      mockData.forEach((item) => {
        total += item.total
        switch (item?.status) {
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.PENDING:
          case WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED:
            totalUnprocessed += item?.total
            break
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
      })
    }

    useEffect(() => {
      calculateTotal()
    }, [])

    // useEffect(() => {
    //   if (!isEmpty(warehouseId)) {
    //     actions.getPurchasedOrderImports({
    //       warehouseId: warehouseId?.id,
    //       from: fromDate?.toISOString(),
    //       to: toDate?.toISOString(),
    //     })
    //   } else {
    //     actions.getPurchasedOrderImports({
    //       from: fromDate?.toISOString(),
    //       to: toDate?.toISOString(),
    //     })
    //   }
    // }, [warehouseId, fromDate, toDate])

    // useEffect(() => {
    //   actions.getPurchasedOrderImports({
    //     from: fromDate?.toISOString(),
    //     to: toDate?.toISOString(),
    //   })
    // }, [])

    const handleChangeWarehouse = (value) => {
      if (!isEmpty(value)) {
        setWarehouseId(value)
      } else {
        setWarehouseId('')
      }
    }

    const IMPORT_RECEIPT_COLORS = ['#CA498C', '#E6BFCE', '#FDE3DF']

    const data = [
      {
        type: t('dashboard.importReceipt.unprocessed'),
        value: total?.totalUnprocessed,
      },
      {
        type: t('dashboard.importReceipt.received'),
        value: total?.totalReceived,
      },
      {
        type: t('dashboard.importReceipt.rejectOrCancel'),
        value: total?.totalRejectOrCancel,
      },
    ]

    const config = {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      color: IMPORT_RECEIPT_COLORS,
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
    //     headerName: t('dashboard.importReceipt.total'),
    //     align: 'right',
    //     headerAlign: 'left',
    //   },
    //   {
    //     field: 'totalReceived',
    //     headerName: t('dashboard.importReceipt.import'),
    //     align: 'right',
    //     headerAlign: 'left',
    //   },
    //   {
    //     field: 'totalStoring',
    //     headerName: t('dashboard.importReceipt.inStock'),
    //     align: 'right',
    //     headerAlign: 'left',
    //   },
    //   {
    //     field: 'totalCompleted',
    //     headerName: t('dashboard.importReceipt.finishStock'),
    //     align: 'right',
    //     headerAlign: 'left',
    //   },
    //   {
    //     field: 'totalEbs',
    //     headerName: t('dashboard.importReceipt.ebsImport'),
    //     align: 'right',
    //     headerAlign: 'left',
    //   },
    // ]
    return (
      <Card sx={{ p: 1, height: '100%' }}>
        <Typography variant="h2" sx={{ mb: 1.5 }}>
          {t('dashboard.importReceipt.title')}
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
        rows={isEmpty(purchasedOrderImports) ? [] : [purchasedOrderImports]}
        columns={columns}
      /> */}
      </Card>
    )
  }

export default ImportReceipt
