import { useMemo } from 'react'

import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { isEmpty, isNumber } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, DATA_TYPE } from '~/common/constants'
import { FastField, Field } from '~/components/Formik'
import {
  ATTRIBUTE_FIXED_PARENT,
  CODE_TYPE_TEMPLATE_RECEIPT_EXPORT,
  CODE_TYPE_TEMPLATE_RECEIPT_IMPORT,
  CODE_TYPE_TEMPLATE_TRANSFER,
  WAREHOUSE_IMPORT_RECEIPT_STATUS,
} from '~/modules/wmsx/constants'
import usePaginations from '~/modules/wmsx/redux/hooks/usePaginations'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { api } from '~/services/api'
import { convertUtcDateToLocalTz } from '~/utils'

import DataTable from '../DataTable'
import FileUploadButton from '../FileUploadButton'
import Icon from '../Icon'
import IconButton from '../IconButton'
import LabelValue from '../LabelValue'
import NumberFormatText from '../NumberFormat'
import Status from '../Status'
import Tabs from '../Tabs'
import TextField from '../TextField'
const getFieldHeader = (field, statusOptions, t) => {
  switch (field?.attribute?.dataType) {
    case DATA_TYPE.TEXT:
      if (field?.attribute?.multiline) {
        return (
          <TextField
            name={field?.attribute?.fieldName || ''}
            label={t(`${field?.attribute?.name}`) || ''}
            // multiline
            // rows={3}
            value={field?.attribute?.value || ''}
            readOnly
            sx={{
              'label.MuiFormLabel-root': {
                color: (theme) => theme.palette.subText.main,
              },
            }}
          />
        )
      } else if (field?.attribute?.isUpdate || field?.attribute?.isInput) {
        return (
          <FastField.TextField
            name={field?.attribute?.fieldName || ''}
            label={t(`${field?.attribute?.name}`) || ''}
            placeholder={t(`${field?.attribute.name}`) || ''}
            sx={{
              'label.MuiFormLabel-root': {
                color: (theme) => theme.palette.subText.main,
              },
            }}
            inputProps={
              field?.attributeRule?.inputProps
                ? field?.attributeRule?.inputProps
                : undefined
            }
          />
        )
      } else if (field?.attribute?.isStatus) {
        return (
          <LabelValue
            label={t(`${field?.attribute?.name}`)}
            value={
              <Status options={statusOptions} value={field?.attribute?.value} />
            }
          />
        )
      } else {
        return (
          <LabelValue
            label={t(`${field?.attribute?.name}`) || ''}
            value={field?.attribute?.value || ''}
          />
        )
      }
    case DATA_TYPE.NUMBER:
      return (
        <LabelValue
          label={t(`${field?.attribute?.name}`) || ''}
          value={
            <NumberFormatText value={Number(field?.attribute?.value) || null} />
          }
        />
      )
    case DATA_TYPE.SELECT_BOX_SINGLE:
      if (field?.attribute?.isUpdate) {
        const getListApi = (dataSource, params) => {
          if (!dataSource.uri) return
          const uri = `${dataSource.uri}`
          return api.get(uri, params)
        }
        return (
          <FastField.Autocomplete
            name={field?.attribute?.fieldName || ''}
            label={t(`${field?.attribute?.name}`) || ''}
            placeholder={t(`${field?.attribute.name}`) || ''}
            asyncRequest={(s) => {
              if (typeof field?.attributeRule?.table?.callApi === 'function') {
                const callApi = field?.attributeRule?.table?.callApi
                return callApi({ s })
              } else {
                const params = {
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: field?.attributeRule?.table?.filter,
                }
                return getListApi(field?.attributeRule?.table || '', params)
              }
            }}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.code}
            getOptionSubLabel={(opt) => opt?.name || opt?.fullName}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            autoFetch={false}
          />
        )
      } else {
        return (
          <LabelValue
            label={t(`${field?.attribute?.name}`) || ''}
            value={
              field?.attribute?.getValue ||
              field?.attribute?.value?.fullName ||
              field?.attribute?.value?.name ||
              field?.attribute?.value?.code ||
              ''
            }
          />
        )
      }
    case DATA_TYPE.SELECT_BOX_MULTIPLE:
      return (
        <LabelValue
          label={t(`${field?.attribute?.name}`) || ''}
          value={
            field?.attribute?.getValue
              ? field?.attribute?.getValue
              : field?.attribute?.value
                  ?.map((item) => item?.name || item?.code || item?.fullName)
                  ?.join(', ') || ''
          }
        />
      )
    case DATA_TYPE.DATE:
      return (
        <LabelValue
          label={t(`${field?.attribute?.name}`) || ''}
          value={field?.attribute.value || ''}
        />
      )
    case DATA_TYPE.DATE_TIME:
      if (field?.attributeRule?.isUpdate) {
        return (
          <Field.DateTimePicker
            name={field?.attribute.code || ''}
            label={t(`${field?.attribute.name}`) || ''}
            placeholder={t(`${field?.attribute.name}`) || ''}
            required={field?.attributeRule?.isRequired}
            minDateTime={field?.attributeRule.min || null}
            maxDateTime={field?.attributeRule.max || null}
            views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
            inputFormat={'dd/MM/yyyy HH:mm:ss'}
          />
        )
      }
      return (
        <LabelValue
          label={t(`${field?.attribute?.name}`) || ''}
          value={field?.attribute.value || ''}
        />
      )
    case DATA_TYPE.FILE:
      return (
        <LabelValue
          label={t(`${field?.attribute?.name}`) || ''}
          value={
            <FileUploadButton
              value={field?.attribute.value || []}
              {...(field?.attribute?.onClick
                ? { onClick: field?.attribute.onClick }
                : {})}
              readOnly
            />
          }
        />
      )
    case DATA_TYPE.RADIO_BUTTON:
      return (
        <LabelValue
          label={t(`${t(`${field?.attribute?.name}`)}`) || ''}
          value={
            <RadioGroup
              value={field?.attribute?.value}
              name={field?.attribute?.fieldName}
              sx={{
                flexWrap: 'nowrap',
                gap: '0 16px',
                margin: 0,
              }}
              row
              spacing={2}
            >
              {field?.attributeRule?.children?.map((item) => (
                <FormControlLabel
                  value={item?.id}
                  control={<Radio />}
                  label={item?.text}
                  sx={{ pointerEvents: 'none', mt: '-9px' }}
                />
              ))}
            </RadioGroup>
          }
        />
      )
    case DATA_TYPE.CHECKBOX:
      return (
        <LabelValue
          label={t(`${t(`${field?.attribute?.name}`)}`) || ''}
          value={
            <Checkbox
              sx={{ alignItems: 'start', padding: '0 9px 0 9px' }}
              checked={Boolean(field?.attribute?.value)}
              name={field?.attribute?.fieldName}
              disabled
            />
          }
        />
      )
    default:
  }
}

