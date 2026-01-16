import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ACTIVE_STATUS,
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import { getListMaintenanceTeamApi } from '~/modules/mmsx/redux/sagas/maintenance-team/get-maintenance-teams'
import { convertFilterParams } from '~/utils'

function PositionForm({ positionDetail }) {
  const { t } = useTranslation('mmsx')

  const costCenterId = positionDetail?.costCenter?.id
  return (
    <Grid container>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.deviceCode')}
          value={positionDetail?.device?.code}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('master.deviceIOTCode')}
          value={positionDetail?.device?.iotCode}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.costCenter')}
          value={(() => {
            const costCenter = positionDetail?.costCenter
            return costCenter?.code && costCenter?.vName
              ? `${costCenter?.code} - ${costCenter?.vName}`
              : costCenter?.code || costCenter?.vName
          })()}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.holon')}
          value={positionDetail?.costCenter?.holon}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.productionLine')}
          value={positionDetail?.productionLine?.name}
        />
      </Grid>

      <Grid item lg={12} xs={12} mt={2}>
        <Field.Autocomplete
          name={`responsibleUser`}
          label={t('deviceList.responsibleTeam')}
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
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          getOptionLabel={(opt) =>
            opt?.code && opt?.name
              ? `${opt?.code} - ${opt?.name}`
              : opt?.code || opt?.name
          }
          asyncRequestDeps={[costCenterId]}
          asyncRequestHelper={(res) => res?.data?.items}
          required
          autoFetch={false}
          disabled={!costCenterId}
        />
      </Grid>

      <Grid item lg={12} xs={12} mt={2}>
        <Field.TextField
          name="code"
          label={t('deviceLayout.position')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
          allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS}
          // required
        />
      </Grid>
    </Grid>
  )
}

export default PositionForm
