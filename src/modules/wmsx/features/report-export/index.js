import React, { useEffect, useMemo, useState } from 'react'

import { Grid } from '@mui/material'
import { startOfMonth, sub } from 'date-fns'
import { Form, Formik } from 'formik'
import { first, map } from 'lodash'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextLink from '~/components/TextLink'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { api } from '~/services/api'
import {
  convertSortParams,
  convertUtcDateTimeToLocalTz,
  convertUtcDateToLocalTz,
} from '~/utils'
import { downloadFileFromUrl, downloadInt8Arr } from '~/utils/file'
import addNotification from '~/utils/toast'

import {
  CODE_REPORT,
  REPORT_FILE_TYPE_OPTIONS,
  REPORT_STATUS_OPTIONS,
  REPORT_TYPE,
  REPORT_TYPE_OPTIONS,
} from '../../constants'
import useReportExport from '../../redux/hooks/useReportExport'
import { formSchema } from './schema'

const breadcrumbs = [
  {
    route: ROUTE.REPORT_EXPORT.PATH,
    title: ROUTE.REPORT_EXPORT.TITLE,
  },
]

const ReportExport = () => {
  const { t } = useTranslation(['wmsx'])
  const {
    data: { userInfo },
  } = useUserInfo()
  const userWarehouse = userInfo?.username === 'admin' ? null : '1'
  const { filters, setFilters, page, pageSize, setPage, setPageSize } =
    useQueryState({
      filters: {},
    })
  const [isLoading, setIsLoading] = useState(false)
  const [exportType, setExportType] = useState(filters?.type)
  const [showModal, setShowModal] = useState(false)

  const initialValues = useMemo(
    () => ({
      types: [filters?.type] || null,
      warehouse: null,
      item: null,
      syncTime: new Date(),
      time: [startOfMonth(new Date()), new Date()],
      exportFileType: REPORT_FILE_TYPE_OPTIONS.excel,
      inventoryCalendar: [],
      timeMonth: [new Date(), new Date()],
    }),
    [filters],
  )
  const {
    data: { listReport, total },
    actions,
  } = useReportExport()

  const FORMAT_TIME = {
    DATE: 'DATE',
    DATE_RANGE: 'DATE_RANGE',
    DATE_MONTH: 'DATE_MONTH',
  }

  const checkFormatTime = (type) => {
    switch (type) {
      case CODE_REPORT.W01:
      case CODE_REPORT.W02:
      case CODE_REPORT.W03:
      case CODE_REPORT.W04:
      case CODE_REPORT.W08:
      case CODE_REPORT.W09:
      case CODE_REPORT.W10:
      case CODE_REPORT.W11:
      case CODE_REPORT.W12:
        return FORMAT_TIME.DATE_RANGE
      case CODE_REPORT.W05:
      case CODE_REPORT.W06:
      case CODE_REPORT.W07:
        return FORMAT_TIME.DATE
      default:
        break
    }
  }

  const getApiByType = (type) => {
    return `/v1/export${type ? '/' : ''}${type?.toLowerCase()}`
  }

  const onSubmit = async (values) => {
    const isToday =
      convertUtcDateToLocalTz(values?.syncTime) ===
      convertUtcDateToLocalTz(new Date())
    setIsLoading(true)
    const fromTime = moment(values?.time?.[0]).startOf('day').toISOString()
    const toTime = moment(values?.time?.[1]).endOf('day').toISOString()
    switch (values?.type) {
      case CODE_REPORT.W01: //w01
        const convertValues = {
          timeQueryFrom: fromTime !== null ? fromTime : toTime,
          timeQueryTo: toTime !== null ? toTime : fromTime,

          warehouseIds: map(values?.warehouseIds, 'id'),
          warehouseAddressIds: map(values?.warehouseAddressIds, 'id'),
          vendorIds: map(values?.vendorIds, 'id'),
          ticketTypes: map(values?.ticketTypes, 'code'),

          exportFileType: values?.exportFileType?.code,

          userWarehouse,
        }
        setFilters({
          type: values?.type || null,
        })
        const res = await api.post(getApiByType(values?.type), convertValues)

        setIsLoading(false)
        const { message, statusCode } = res
        if (statusCode === 201) {
          setShowModal(true)
        } else {
          addNotification(message, NOTIFICATION_TYPE.ERROR)
        }
        break
      case CODE_REPORT.W02: //w02
        {
          const convertValues = {
            timeQueryFrom: fromTime !== null ? fromTime : toTime,
            timeQueryTo: toTime !== null ? toTime : fromTime,

            warehouseIds: map(values?.warehouseIds, 'id'),
            warehouseAddressIds: map(values?.warehouseAddressIds, 'id'),
            vendorIds: map(values?.vendorIds, 'id'),
            ticketTypes: map(values?.ticketTypes, 'code'),
            itemIds: map(values?.itemIds, 'id'),

            exportFileType: values?.exportFileType?.code,

            userWarehouse,
          }
          setFilters({
            type: values?.type,
          })
          const res = await api.post(getApiByType(values?.type), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201) {
            setShowModal(true)
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
      case CODE_REPORT.W03: //w03
        {
          const convertValues = {
            timeQueryFrom: fromTime !== null ? fromTime : toTime,
            timeQueryTo: toTime !== null ? toTime : fromTime,

            warehouseIds: map(values?.warehouseIds, 'id'),
            warehouseAddressIds: map(values?.warehouseAddressIds, 'id'),
            vendorIds: map(values?.vendorIds, 'id'),
            itemIds: map(values?.itemIds, 'id'),

            exportFileType: values?.exportFileType?.code,

            userWarehouse,
          }
          setFilters({
            type: values?.type,
          })
          const res = await api.post(getApiByType(values?.type), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201) {
            setShowModal(true)
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
      case CODE_REPORT.W04: //w04
        {
          const convertValues = {
            timeQueryFrom: fromTime !== null ? fromTime : toTime,
            timeQueryTo: toTime !== null ? toTime : fromTime,

            warehouseIds: map(values?.warehouseIds, 'id'),
            warehouseAddressIds: map(values?.warehouseAddressIds, 'id'),
            ticketTypes: map(values?.ticketTypes, 'code'),
            itemIds: map(values?.itemIds, 'id'),

            exportFileType: values?.exportFileType?.code,

            userWarehouse,
          }
          setFilters({
            type: values?.type,
          })
          const res = await api.post(getApiByType(values?.type), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201) {
            setShowModal(true)
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
      case CODE_REPORT.W05: //w05
        {
          const timeQueryTo = isToday ? new Date() : values?.syncTime
          const convertValues = {
            timeQueryTo: timeQueryTo
              ? moment(timeQueryTo).add(1, 'day').startOf('day').toISOString()
              : null,

            warehouseIds: map(values?.warehouseIds, 'id'),
            itemIds: map(values?.itemIds, 'id'),
            locatorStatus: values?.locatorStatus?.id,

            exportFileType: values?.exportFileType?.code,

            userWarehouse,
          }
          setFilters({
            type: values?.type,
          })
          const res = await api.post(getApiByType(values?.type), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201) {
            setShowModal(true)
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
      case CODE_REPORT.W06: //w06
        {
          const timeQueryTo = isToday ? new Date() : values?.syncTime
          const convertValues = {
            timeQueryTo: timeQueryTo
              ? moment(timeQueryTo).add(1, 'day').startOf('day').toISOString()
              : null,

            warehouseIds: map(values?.warehouseIds, 'id'),
            itemIds: map(values?.itemIds, 'id'),
            remainingUsageDay:
              Number(values?.daysUntilExpiryFrom) &&
              Number(values?.daysUntilExpiryTo)
                ? `${Number(values?.daysUntilExpiryFrom)}|${Number(
                    values?.daysUntilExpiryTo,
                  )}`
                : null,

            exportFileType: values?.exportFileType?.code,

            userWarehouse,
          }
          setFilters({
            type: values?.type,
          })
          const res = await api.post(getApiByType(values?.type), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201) {
            setShowModal(true)
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
      case CODE_REPORT.W07: //w07
        {
          const timeQueryTo = isToday ? new Date() : values?.syncTime
          const convertValues = {
            timeQueryTo: timeQueryTo
              ? moment(timeQueryTo).add(1, 'day').startOf('day').toISOString()
              : null,

            warehouseIds: map(values?.warehouseIds, 'id'),
            itemGroupIds: map(values?.itemGroupIds, 'id'),
            itemIds: map(values?.itemIds, 'id'),

            exportFileType: values?.exportFileType?.code,

            userWarehouse,
          }
          setFilters({
            type: values?.type,
          })
          const res = await api.post(getApiByType(values?.type), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201) {
            setShowModal(true)
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
      case CODE_REPORT.W08: //w08
        {
          const convertValues = {
            timeQueryFrom: fromTime !== null ? fromTime : toTime,
            timeQueryTo: toTime !== null ? toTime : fromTime,

            warehouseIds: map(values?.warehouseIds, 'id'),
            locatorIds: map(values?.locatorIds, 'id'),
            itemGroupIds: map(values?.itemGroupIds, 'id'),
            itemIds: map(values?.itemIds, 'id'),

            exportFileType: values?.exportFileType?.code,

            userWarehouse,
          }
          setFilters({
            type: values?.type,
          })
          const res = await api.post(getApiByType(values?.type), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201) {
            setShowModal(true)
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
      case CODE_REPORT.W09: //w09
        {
          const convertValues = {
            timeQueryFrom: fromTime !== null ? fromTime : toTime,
            timeQueryTo: toTime !== null ? toTime : fromTime,

            warehouseIds: map(values?.warehouseIds, 'id'),
            locatorIds: map(values?.locatorIds, 'id'),
            movementTypes: values?.movementTypes,
            itemIds: map(values?.itemIds, 'id'),

            exportFileType: values?.exportFileType?.code,

            userWarehouse,
          }
          setFilters({
            type: values?.type,
          })
          const res = await api.post(getApiByType(values?.type), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201) {
            setShowModal(true)
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
      case CODE_REPORT.W10: //w10
        {
          const convertValues = {
            timeQueryFrom: fromTime !== null ? fromTime : toTime,
            timeQueryTo: toTime !== null ? toTime : fromTime,

            warehouseIds: map(values?.warehouseIds, 'id'),
            inventoryTypes: values?.inventoryTypes,
            inventoryForms: values?.inventoryForms,
            itemGroupIds: map(values?.itemGroupIds, 'id'),
            itemIds: map(values?.itemIds, 'id'),

            exportFileType: values?.exportFileType?.code,

            userWarehouse,
          }
          setFilters({
            type: values?.type,
          })
          const res = await api.post(getApiByType(values?.type), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201) {
            setShowModal(true)
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
      case CODE_REPORT.W11: //w11
        {
          const convertValues = {
            timeQueryFrom: fromTime !== null ? fromTime : toTime,
            timeQueryTo: toTime !== null ? toTime : fromTime,
            fromLocatorIds: map(values?.fromLocatorIds, 'id'),
            toLocatorIds: map(values?.toLocatorIds, 'id'),
            itemIds: map(values?.itemIds, 'id'),
            exportFileType: values?.exportFileType?.code,
            hasErrorCount: values?.hasErrorCount,
          }
          setFilters({
            type: values?.type,
          })
          const res = await api.post(getApiByType(values?.type), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201) {
            setShowModal(true)
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
      case CODE_REPORT.W12: //w12
        {
          const convertValues = {
            timeQueryFrom: fromTime !== null ? fromTime : toTime,
            timeQueryTo: toTime !== null ? toTime : fromTime,

            warehouseIds: map(values?.warehouseIds, 'id'),
            inventoryTypes: values?.inventoryTypes,
            inventoryForms: values?.inventoryForms,
            itemGroupIds: map(values?.itemGroupIds, 'id'),
            itemIds: map(values?.itemIds, 'id'),
            exportFileType: values?.exportFileType?.code,
            hasErrorCount: values?.hasErrorCount,
          }
          setFilters({
            type: values?.type,
          })
          const res = await api.post(getApiByType(values?.type), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201) {
            setShowModal(true)
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
      default:
        {
          const convertValues = {
            type: values?.type,
          }
          const res = await api.post(getApiByType(''), convertValues)

          setIsLoading(false)
          const { message, statusCode } = res

          if (statusCode === 201 || statusCode === 200) {
            addNotification(message, NOTIFICATION_TYPE.SUCCESS)
            const rawArr = res.data.data
            const currentExport = REPORT_TYPE_OPTIONS?.find(item=>item.id === values?.type)
             await downloadInt8Arr(
                    rawArr,
                    t(currentExport?.text),
                  )
          } else {
            addNotification(message, NOTIFICATION_TYPE.ERROR)
          }
        }
        break
    }
  }

  const columns = [
    {
      field: '#',
      headerName: t('reportExport.no'),
      width: 20,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'name',
      headerName: t('reportExport.name'),
      width: 200,
      fixed: true,
      renderCell: (params) => {
        const { name } = params.row
        return name
      },
    },
    {
      field: 'resourceCode',
      headerName: t('reportExport.exportedBy'),
      width: 200,
      fixed: true,
      renderCell: (params) => {
        return params.row?.exportedBy?.fullName
      },
    },
    {
      field: 'createdAt',
      headerName: t('reportExport.exportedDate'),
      width: 150,
      renderCell: (params) => {
        const { createdAt } = params.row
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'status',
      headerName: t('reportExport.status'),
      width: 150,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={REPORT_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'link',
      headerName: t('reportExport.link'),
      width: 150,
      fixed: true,
      renderCell: (params) => {
        return params?.row?.status === 'completed' ? (
          <TextLink
            onClick={() =>
              downloadFileFromUrl(
                `${process.env.REACT_APP_HOST}/api/v1/files/${params?.row?.fileId}`,
                params?.row?.name,
              )
            }
          >
            Link
          </TextLink>
        ) : (
          ''
        )
      },
    },
  ]
  const reportUnderground = [
    CODE_REPORT.W01,
    CODE_REPORT.W02,
    CODE_REPORT.W03,
    CODE_REPORT.W04,
    CODE_REPORT.W05,
    CODE_REPORT.W06,
    CODE_REPORT.W07,
    CODE_REPORT.W08,
    CODE_REPORT.W09,
    CODE_REPORT.W10,
    CODE_REPORT.W12,
  ]
  useEffect(() => {
    if (reportUnderground.includes(exportType)) {
      actions.listReport({
        page,
        limit: pageSize,
        sort: convertSortParams({
          orderBy: 'createdAt',
          order: 'DESC',
        }),
        types: exportType,
      })
    }
  }, [pageSize, page, exportType])
  const handleChangeReportType = (val, setFieldValue) => {
    setExportType(val)
    setFieldValue(
      'exportFileType',
      val?.fileTypeOptions?.length === 1
        ? first(val?.fileTypeOptions)
        : REPORT_FILE_TYPE_OPTIONS.excel,
    )
    setFieldValue('inventoryCalendar', [])
    setFieldValue('costCenter', null)
    setFieldValue('itemType', null)
    setFieldValue('warehouse', null)
    setPage(1)
    setFilters({})
    if (val === REPORT_TYPE.REPORT_POST_INVENTORY) {
      setFieldValue('time', [sub(new Date(), { months: 6 }), new Date()])
    }
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.reportExport')}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema(t, checkFormatTime, FORMAT_TIME)}
        onSubmit={onSubmit}
        // enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => {
          return (
            <Form>
              <Grid container justifyContent="center" sx={{ mb: 2 }}>
                <Grid item xl={6} xs={12}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xl: 4, xs: 4 }}
                  >
                    <Grid item lg={12} xs={12}>
                      <Field.Autocomplete
                        name="type"
                        label={t('reportExport.type')}
                        placeholder={t('reportExport.type')}
                        options={REPORT_TYPE_OPTIONS}
                        getOptionLabel={(opt) =>
                          `${opt?.code} - ${t(opt?.text)}`
                        }
                        getOptionValue={(opt) => opt?.id}
                        onChange={(val) =>
                          handleChangeReportType(val, setFieldValue)
                        }
                        required
                      />
                    </Grid>
                    {checkFormatTime(values?.type) === FORMAT_TIME.DATE && (
                      <Grid item lg={12} xs={12}>
                        <Field.DatePicker
                          name="syncTime"
                          label={t('reportExport.time')}
                          placeholder={t('reportExport.time')}
                          maxDate={new Date()}
                          required
                        />
                      </Grid>
                    )}
                    {checkFormatTime(values?.type) ===
                      FORMAT_TIME.DATE_RANGE && (
                      <Grid item lg={12} xs={12}>
                        <Field.DateRangePicker
                          name="time"
                          label={t('reportExport.time')}
                          maxDate={new Date()}
                          required
                          onChange={() => {
                            if (
                              values?.type === REPORT_TYPE.REPORT_POST_INVENTORY
                            ) {
                              setFieldValue('inventoryCalendar', [])
                            }
                          }}
                        />
                      </Grid>
                    )}
                    <Grid item lg={12} xs={12}>
                      <Field.Autocomplete
                        name="exportFileType"
                        label={t('reportExport.fileFormat')}
                        placeholder={t('reportExport.fileFormat')}
                        options={[REPORT_FILE_TYPE_OPTIONS.excel]}
                        getOptionLabel={(opt) => t(opt?.text)}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {reportUnderground.includes(values?.type) && (
                <DataTable
                  uniqKey=""
                  title={t('reportExport.title')}
                  columns={columns}
                  rows={listReport}
                  pageSize={pageSize}
                  page={page}
                  onPageChange={setPage}
                  onPageSizeChange={setPageSize}
                  total={total}
                />
              )}
              <ActionBar
                onCancel={handleReset}
                elAfter={() => (
                  <Button type="submit" icon="save">
                    {t('reportExport.export')}
                  </Button>
                )}
              />
            </Form>
          )
        }}
      </Formik>
      <Dialog
        open={showModal}
        title={t('reportExport.notification')}
        onSubmit={() => {
          setShowModal(false)
          actions.listReport({
            page,
            limit: pageSize,
            sort: convertSortParams({
              orderBy: 'createdAt',
              order: 'DESC',
            }),
            types: exportType,
          })
        }}
        submitLabel={t('general:common.close')}
        noBorderBottom
      >
        {t('reportExport.notificationContent')}
      </Dialog>
    </Page>
  )
}

export default ReportExport