export const GenerateHeader = ({ headerFields, statusOptions }) => {
  const headerFieldsFilter = (headerFields || [])?.filter((field) =>
    Boolean(field?.attributeRule?.display),
  )
  const { t } = useTranslation(['wmsx'])

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }} ml={4}>
      {headerFieldsFilter?.map((field) => {
        if (field?.attribute?.multiline || field.attribute?.isStatus) {
          return (
            <Grid item xs={12}>
              {getFieldHeader(field, statusOptions, t)}
            </Grid>
          )
        } else {
          return (
            <Grid item lg={6} xs={12}>
              {getFieldHeader(field, statusOptions, t)}
            </Grid>
          )
        }
      })}
    </Grid>
  )
}

const getFieldTable = (field) => {
  switch (field?.attribute?.dataType) {
    case DATA_TYPE.TEXT:
      return field?.attribute?.value?.name || field?.attribute?.value || ''
    case DATA_TYPE.NUMBER:
      return (
        <>
          <NumberFormatText
            value={
              isNumber(field?.attribute?.value)
                ? +field?.attribute?.value
                : null
            }
          />{' '}
          {field?.attribute?.subValue}
        </>
      )
    case DATA_TYPE.SELECT_BOX_SINGLE:
      return (
        field?.attribute?.getValue ||
        field?.attribute?.value?.code ||
        field?.attribute?.value?.fullName ||
        field?.attribute?.value ||
        ''
      )
    case DATA_TYPE.SELECT_BOX_MULTIPLE:
      return (
        field?.attribute?.value?.map((item) => item?.name)?.join(', ') || ''
      )
    case DATA_TYPE.DATE:
      return convertUtcDateToLocalTz(field?.attribute?.value) || ''
    default:
      return (
        field?.attribute?.getValue ||
        field?.attribute?.value?.code ||
        field?.attribute?.value?.fullName ||
        field?.attribute?.value ||
        ''
      )
  }
}
export const GenerateTable = ({
  tableTitle,
  tableFields,
  data,
  action,
  handleClick,
  value,
  hasPagination,
  total,
  valueTable,
  route,
}) => {
  const { t } = useTranslation(['wmsx'])
  const {
    data: { page, pageSize },
    actions: paginationsAction,
  } = usePaginations()
  // const total = totalItem || data?.length || 0
  // const start = total ? pageSize * (page - 1) + 1 : 0
  // const end = total ? Math.min(pageSize * page, total) : 0
  // const rows = data?.slice(start - 1, end)
  // if (isEmpty(rows) && page > 1) {
  //   paginationsAction.setPage(page - 1)
  // }

  const status = value?.attributeHeaders?.find(
    (item) => item?.attribute?.code === ATTRIBUTE_FIXED_PARENT.WMSX_STATUS,
  )?.attribute?.value
  const isWarehouseExport = [
    CODE_TYPE_TEMPLATE_RECEIPT_EXPORT.X01,
    CODE_TYPE_TEMPLATE_RECEIPT_EXPORT.X02,
    CODE_TYPE_TEMPLATE_RECEIPT_EXPORT.X03,
    CODE_TYPE_TEMPLATE_RECEIPT_EXPORT.X04,
    CODE_TYPE_TEMPLATE_RECEIPT_EXPORT.X05,
    CODE_TYPE_TEMPLATE_RECEIPT_EXPORT.X06,
    CODE_TYPE_TEMPLATE_RECEIPT_EXPORT.X07,
    CODE_TYPE_TEMPLATE_RECEIPT_EXPORT.X08,
    CODE_TYPE_TEMPLATE_RECEIPT_EXPORT.X09,
    CODE_TYPE_TEMPLATE_RECEIPT_EXPORT.X10,
  ].includes(value?.templateCode)
  const isWarehouseImport = [
    CODE_TYPE_TEMPLATE_RECEIPT_IMPORT.N01,
    CODE_TYPE_TEMPLATE_RECEIPT_IMPORT.N02,
    CODE_TYPE_TEMPLATE_RECEIPT_IMPORT.N03,
    CODE_TYPE_TEMPLATE_RECEIPT_IMPORT.N04,
    CODE_TYPE_TEMPLATE_RECEIPT_IMPORT.N05,
    CODE_TYPE_TEMPLATE_RECEIPT_IMPORT.N06,
    CODE_TYPE_TEMPLATE_RECEIPT_IMPORT.N07,
    CODE_TYPE_TEMPLATE_RECEIPT_IMPORT.N08,
    CODE_TYPE_TEMPLATE_RECEIPT_IMPORT.N09,
    CODE_TYPE_TEMPLATE_RECEIPT_IMPORT.N10,
  ].includes(value?.templateCode)
  const isWarehouseTransfer = [CODE_TYPE_TEMPLATE_TRANSFER.C01].includes(
    value?.templateCode,
  )
  const columns = useMemo(
    () =>
      (tableFields || [])?.[0]?.attributes
        ?.filter((field) => Boolean(field?.attributeRule?.display))
        ?.map((field) => ({
          field: field?.attribute?.fieldName || '',
          headerName: t(`${field?.attribute?.name}`) || '',
          width: 150,
          headerAlign: 'left',
          align:
            field?.attribute?.dataType === DATA_TYPE.NUMBER
              ? 'right'
              : !isNumber(field?.attribute?.dataType) &&
                !field?.attribute?.dataType
              ? 'center'
              : 'left',
          ...(!isEmpty(data)
            ? {
                renderCell: (params) => {
                  if (field?.attribute?.isDisplayCodeName) {
                    return !isEmpty(params.row[field?.attribute?.fieldName])
                      ? `${params.row[field?.attribute?.fieldName]?.code} - ${
                          params.row[field?.attribute?.fieldName]?.name ||
                          params.row[field?.attribute?.fieldName]?.vName
                        }`
                      : params.row[field?.attribute?.fieldName]?.code ||
                          params.row[field?.attribute?.fieldName]?.name ||
                          null
                  } else if (
                    field?.attribute?.dataType === DATA_TYPE.CHECKBOX
                  ) {
                    return (
                      <Checkbox
                        sx={{ alignItems: 'start', padding: '0 9px 0 9px' }}
                        checked={Boolean(
                          params.row[field?.attribute?.fieldName],
                        )}
                        name={field?.attribute?.fieldName}
                        disabled
                      />
                    )
                  } else {
                    return (
                      params.row[field?.attribute?.fieldName]?.code ||
                      params.row[field?.attribute?.fieldName]?.name ||
                      params.row[field?.attribute?.fieldName] ||
                      ''
                    )
                  }
                },
              }
            : {
                renderCell: (params) =>
                  getFieldTable(
                    params.row?.attributes?.find(
                      (e) => e?.attribute?.code === field?.attribute?.code,
                    ),
                  ),
              }),
        })),
    [value?.id, tableFields?.[0]?.attributes?.length, page, value],
  )

  const footerColumnsFormat = useMemo(() => {
    const attributes = tableFields?.[0]?.attributes ?? []
    return attributes
      .filter((field) => Boolean(field?.attributeRule?.display))
      .map((field) => ({
        field: field?.attribute?.fieldName || '',
        headerName: t(`${field?.attribute?.name}`) || '',
        width: 150,
        headerAlign: 'left',
        align:
          field?.attribute?.dataType === DATA_TYPE.NUMBER
            ? 'right'
            : !isNumber(field?.attribute?.dataType) &&
              !field?.attribute?.dataType
            ? 'center'
            : 'left',
        ...(field?.attribute?.fieldName
          ?.toLocaleLowerCase()
          ?.includes('quantity') &&
        (field?.attributeRule?.display || Number(field?.attributeRule?.display))
          ? {
              renderCell: () => {
                const totalQuantity =
                  route === ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH &&
                  field?.attribute?.fieldName ===
                    ATTRIBUTE_FIXED_PARENT.WMSX_REQUEST_QUANTITY
                    ? null
                    : (valueTable || tableFields)?.reduce((sum, item) => {
                        const quantity = item.attributes.find(
                          (attr) =>
                            attr.attribute.code === field?.attribute?.fieldName,
                        )?.attribute?.value
                        return sum + (+quantity || 0)
                      }, 0)

                return <NumberFormatText value={totalQuantity || null} />
              },
            }
          : {}),
      }))
  }, [tableFields, page])

  const footerColumns = useMemo(
    () => [
      {
        field: 'STT' || '',
        headerName: t('warehouseExportProposal.items.STT') || '',
        width: 50,
        resizable: false,
        renderCell: () => (
          <Typography variant="h5">{t('general.total')}</Typography>
        ),
      },
      ...footerColumnsFormat,
      {
        field: 'action',
        headerName: t(`attribute.action`) || '',
        width: 150,
        hide: !action,
        headerAlign: 'left',
        align: 'center',
      },
    ],
    [footerColumnsFormat],
  )

  // if (action) {
  //   columns.push({
  //     field: 'action',
  //     headerName: t(`attribute.action`) || '',
  //     width: 150,
  //     headerAlign: 'left',
  //     align: 'center',
  //     renderCell: (params, index) => {
  //       if (isWarehouseExport) {
  //         return (
  //           <IconButton onClick={() => handleClick(params?.row, index)}>
  //             <Icon name="qr" />
  //           </IconButton>
  //         )
  //       }
  //       if (isWarehouseImport) {
  //         return status === WAREHOUSE_IMPORT_RECEIPT_STATUS.COMPLETED ? (
  //           <IconButton onClick={() => handleClick(params?.row, index)}>
  //             <Icon name="qr" />
  //           </IconButton>
  //         ) : status === WAREHOUSE_IMPORT_RECEIPT_STATUS.CONFIRMED ? (
  //           <IconButton onClick={() => handleClick(params?.row, index)}>
  //             <Icon name="qr" />
  //           </IconButton>
  //         ) : null
  //       }
  //       if (isWarehouseTransfer) {
  //         return (
  //           <IconButton onClick={() => handleClick(params?.row, index)}>
  //             <Icon name="qr" />
  //           </IconButton>
  //         )
  //       }
  //     },
  //   })
  // }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="h4">{tableTitle}</Typography>
      </Box>
      <DataTable
        rows={data || tableFields || []}
        columns={[
          {
            field: 'STT' || '',
            headerName: t('warehouseExportProposal.items.STT') || '',
            width: 50,
            resizable: false,
            renderCell: (_, index) => (page - 1) * pageSize + index + 1,
          },
          ...(Array.isArray(columns) ? columns : []),
          {
            field: 'action',
            headerName: t(`attribute.action`) || '',
            width: 150,
            hide: !action,
            headerAlign: 'left',
            align: 'center',
            renderCell: (params, index) => {
              if (isWarehouseExport) {
                return (
                  <IconButton onClick={() => handleClick(params?.row, index)}>
                    <Icon name="qr" />
                  </IconButton>
                )
              }
              if (isWarehouseImport) {
                return status === WAREHOUSE_IMPORT_RECEIPT_STATUS.COMPLETED ? (
                  <IconButton onClick={() => handleClick(params?.row, index)}>
                    <Icon name="qr" />
                  </IconButton>
                ) : status === WAREHOUSE_IMPORT_RECEIPT_STATUS.CONFIRMED ? (
                  <IconButton onClick={() => handleClick(params?.row, index)}>
                    <Icon name="qr" />
                  </IconButton>
                ) : null
              }
              if (isWarehouseTransfer) {
                return (
                  <IconButton onClick={() => handleClick(params?.row, index)}>
                    <Icon name="qr" />
                  </IconButton>
                )
              }
            },
          },
        ]}
        total={null}
        striped={false}
        hideSetting
        {...(hasPagination
          ? {
              page,
              pageSize,
              onPageChange: (page) => paginationsAction.setPage(page),
              onPageSizeChange: (pageSize) =>
                paginationsAction.setPageSize(pageSize),
              total,
            }
          : { hideFooter: true })}
        // footerColumns={[footerColumns]}
        // footerColors={[]}
        {...(footerColumnsFormat?.length > 0
          ? {
              footerColumns: [footerColumns],
              footerColors: [],
            }
          : {})}
      />
    </>
  )
}
export const GenerateTabs = ({ tabList, valueTabs, hasPagination, total }) => {
  const item = valueTabs?.[0]
  if (tabList?.length > 1) {
    return (
      <Tabs list={tabList?.length > 1 ? tabList : []}>
        {valueTabs?.map((item) => (
          <>
            <Box sx={{ mt: 2 }}>
              <GenerateTable
                tableFields={item?.tableFields || []}
                tableTitle={item?.tableTitle}
                data={item?.data}
              />
            </Box>
          </>
        ))}
      </Tabs>
    )
  } else {
    return (
      <GenerateTable
        tableFields={item?.tableFields}
        tableTitle={item?.tableTitle}
        data={item?.data}
        value={item?.value}
        valueTable={item?.valueTable}
        action={item.action}
        handleClick={item.handleClick}
        hasPagination={hasPagination}
        total={total}
        route={item.route}
      />
    )
  }
}
const GenerateDetail = ({
  headerFields,
  tableFields,
  tableTitle,
  statusOptions,
}) => {
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <GenerateHeader
            headerFields={headerFields}
            statusOptions={statusOptions}
          />
        </Grid>
      </Grid>
      {!isEmpty(tableFields) && (
        <Box sx={{ mt: 2 }}>
          <GenerateTable tableTitle={tableTitle} tableFields={tableFields} />
        </Box>
      )}
    </>
  )
}

GenerateDetail.defaultProps = {
  headerFields: [],
  tableFields: [],
  tableTitle: '',
  statusOptions: [],
}

GenerateDetail.propTypes = {
  headerFields: PropTypes.array,
  tableFields: PropTypes.array,
  tableTitle: PropTypes.string,
  statusOptions: PropTypes.array,
}

export default GenerateDetail
