import React, { useMemo } from 'react'

import { Bar } from '@ant-design/plots'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const DeviceStatusFilterChart = ({
  title = '',
  valueStatus = [],
  total = 0,
  onClick,
}) => {
  const { t } = useTranslation(['home'])

  const data = useMemo(() => {
    const listData = [
      {
        statusTitle: t('dashboard.all'),
        count: Number(total),
        color: '#0761AD',
      },
    ]
    valueStatus.forEach((item) => {
      listData.push({
        ...item,
        statusTitle: item?.color?.status,
        count: Number(item?.count),
        color: item?.color?.color,
      })
    })
    return listData
  }, [valueStatus, total])

  const colors = useMemo(() => {
    return data.map((item) => {
      return item.color
    })
  }, [data])
  const config = {
    data,
    xField: 'count',
    yField: 'statusTitle',
    seriesField: 'statusTitle',
    color: colors,
    legend: false,
    xAxis: {
      label: false,
      grid: null,
    },
    yAxis: {
      label: {
        position: 'right',
        style: {
          fontWeight: 'bold',
          fontSize: 12.5,
        },
        autoEllipsis: true,
      },
      grid: null,
    },
    style: {
      height: 220,
      fontWeight: 600,
    },
    appendPadding: 30,

    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    label: {
      position: 'right',
      style: {
        fontWeight: 'bold',
        fontSize: 15,
      },
      content: (item) => {
        return `${item.count}`
      },
    },
    tooltip: {
      title: (title) => {
        return title ?? ''
      },
      // showMarkers: false,
      formatter: (props) => {
        return {
          name: t('dashboard.quantity'),
          value: props?.count,
        }
      },
    },
    animation: false,
  }
  return (
    <Box
      sx={() => ({
        p: 1,
        // border: '1px solid #BBBBBB',
        cursor: 'pointer',
        width: '100%',
        'box-shadow':
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        height: 270,
      })}
      onClick={onClick}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{ fontSize: 20, fontWeight: 700, lineHeight: 1, mb: 1 }}
        >
          {title}
        </Typography>
      </Box>

      <Bar {...config} />
    </Box>
  )
}

export default DeviceStatusFilterChart
