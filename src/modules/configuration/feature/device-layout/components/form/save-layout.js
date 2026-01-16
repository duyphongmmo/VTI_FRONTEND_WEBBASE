import { Grid } from '@mui/material'
import { FieldArray, useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import {
  ACTIVE_STATUS,
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import { getListMaintenanceTeamApi } from '~/modules/mmsx/redux/sagas/maintenance-team/get-maintenance-teams'
import { convertFilterParams } from '~/utils'

function SaveLayoutForm() {
  const { t } = useTranslation('mmsx')

  const { values } = useFormikContext()

  const columns = [
    {
      field: 'id',
      headerName: '#',
      resizable: false,
      width: 40,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'device',
      headerName: t('deviceLayout.deviceCode'),
      width: 200,
      renderCell: (params) => {
        return params.row.device?.code
      },
    },
    {
      field: 'deviceIOTCode',
      headerName: t('master.deviceIOTCode'),
      width: 200,
      renderCell: (params) => {
        return params.row.device?.iotCode
      },
    },
    {
      field: 'costCenter',
      headerName: t('deviceLayout.costCenter'),
      width: 200,
      renderCell: (params) => {
        const costCenter = params.row.costCenter
        return costCenter?.code && costCenter?.vName
          ? `${costCenter?.code} - ${costCenter?.vName}`
          : costCenter?.code || costCenter?.vName
      },
    },
    {
      field: 'holon',
      headerName: t('deviceLayout.holon'),
      width: 200,
      renderCell: (params) => {
        return params.row.costCenter?.holon
      },
    },
    {
      field: 'productionLine',
      headerName: t('deviceLayout.productionLine'),
      width: 200,
      renderCell: (params) => {
        const productionLine = params.row?.productionLine
        return productionLine?.code && productionLine?.name
          ? `${productionLine?.code} - ${productionLine?.name}`
          : productionLine?.code || productionLine?.name
      },
    },
    {
      field: 'responsibleUser',
      headerName: t('deviceList.responsibleTeam'),
      width: 200,
      renderCell: (params, index) => {
        const costCenterId = params?.row?.costCenter?.id

        return (
          <Field.Autocomplete
            name={`positionDesign[${index}].responsibleUser`}
            placeholder={t('deviceList.responsibleTeam')}
            asyncRequest={(s) =>
              getListMaintenanceTeamApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  active: ACTIVE_STATUS.ACTIVE,
                  costCenterId: costCenterId,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionLabel={(opt) =>
              opt?.code && opt?.name
                ? `${opt?.code} - ${opt?.name}`
                : opt?.code || opt?.name
            }
            asyncRequestDeps={[costCenterId]}
            required
            autoFetch={false}
          />
        )
      },
    },
    {
      field: 'position',
      headerName: t('deviceLayout.position'),
      width: 100,
      renderCell: (_, index) => {
        return (
          <Field.TextField
            name={`positionDesign[${index}].code`}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS}
            required
          />
        )
      },
    },
  ]
  return (
    <>
      <Grid container>
        <Grid item md={6} xs={12} mt={2}>
          <LabelValue
            label={t('deviceLayout.plant')}
            value={values?.plant?.name}
          />
        </Grid>
        <Grid item md={6} xs={12} mt={2} mb={2}>
          <LabelValue
            label={t('deviceLayout.floor')}
            value={values?.floor?.floorName}
          />
        </Grid>
      </Grid>
      <FieldArray
        name="positionDesign"
        render={() => {
          return (
            <DataTable
              rows={values?.positionDesign}
              columns={columns}
              striped={false}
              hideSetting
              hideFooter
            />
          )
        }}
      />
    </>
  )
}

export default SaveLayoutForm
