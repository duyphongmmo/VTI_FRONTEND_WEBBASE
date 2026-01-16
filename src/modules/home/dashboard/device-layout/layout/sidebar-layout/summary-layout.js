import React, { useMemo } from 'react'

import { Pie } from '@ant-design/plots'
import { Box, Typography } from '@mui/material'
import { groupBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import TruncateMarkup from 'react-truncate-markup'

import useDeviceDashboard from '~/modules/configuration/redux/hooks/useDeviceDashboard'


const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0

  return `${(ratio * 100).toFixed(0)}%`
}

const SummaryLayoutChart = () => {
  const { t } = useTranslation(['home'])
  const {
    data: { colorAvailable, deviceLayoutStatuses },
  } = useDeviceDashboard()

  const statusList = Array.from(deviceLayoutStatuses.values())

  const allDeviceStatuses = useMemo(() => {
    return groupBy(statusList, 'colorId')
  }, [statusList])

  const data = useMemo(() => {
    const total = statusList?.length || 0

    const listData = [
      {
        type: t('dashboard.all'),
        value: total,
        ratio: getPercent(total, total),
        color: '#0761AD',
      },
    ]

    if (total === 0) {
      return [
        {
          type: t('dashboard.all'),
          value: 0,
          ratio: getPercent(0, total),
          color: '#0761AD',
        },
      ]
    }
    colorAvailable?.forEach((item) => {
      if (!allDeviceStatuses?.[item?.id]) {
        listData.push({
          type: item?.status,
          value: 0,
          ratio: getPercent(0, total),
          color: item?.color,
        })

        return
      }
      const count = allDeviceStatuses?.[item?.id]?.length || 0

      listData.push({
        type: item?.status,
        value: count,
        ratio: getPercent(count, total),
        color: item?.color,
      })
    })
    return listData
  }, [colorAvailable, allDeviceStatuses])

  const colors = useMemo(() => {
    if (data.length === 1) return data[0]?.color || []
    return [...data.slice(1)].map((item) => {
      return item.color
    })
  }, [data])

  const config = {
    appendPadding: 10,
    data: data.length === 1 ? data : [...data.slice(1)],
    angleField: 'value',
    colorField: 'type',

    radius: 0.8,
    innerRadius: 0.7,
    label: false,
    legend: false,
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: data[0]?.value?.toString() || 0,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    color: colors,
    tooltip: {
      showMarkers: false,
    },
  }
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        // alignItems: 'center',
      }}
    >
      <Box
        sx={(theme) => ({
          width: '50%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          [theme.breakpoints.down('xl')]: {
            width: '50%',
            height: 220,
          },
        })}
      >
        <Pie {...config} />
      </Box>
      <Box
        sx={(theme) => ({
          width: '100%',
          height: '100%',
          overflow: 'auto',
          [theme.breakpoints.down('xl')]: {
            width: '100%',
            alignItems: 'flex-start',
          },
          display: 'flex',
          flex: 1,
          alignItems: 'center',
        })}
      >
        <Box
          sx={{
            width: '100%',
          }}
        >
          {data.map((item, index) => {
            return (
              <Box
                key={index}
                sx={(theme) => ({
                  display: 'flex',
                  flexWrap: 'nowrap',
                  width: '100%',
                  borderTop: '1px solid #ddd',
                  [theme.breakpoints.down('xl')]: {
                    height: 30,
                  },
                })}
              >
                <Box
                  sx={() => ({
                    backgroundColor: item.color,
                    width: '50%',
                    padding: '0.5rem 0',
                    borderRight: '1px solid #ddd',
                  })}
                >
                  <TruncateMarkup lines={1} ellipsis={() => '...'}>
                    <Typography
                      sx={(theme) => ({
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        pl: '0.5rem',
                        color: '#000',
                        textAlign: 'center',
                        [theme.breakpoints.down('xl')]: {
                          fontSize: '0.7rem',
                        },
                      })}
                    >
                      {item.type}
                    </Typography>
                  </TruncateMarkup>
                </Box>

                <Box
                  sx={{
                    width: '25%',
                    padding: '0.5rem 0',
                    borderRight: '1px solid #ddd',
                    textAlign: 'right',
                  }}
                >
                  <TruncateMarkup lines={1} ellipsis={() => '...'}>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        pr: '0.5rem',
                      }}
                    >
                      {item.value?.toString()}
                    </Typography>
                  </TruncateMarkup>
                </Box>
                <Box
                  sx={{
                    width: '25%',
                    padding: '0.5rem 0',
                    textAlign: 'right',
                  }}
                >
                  <TruncateMarkup lines={1} ellipsis={() => '...'}>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        pr: '0.5rem',
                      }}
                    >
                      {item.ratio?.toString()}
                    </Typography>
                  </TruncateMarkup>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default SummaryLayoutChart
