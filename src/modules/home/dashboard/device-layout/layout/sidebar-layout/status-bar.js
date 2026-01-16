import React, { useMemo } from 'react'

import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import useDeviceDashboard from '~/modules/mmsx/redux/hooks/useDeviceDashboard'

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0

  return `(${(ratio * 100).toFixed(0)}%)`
}

const StatusPanel = ({ title, color, value, ratio }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mx: 2,
        mb: 1,
        overflow: 'hidden',
        maxWidth: '50%',
      }}
    >
      <Typography
        variant="body"
        sx={{
          fontWeight: 'bold',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          mx: 1,
          minHeight: '30px',
          minWidth: '30px',
          backgroundColor: color,
          overflow: 'hidden',
        }}
      />
      <Box sx={{}}>
        <Typography
          variant="body"
          sx={{
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {value}
        </Typography>
        <Typography
          variant="body"
          sx={{
            ml: 0.5,
            fontWeight: 'bold',
            color: 'subText.main',
          }}
        >
          {ratio}
        </Typography>
      </Box>
    </Box>
  )
}

const StatusLayoutBar = () => {
  const { t } = useTranslation(['home'])

  const {
    data: { layoutDashboard },
  } = useDeviceDashboard()

  const data = useMemo(() => {
    const response = layoutDashboard?.statusStatisticResponse?.[0]?.statusCount

    const total =
      layoutDashboard?.statusStatisticResponse?.[0]?.totalDevice || 0

    const listData = [
      {
        type: t('dashboard.all'),
        value: total,
        ratio: getPercent(total, total),
        color: '#0761AD',
      },
    ]

    response?.forEach((item) => {
      listData.push({
        ...item,
        type: item?.color?.status,
        value: item?.count,
        color: item?.color?.color,
        ratio: getPercent(item?.count, total),
      })
    })
    return listData
  }, [layoutDashboard])

  return (
    <Card
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flexWrap: 'wrap',
        p: 1,
      }}
    >
      {data?.map((item) => (
        <StatusPanel
          title={item?.type}
          color={item?.color}
          value={item?.value}
          ratio={item?.ratio}
        />
      ))}
    </Card>
  )
}

export default StatusLayoutBar
