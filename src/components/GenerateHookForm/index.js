import { memo, useMemo } from 'react'

import { Box, Grid, IconButton, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { findLastIndex, isEmpty, isNumber } from 'lodash'
import { PropTypes } from 'prop-types'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { DATA_TYPE, FIELD_AREA, MODAL_MODE } from '~/common/constants'
import Tabs from '~/components/Tabs'

import ActionBar from '../ActionBar'
import Button from '../Button'
import VirtualizedTable from '../DataTable/VirtualizedTable'
import { WatchWrapper } from '../HookForm'
import HotKeys from '../HotKeys'
import Icon from '../Icon'
import ImportExport from '../ImportExport'
import LabelValue from '../LabelValue'
import Status from '../Status'
import FormAutocomplete from './FormAutocomplete'
import FormCheckBox from './FormCheckBox'
import FormDatePicker from './FormDatePicker'
import FormDateRangePicker from './FormDateRangePicker'
import FormDateTimePicker from './FormDateTimePicker'
import FormFileUploadButton from './FormFileUploadButton'
import FormTextField from './FormTextField'

const getFieldComponent = (field, area, mode, index, params, name) => {
  const props = {
    field: field,
    area: area,
    isUpdate: mode === MODAL_MODE.UPDATE,
    index: index,
    params: params,
    name: name,
  }
  switch (field.attribute.dataType) {
    case DATA_TYPE.TEXT:
      return <FormTextField {...props} />
    case DATA_TYPE.NUMBER:
      return <FormTextField {...props} isNumber={true} />
    case DATA_TYPE.DATE:
      return <FormDatePicker {...props} />
    case DATA_TYPE.DATE_TIME:
      return <FormDateTimePicker {...props} />
    case DATA_TYPE.SELECT_BOX_MULTIPLE:
    case DATA_TYPE.SELECT_BOX_SINGLE:
      return <FormAutocomplete {...props} />
    case DATA_TYPE.DATE_RANGE_PICKER:
      return <FormDateRangePicker {...props} />
    case DATA_TYPE.FILE:
      return <FormFileUploadButton {...props} />
    // case DATA_TYPE.RADIO_BUTTON:
    //   return <FormRadioButton {...props} />
    case DATA_TYPE.CHECKBOX:
      return <FormCheckBox {...props} />
    default:
      break
  }
}

export const GenerateHeader = ({
  headerFields,
  statusOptions,
  mode,
  initialValues,
}) => {
  const { t } = useTranslation()
  const headerFieldList = headerFields?.filter(
    (item) => item?.attributeRule?.display,
  )
  return (
    <>
      {headerFieldList?.map((field, index) => {
        if (field.attribute.multiline) {
          return (
            <Grid item xs={12} key={index}>
              {getFieldComponent(field, FIELD_AREA.HEADER, mode)}
            </Grid>
          )
        } else if (field.attribute?.isStatus) {
          return (
            <Grid item xs={12} key={index}>
              <LabelValue
                label={
                  <Typography>
                    {field?.attribute?.label
                      ? field?.attribute?.label
                      : t('common.status')}
                  </Typography>
                }
                value={
                  <Status
                    options={statusOptions}
                    value={
                      isNumber(field.attribute.value)
                        ? field.attribute.value
                        : initialValues?.status
                    }
                  />
                }
              />
            </Grid>
          )
        } else if (field.attribute?.isInfo) {
          return (
            <Grid item lg={6} xs={12} key={index}>
              <LabelValue
                label={<Typography>{field?.attribute?.name}</Typography>}
                value={field?.attribute?.value}
              />
            </Grid>
          )
        } else {
          return (
            <Grid item lg={6} xs={12} key={index}>
              {getFieldComponent(field, FIELD_AREA.HEADER, mode)}
            </Grid>
          )
        }
      })}
    </>
  )
}
// const getFieldTable = (field, params) => {
//   switch (field?.attribute?.dataType) {
//     case DATA_TYPE.TEXT:
//       return params?.row?.[field?.attribute?.code] || ''
//     case DATA_TYPE.NUMBER:
//       switch (field?.attribute?.code) {
//         case ATTRIBUTE_FIXED_PARENT.WMSX_REQUEST_QUANTITY_MAIN_UNIT: {
//           const mainUnit = params?.row?.[
//             ATTRIBUTE_FIXED_PARENT.WMSX_ITEM_CODE
//           ]?.itemUnits?.find(
//             (e) => e?.level === LEVEL_UNIT_ITEM.MAIN || e?.isPrimaryUnit,
//           )
//           return (
//             <>
//               <NumberFormatText
//                 value={params?.row?.[field?.attribute?.code]}
//                 endAdornment={mainUnit?.name}
//               />
//             </>
//           )
//         }
//         case ATTRIBUTE_FIXED_PARENT.WMSX_PLAN_QUANTITY_MAIN_UNIT: {
//           const mainUnit = params?.row?.[
//             ATTRIBUTE_FIXED_PARENT.WMSX_ITEM_CODE
//           ]?.itemUnits?.find(
//             (e) => e?.level === LEVEL_UNIT_ITEM.MAIN || e?.isPrimaryUnit,
//           )
//           return (
//             <>
//               <NumberFormatText
//                 value={params?.row?.[field?.attribute?.code]}
//                 endAdornment={mainUnit?.name}
//               />
//             </>
//           )
//         }
//         case ATTRIBUTE_FIXED_PARENT.WMSX_AVAILABLE_QUANTITY_MAIN_UNIT: {
//           const mainUnit = params?.row?.[
//             ATTRIBUTE_FIXED_PARENT.WMSX_ITEM_CODE
//           ]?.itemUnits?.find(
//             (e) => e?.level === LEVEL_UNIT_ITEM.MAIN || e?.isPrimaryUnit,
//           )
//           return (
//             <>
//               <NumberFormatText
//                 value={params?.row?.[field?.attribute?.code]}
//                 endAdornment={mainUnit?.name}
//               />
//             </>
//           )
//         }
//         case ATTRIBUTE_FIXED_PARENT.WMSX_REQUEST_QUANTITY_SUB_UNIT: {
//           const subUnit = params?.row?.[
//             ATTRIBUTE_FIXED_PARENT.WMSX_ITEM_CODE
//           ]?.itemUnits?.find(
//             (e) =>
//               e?.level === LEVEL_UNIT_ITEM.SUB ||
//               (!e?.isPrimaryUnit && e?.level !== LEVEL_UNIT_ITEM.MAIN),
//           )
//           return (
//             <>
//               <NumberFormatText
//                 value={params?.row?.[field?.attribute?.code]}
//                 endAdornment={subUnit?.name}
//               />
//             </>
//           )
//         }
//         case ATTRIBUTE_FIXED_PARENT.WMSX_PLAN_QUANTITY_SUB_UNIT: {
//           const subUnit = params?.row?.[
//             ATTRIBUTE_FIXED_PARENT.WMSX_ITEM_CODE
//           ]?.itemUnits?.find(
//             (e) =>
//               e?.level === LEVEL_UNIT_ITEM.SUB ||
//               (!e?.isPrimaryUnit && e?.level !== LEVEL_UNIT_ITEM.MAIN),
//           )
//           return (
//             <>
//               <NumberFormatText
//                 value={params?.row?.[field?.attribute?.code]}
//                 endAdornment={subUnit?.name}
//               />
//             </>
//           )
//         }
//         case ATTRIBUTE_FIXED_PARENT.WMSX_AVAILABLE_QUANTITY_SUB_UNIT: {
//           const subUnit = params?.row?.[
//             ATTRIBUTE_FIXED_PARENT.WMSX_ITEM_CODE
//           ]?.itemUnits?.find(
//             (e) =>
//               e?.level === LEVEL_UNIT_ITEM.SUB ||
//               (!e?.isPrimaryUnit && e?.level !== LEVEL_UNIT_ITEM.MAIN),
//           )
//           return (
//             <>
//               <NumberFormatText
//                 value={params?.row?.[field?.attribute?.code]}
//                 endAdornment={subUnit?.name}
//               />
//             </>
//           )
//         }
//         case ATTRIBUTE_FIXED_PARENT.WMSX_QUALITY: {
//           return (
//             <>
//               <NumberFormatText
//                 value={params?.row?.[field?.attribute?.code]}
//                 endAdornment={'%'}
//               />
//             </>
//           )
//         }
//         default:
//           return (
//             <>
//               <NumberFormatText
//                 value={params?.row?.[field?.attribute?.code] || ''}
//               />
//             </>
//           )
//       }

//     case DATA_TYPE.SELECT_BOX_SINGLE:
//       switch (field?.attribute?.code) {
//         case ATTRIBUTE_FIXED_PARENT.WMSX_WARE_IMPORT_CODE:
//         case ATTRIBUTE_FIXED_PARENT.WMSX_WARE_EXPORT_CODE:
//         case ATTRIBUTE_FIXED_PARENT.WMSX_ITEM_TYPE_SETTING:
//           return !isEmpty(params?.row?.[field?.attribute?.code])
//             ? `${params?.row?.[field?.attribute?.code]?.code} - ${
//                 params?.row?.[field?.attribute?.code]?.name
//               }`
//             : ''
//         case ATTRIBUTE_FIXED_PARENT.WMSX_ITEM_CODE:
//           return params?.row?.[field?.attribute?.code]?.code
//         default:
//           return (
//             params?.row?.[field?.attribute?.code]?.code ||
//             params?.row?.[field?.attribute?.code]?.name ||
//             ''
//           )
//       }
//     case DATA_TYPE.SELECT_BOX_MULTIPLE:
//       return (
//         params?.row?.[field?.attribute?.code]
//           ?.map((item) => item?.name)
//           ?.join(', ') || ''
//       )
//     case DATA_TYPE.DATE:
//       return (
//         convertUtcDateToLocalTz(params?.row?.[field?.attribute?.code]) || ''
//       )
//     default:
//       return params?.row?.[field?.attribute?.code] || ''
//   }
// }
export const GenerateTable = memo(
  ({
    tableFields,
    tableButton,
    tableTitle,
    mode,
    initialItem,
    name,
    importLineItem,
    onImport,
    onDownloadTemplate,
    onImportTable,
  }) => {
    const { t } = useTranslation(['wmsx'])
    // const { scrollToBottom } = useApp()
    // let boundArrayHelpers
    // const bindArrayHelpers = (arrayHelpers) => {
    //   boundArrayHelpers = arrayHelpers
    // }
    const { getValues, setValue, control } = useFormContext()
    const values = getValues()
    const {
      fields: items,
      append,
      remove,
    } = useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: name, // unique name for your Field Array
    })
    // const fields = !isEmpty(tableFields) ? tableFields : tab.attributes
    const fields = tableFields
    // const {
    //   data: { page, pageSize },
    //   actions: paginationsAction,
    // } = usePaginations()

    // const total = values?.[`${name}`]?.length || 0

    // const start = total ? pageSize * (page - 1) + 1 : 0
    // const end = total ? Math.min(pageSize * page, total) : 0
    // const rows = values?.[`${name}`]?.slice(start - 1, end)
    // if (isEmpty(rows) && page > 1) {
    //   paginationsAction.setPage(page - 1)
    // }

    const columnsFormat = useMemo(
      () =>
        fields?.map((field) => ({
          field: field?.attribute?.fieldName || '',
          headerName: t(`${field?.attribute?.name}`) || '',
          hide:
            (field?.attributeRule?.display ||
              Number(field?.attributeRule?.display)) === 0,
          width: field?.attributeRule?.width || 150,
          required: Boolean(field?.attributeRule?.isRequired),
          ...(field?.attributeRule?.width
            ? { width: field?.attributeRule?.width }
            : {}),
          ...(field?.attributeRule?.sticky
            ? {
                sticky: field?.attributeRule?.sticky,
              }
            : {}),
          renderCell: (params, index) => {
            // const idx = index
            return getFieldComponent(
              field,
              FIELD_AREA.TABLE,
              mode,
              index,
              params,
              name,
            )
            // if (
            //   !values?.typeTable ||
            //   (values?.typeTable && values?.editing === idx)
            // ) {
            //   return getFieldComponent(
            //     field,
            //     FIELD_AREA.TABLE,
            //     mode,
            //     idx,
            //     params,
            //     name,
            //   )
            // } else {
            //   return getFieldTable(field, params)
            // }
          },
        })) || [],
      [values?.editing, values?.typeTable, fields],
    )
    const columns = useMemo(
      () => [
        {
          field: 'id',
          headerName: '#',
          width: 50,
          resizable: false,
          ...(columnsFormat?.some((col) => col.sticky === 'left') && {
            sticky: 'left',
          }),
          renderCell: (_, index) => {
            return index + 1
          },
        },
        ...columnsFormat,
        {
          field: 'action',
          headerName: t('general:common.action'),
          width: 200,
          align: 'center',
          sticky: 'right',
          resizable: false,
          renderCell: (params, index) => {
            const idx = index
            return (
              <>
                {/* {values?.editing !== idx && (
                  <IconButton
                    onClick={() => {
                      setValue('editing', idx, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }}
                    size="small"
                    disabled={isNumber(values?.editing)}
                  >
                    <Icon name="edit" />
                  </IconButton>
                )}
                {values?.editing === idx && (
                  <IconButton
                    type="submit"
                    // onClick={() => setFieldValue('editing', null)}
                    size="small"
                  >
                    <Icon name="tick" />
                  </IconButton>
                )} */}

                <WatchWrapper name={name}>
                  {(values) => (
                    <IconButton
                      onClick={() => {
                        const newItems = values?.filter((_, i) => i !== idx)
                        setValue(name, newItems)
                      }}
                      disabled={values?.length === 1}
                      size="small"
                    >
                      <Icon name="remove" />
                    </IconButton>
                  )}
                </WatchWrapper>
              </>
            )
          },
        },
      ],
      [values?.editing, values?.typeTable, columnsFormat],
    )

    return (
      <>
        <HotKeys
          handlers={{
            onAddRow: () => {
              append({
                ...initialItem,
                id: new Date().getTime(),
              })
            },
            onRemoveRow: () => {
              if (values[name || 'items']?.length > 1) {
                remove(findLastIndex(values[name || 'items']))
              }
            },
          }}
        />
        <VirtualizedTable
          rows={items || []}
          title={tableTitle}
          columns={columns}
          striped={false}
          hidePageSize
          hideSetting
          hideFooter
          // pageSize={pageSize}
          // page={page}
          // onPageChange={(page) => paginationsAction.setPage(page)}
          // total={total}
          beforeTopbar={
            <>
              {importLineItem && (
                <ImportExport
                  name={t('itemNorm.export')}
                  customSx={{ variant: 'outlined', iconColor: 'primary' }}
                  icon="add"
                  onImport={onImport}
                  onDownloadTemplate={onDownloadTemplate}
                  onImportTable={(val) => onImportTable(values, val, setValue)}
                />
              )}

              <Button
                variant="outlined"
                onClick={() => {
                  const values = getValues(name)
                  setValue(name, [
                    ...values,
                    {
                      ...initialItem,
                      id: new Date().getTime(),
                    },
                  ])
                  // scrollToBottom()
                  // if (!values?.typeTable) {
                  //   append({
                  //     ...initialItem,
                  //     id: new Date().getTime(),
                  //   })
                  // } else {
                  //   setValue('editing', values?.[`${name}`]?.length)
                  //   append({
                  //     ...initialItem,
                  //     id: new Date().getTime(),
                  //   })
                  // }
                }}
                icon="add"
                iconColor="primary"
                // disabled={isNumber(values?.editing)}
              >
                {tableButton}
              </Button>
            </>
          }
        />
      </>
    )
  },
)

