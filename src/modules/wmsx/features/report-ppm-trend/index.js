import React, { useEffect, useMemo, useState } from 'react'

import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  CircularProgress,
  Divider,
} from '@mui/material'
import { sub } from 'date-fns'
import { Form, Formik } from 'formik'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

import { ACTIVE_STATUS, ASYNC_SEARCH_LIMIT, NOTIFICATION_TYPE } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { searchUsersApi } from '~/modules/configuration/redux/sagas/user-management/search-users'

import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams } from '~/utils'
import addNotification from '~/utils/toast'

import PPMTrendChart from '../dashboard/components/chart/ppm-trend-chart'
import ProcessQualityChart from '../dashboard/components/chart/process-quality-chart'
import ReportPPMTrendDetail from './detail'
import { formSchema } from './schema'
import { getPPMTrendData, getPPMTrendDetail } from '../../redux/api'

const breadcrumbs = [
  {
    route: ROUTE.REPORT_PPM_TREND.PATH,
    title: ROUTE.REPORT_PPM_TREND.TITLE,
  },
]

const ReportPPMTrend = () => {
  const { t } = useTranslation(['wmsx'])
  const { filters, setFilters } = useQueryState({
    filters: {},
  })
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState([])
  
  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const [detailData, setDetailData] = useState(null)
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)

  const initialValues = useMemo(
    () => ({
      time: [sub(new Date(), { months: 3 }), new Date()],
    }),
    [],
  )

  /**
   * Fetch PPM trend data from API
   */
  const fetchPPMTrendData = async (values) => {
    setIsLoading(true)
    try {
      const fromTime = moment(values?.time?.[0]).format('YYYY-MM-DD')
      const toTime = moment(values?.time?.[1]).format('YYYY-MM-DD')

      const params = {
        fromDate: fromTime,
        toDate: toTime,
      }

      // Call API to get PPM trend data
      const res = await getPPMTrendData(params)

      setIsLoading(false)
      const { message, statusCode, data } = res

      

      if (statusCode === 200) {
        setChartData(data?.charts || [])
        setFilters({
          periodType: values?.periodType,
          time: values?.time,
        })
      } else {
        addNotification(message, NOTIFICATION_TYPE.ERROR)
        setChartData([])
      }
    } catch (error) {
      setIsLoading(false)
      addNotification(
        error?.message || t('reportPPMTrend.fetchError') || 'Error fetching data',
        NOTIFICATION_TYPE.ERROR,
      )
      setChartData([])
    }
  }

  const onSubmit = async (values) => {
    await fetchPPMTrendData(values)
  }

  /**
   * Handle dot click event - open dialog and fetch detail data
   */
  const handleDotClick = async (data) => {
    setSelectedData(data)
    setDialogOpen(true)
    setIsLoadingDetail(true)
    setDetailData(null)

    try {
      const params = {
        periodType: data.periodType,
        periodKey: data.periodKey,
        date: data.date,
      }

      const res = await getPPMTrendDetail(params)
      setIsLoadingDetail(false)

      const { statusCode, data: responseData, message } = res

      if (statusCode === 200) {
        setDetailData(responseData)
      } else {
        addNotification(message, NOTIFICATION_TYPE.ERROR)
      }
    } catch (error) {
      setIsLoadingDetail(false)
      addNotification(
        error?.message || t('reportPPMTrend.fetchDetailError') || 'Error fetching detail data',
        NOTIFICATION_TYPE.ERROR,
      )
    }
  }

  /**
   * Handle dialog close
   */
  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedData(null)
    setDetailData(null)
  }

  // Load initial data if filters exist
  useEffect(() => {
      fetchPPMTrendData({
        time: filters.time,
      })
  }, [])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.reportPpmTrend') || 'PPM Trend Report'}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset }) => {
          return (
            <Form>
              {/* Filter Section */}
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item lg={3} md={4} xs={12}>
                    <Field.DateRangePicker
                      name="time"
                      label={t('reportPPMTrend.timeRange') || 'Time Range'}
                      maxDate={new Date()}
                      required
                    />
                  </Grid>
                  <Grid item lg={3}>
                  <Field.Autocomplete
                    name="createdBy"
                    placeholder={t('general:common.createdBy')}
                    asyncRequest={(s) =>
                    searchUsersApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                        filter: convertFilterParams({
                        status: ACTIVE_STATUS.ACTIVE,
                        }),
                    })
                    
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.fullName}
                        getOptionSubLabel={(opt) => opt?.username}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Chart Section */}
              
              {chartData && chartData.length > 0 ? (
                <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                {chartData?.map((item, index) => (
                  <Grid item xs={12} lg={6} md={12} sx={{ mb: 1.5 }} key={index}>
                    <PPMTrendChart
                      title={item?.busiName}
                      data={item?.data}
                      onDotClick={handleDotClick}
                    />
                  </Grid>
                ))}
              </Grid>
              <ProcessQualityChart/>
                </Box>
              ) : (
                !isLoading && (
                  <Paper
                    elevation={1}
                    sx={{
                      p: 4,
                      mb: 3,
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      {t('reportPPMTrend.noData')}
                    </Typography>
                  </Paper>
                )
              )}

              {/* Action Bar */}
              <ActionBar
                onCancel={handleReset}
                elAfter={() => (
                  <Button type="submit" icon="search">
                    {t('reportPPMTrend.viewReport')}
                  </Button>
                )}
              />
            </Form>
          )
        }}
      </Formik>

      {/* Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {t('reportPPMTrend.detailTitle') || 'PPM Trend Detail'}
          </Typography>
        </DialogTitle>
        
        <DialogContent dividers>
          {/* Selected Data Info */}
          {selectedData && (
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="text.secondary">
                    {t('reportPPMTrend.periodType')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedData.periodType}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="text.secondary">
                    {t('reportPPMTrend.date') || 'Date'}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedData.date}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="text.secondary">
                    {t('reportPPMTrend.ppm') || 'PPM'}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ fontWeight: 600, color: '#5470C6' }}
                  >
                    {selectedData.ppm?.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />

          {/* Detail Data */}
          {isLoadingDetail ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : detailData ? (
            <ReportPPMTrendDetail detailData={detailData} t={t} />
          ) : (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {t('reportPPMTrend.noDetailData') || 'No detail data available'}
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">
            {t('general:common.close') || 'Close'}
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  )
}

export default ReportPPMTrend
