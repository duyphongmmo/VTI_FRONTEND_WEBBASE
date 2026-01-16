import React, { useEffect, useState } from 'react'

import { Column } from '@ant-design/plots'
import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import DateGroupToggle from '~/components/DateGroupToggle'
import NumberFormatText from '~/components/NumberFormat'
import { useDashboardMovementReport } from '~/modules/wmsx/redux/hooks/useDashboard'
import {
  getDashboardItems,
  getDashboardWarehouses,
} from '~/modules/wmsx/redux/sagas/dashboard'
const MovementReport = ({ fromDate, toDate, groupOptions }) => {
  const { t } = useTranslation(['wmsx'])

  const { data: movementReport, actions } = useDashboardMovementReport()

  const [groupBy, setGroupBy] = useState(0)
  const [warehouseId, setWarehouseId] = useState(null)
  const [itemId, setItemId] = useState(null)

  const handleChangeWarehouse = (value) => {
    setWarehouseId(value)
  }

  const handleChangeItem = (value) => {
    setItemId(value)
  }

  useEffect(() => {
    if (fromDate) {
      const payload = {
        reportType: groupBy,
        itemId: itemId?.id,
        warehouseId: warehouseId?.id,
        from: fromDate?.toISOString()?.substring(0, 10),
        to: toDate
          ? toDate?.toISOString()?.substring(0, 10)
          : fromDate?.toISOString()?.substring(0, 10),
      }

      actions.getMovementReport(payload)
    }
  }, [groupBy, itemId, warehouseId, fromDate, toDate])

  const formatDataStock = (dataList) => {
    const newData = []
    dataList?.forEach((data, index) => {
      newData.push({
        time: data?.rangeDate,
        type: t('dashboard.movementReport.importQuantity'),
        value: data.importUnit?.quantity || 0,
        index: index + 1,
      })
      newData.push({
        time: data?.rangeDate,
        type: t('dashboard.movementReport.exportQuantity'),
        value: data.exportUnit?.quantity || 0,
        index: index + 1,
      })
    })
    return newData
  }

  const dataStockConvert = formatDataStock(movementReport) || []
  const config = {
    data: dataStockConvert,
    isGroup: true,
    xField: 'time',
    yField: 'value',
    seriesField: 'type',
    // xAxis: {
    //   title: {
    //     text: 'VNĐ',
    //     offset: 14,
    //     position: 'end',
    //   },
    // },

    label: {
      position: 'top',
      labelLine: false,
      style: {
        fill: '#fff',
        opacity: 0,
        fontSize: 0,
      },
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
    legend: {
      position: 'bottom',
    },
    slider: {
      height: 30,
      handlerStyle: {
        stroke: '#8884d8',
        width: 4,
        fill: '#8884d8',
        highLightFill: '#8884d8',
        maginTop: '40px',
      },
      formatter: (value) => {
        const findIndex = dataStockConvert?.find(
          (stock) => stock.time === value,
        )
        return findIndex?.index
      },
      trendCfg: {
        smooth: false,
        isArea: false,
        data: [],
      },
    },
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
          {t('dashboard.movementReport.movementQuantity')}
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
          value={warehouseId}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => `${opt?.code} - ${t(opt?.name)}`}
          onChange={handleChangeWarehouse}
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
          value={itemId}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => `${opt?.code} - ${t(opt?.name)}`}
          onChange={handleChangeItem}
        />
      </Box>
      <Box sx={{ height: 360 }}>
        <Column {...config} />
      </Box>
    </Card>
  )
}

export default MovementReport
