import React, { useEffect, useState } from 'react'

import { Column } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import DateGroupToggle from '~/components/DateGroupToggle'
import NumberFormatText from '~/components/NumberFormat'
import { useDashboardItemStockHistory } from '~/modules/wmsx/redux/hooks/useDashboard'
import {
  getDashboardItems,
  getDashboardWarehouses,
} from '~/modules/wmsx/redux/sagas/dashboard'

const InventoryQuantity = ({ fromDate, toDate, groupOptions }) => {
  const { t } = useTranslation(['wmsx'])
  const [warehouseCode, setWarehouseCode] = useState(null)
  const [groupBy, setGroupBy] = useState(0)

  const [itemCode, setItemCode] = useState(null)

  const { data: itemStockHistories, actions } = useDashboardItemStockHistory()
  useEffect(() => {
    if (fromDate) {
      actions.getItemStockHistories({
        reportType: groupBy,
        from: fromDate?.toISOString()?.substring(0, 10),
        to: toDate
          ? toDate?.toISOString()?.substring(0, 10)
          : fromDate?.toISOString()?.substring(0, 10),
        itemId: itemCode?.id,
        warehouseId: warehouseCode?.id,
      })
    }
  }, [itemCode, warehouseCode, fromDate, toDate, groupBy])

  const handleChangeWarehouse = (value) => {
    setWarehouseCode(value)
  }

  const handleChangeItem = (value) => {
    setItemCode(value)
  }
  const data = (itemStockHistories || [])?.map((item, index) => ({
    index: index + 1,
    time: item?.rangeDate,
    value: item?.stock?.quantity || 0,
    type: t('dashboard.inventoryQuantity.quantity'),
    name: t('dashboard.inventoryQuantity.value'),
  }))

  const config = {
    data: data,
    // isGroup: true,
    xField: 'time',
    yField: 'value',
    seriesField: 'type',
    color: ['#FF9054'],
    label: {
      position: 'top',
      labelLine: false,
      style: {
        fill: '#FF9054',
        opacity: 0,
        fontSize: 0,
      },
      layout: [
        {
          type: 'interval-adjust-position',
        },
        // {
        //   type: 'interval-hide-overlap',
        // },
        // {
        //   type: 'adjust-color',
        // },
      ],
    },
    legend: {
      position: 'bottom',
    },
    ...(groupBy === 0 && {
      slider: {
        height: 30,
        handlerStyle: {
          stroke: '#8884d8',
          width: 4,
          fill: '#8884d8',
          highLightFill: '#8884d8',
          maginTop: '40px',
        },
        formatter: (_, value) => {
          return value?.index
        },
        trendCfg: {
          data: [],
        },
      },
    }),
    tooltip: {
      customContent: (title, data) => {
        return (
          <>
            <div style={{ fontSize: '15px', padding: '10px 10px 0 10px' }}>
              {title}
            </div>
            <div>
              {data?.map((e) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderRadius: '3px',
                    height: 'auto',
                    lineHeight: 'auto',
                    width: 'auto',
                    fontSize: '15px',
                    padding: '10px',
                  }}
                >
                  <div>{e?.name}: </div>
                  <NumberFormatText value={e?.value} />
                </div>
              ))}
            </div>
          </>
        )
      },
    },
  }
  return (
    <Card sx={{ p: 1, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h2">
          {t('dashboard.inventoryQuantity.title')}
        </Typography>
        <Box>
          <DateGroupToggle
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            options={groupOptions}
          />
        </Box>
      </Box>
      <Box
        sx={{
          mb: 2,
          width: '50%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Autocomplete
          sx={{ width: '45%' }}
          name="warehouseId"
          placeholder={t('dashboard.allWarehouse')}
          asyncRequest={(s) =>
            getDashboardWarehouses({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              isSort: 1,
              sort: JSON.stringify([{ column: 'status', order: 'DESC' }]),
            })
          }
          value={warehouseCode}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => `${opt?.code} - ${t(opt?.name)}`}
          onChange={(val) => handleChangeWarehouse(val)}
        />
        <Autocomplete
          sx={{ width: '45%' }}
          name="itemId"
          placeholder={t('dashboard.allItem')}
          asyncRequest={(s) =>
            getDashboardItems({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          value={itemCode}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => `${opt?.code} - ${t(opt?.name)}`}
          onChange={(val) => handleChangeItem(val)}
        />
      </Box>
      <Box sx={{ height: 360 }}>
        <Column {...config} />
      </Box>
    </Card>
  )
}

export default InventoryQuantity