export const GenerateTabs = ({ tabList, valueTabs }) => {
  const item = valueTabs?.[0]
  if (tabList?.length > 1) {
    return (
      <Tabs list={tabList?.length > 1 ? tabList : []}>
        {!isEmpty(valueTabs) &&
          valueTabs?.map((item) => (
            <>
              <Box sx={{ mt: 2 }}>
                <GenerateTable
                  values={item?.values}
                  tableFields={item?.tableFields || []}
                  tableButton={item?.tableButton}
                  tableTitle={item?.tableTitle}
                  mode={item?.mode}
                  initialItem={item?.initialItem}
                  name={item?.name}
                />
              </Box>
            </>
          ))}
      </Tabs>
    )
  } else {
    return (
      !isEmpty(item) && (
        <GenerateTable
          values={item?.values}
          tableFields={item?.tableFields}
          tableButton={item?.tableButton}
          tableTitle={item?.tableTitle}
          mode={item?.mode}
          initialItem={item?.initialItem}
          name={item?.name}
          importLineItem={item?.importLineItem}
          onImport={item?.onImport}
          onDownloadTemplate={item?.onDownloadTemplate}
          onImportTable={item?.onImportTable}
        />
      )
    )
  }
}

const GenerateForm = ({
  headerFields,
  tableFields,
  tabList,
  tableTitle,
  tableButton,
  initialValues,
  validationSchema,
  onSubmit,
  mode,
  onBack,
  initialItem,
  statusOptions,
}) => {
  const headerFieldsFilter = headerFields?.filter((field) =>
    Boolean(field?.attributeRule?.display),
  )
  const tableFieldsFilter = tableFields?.filter((field) =>
    Boolean(field?.attributeRule?.display),
  )
  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={onBack}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={onBack}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ handleReset, values }) => (
        <Form>
          {!isEmpty(headerFieldsFilter) && (
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xl: 8, xs: 4 }}
                  ml={4}
                >
                  <GenerateHeader
                    headerFields={headerFieldsFilter}
                    statusOptions={statusOptions}
                    mode={mode}
                    initialValues={initialValues}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {!isEmpty(tableFieldsFilter) && (
            <Box sx={{ mt: 2 }}>
              <GenerateTable
                values={values}
                tableFields={tableFieldsFilter}
                tableButton={tableButton}
                tableTitle={tableTitle}
                mode={mode}
                initialItem={initialItem}
              />
            </Box>
          )}
          {!isEmpty(tabList) && (
            <Box sx={{ mt: 2 }}>
              <GenerateTabs />
            </Box>
          )}
          {renderActionBar(handleReset)}
        </Form>
      )}
    </Formik>
  )
}

GenerateForm.defaultProps = {
  headerFields: [],
  tableFields: [],
  tabList: [],
  tableTitle: '',
  tableButton: '',
  initialValues: {},
  validationSchema: () => {},
  onSubmit: () => {},
  mode: MODAL_MODE.CREATE,
  onBack: () => {},
  initialItem: {},
  statusOptions: [],
}

GenerateForm.propTypes = {
  headerFields: PropTypes.array,
  tableFields: PropTypes.array,
  tabList: PropTypes.array,
  tableTitle: PropTypes.string,
  tableButton: PropTypes.string,
  initialValues: PropTypes.object,
  validationSchema: PropTypes.func,
  onSubmit: PropTypes.func,
  mode: PropTypes.string,
  onBack: PropTypes.func,
  initialItem: PropTypes.object,
  statusOptions: PropTypes.array,
}

export default GenerateForm
