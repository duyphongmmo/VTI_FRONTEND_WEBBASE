import { useMemo } from 'react'

import { Box, Card, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'


import JobChart from './job-chart'
import PieChart from './pie-chart'

export default function AnalyzeReportChart({ title, enumMap, data }) {
  const { t } = useTranslation(['wmsx'])
  const names = enumMap?.map((item) => t(item?.text))
  const defaultPieChart = enumMap?.map((item, index) => ({
    id: item?.id,
    type: names[index],
    value: 0,
  }))

  const dataPieChart = useMemo(() => {
    if (!data?.length) return defaultPieChart
    const totalAll = data
      .flatMap((obj) => Object.values(obj))
      .filter((item) => typeof item === 'number')
      .reduce((sum, item) => sum + item, 0)

    const totalObj = data.reduce((acc, item) => {
      for (const key in item) {
        // eslint-disable-next-line no-param-reassign
        acc[key] = (acc[key] || 0) + item[key]
      }
      return acc
    }, {})
    return defaultPieChart?.map((item) => {
      return {
        ...item,
        percent: (totalObj[item?.id] / totalAll) * 100,
        value: totalObj[item?.id],
      }
    })
  }, [data])

  const dataBarChart = data.map((item) => {
    return {
      ...item,
      processName: item.text,
    }
  })

  return (
    <Box sx={{ mt: 4 }}>
      <Card
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>
          {t(title)}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <JobChart data={dataBarChart} names={names} enumMap={enumMap} />
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ height: '100%' }}>
              <PieChart data={dataPieChart} itemWidth={100} />
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}
