import { useMemo } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

import { ENTITY_TYPE } from '../../../constants'

export default function DialogView({ open, onCancel, tempData }) {
  const { t } = useTranslation(['mmsx'])

  const type = useMemo(() => {
    return tempData?.type
  }, [tempData?.type])

  const title = useMemo(() => {
    switch (type) {
      case ENTITY_TYPE.HOLON:
        return t('deviceLayout.holonInformation')
      case ENTITY_TYPE.POSITION:
        return t('deviceLayout.deviceInformation')
      case ENTITY_TYPE.PRODUCTION_LINE:
        return t('deviceLayout.productionLineInformation')

      default:
        return ''
    }
  }, [type, t])
  return (
    <Dialog
      open={open}
      title={title}
      onCancel={onCancel}
      cancelLabel={t('general:common.cancel')}
      noBorderBottom
      renderDeps={tempData}
    >
      {type === ENTITY_TYPE.POSITION && <ViewPosition attribute={tempData} />}
      {type === ENTITY_TYPE.HOLON && <ViewHolon attribute={tempData} />}
      {type === ENTITY_TYPE.PRODUCTION_LINE && (
        <ViewProductionLine attribute={tempData} />
      )}
    </Dialog>
  )
}

const ViewPosition = ({ attribute }) => {
  const { t } = useTranslation('mmsx')
  const checkIsDefaultHolon =
    attribute?.costCenter?.id === attribute?.prCostCenter?.id
  let user = attribute?.responsibleUser

  if (attribute?.prResponsibleUser && checkIsDefaultHolon) {
    user = attribute?.prResponsibleUser
  }
  return (
    <Grid container>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('master.deviceCode')}
          value={attribute?.device?.code}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('master.deviceIOTCode')}
          value={attribute?.device?.iotCode}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.costCenter')}
          value={attribute?.costCenter?.code}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.holon')}
          value={attribute?.costCenter?.holon}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.productionLine')}
          value={attribute?.productionLine?.name}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceList.responsibleTeam')}
          value={(() => {
            const team = user
            return team?.code && team?.name
              ? `${team?.code} - ${team?.name}`
              : team?.code || team?.name
          })()}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.position')}
          value={attribute?.code}
        />
      </Grid>
    </Grid>
  )
}

const ViewHolon = ({ attribute }) => {
  const { t } = useTranslation('mmsx')
  return (
    <Grid container>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.holon')}
          value={attribute?.costCenter?.holon}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.costCenter')}
          value={attribute?.costCenter?.code}
        />
      </Grid>
    </Grid>
  )
}

const ViewProductionLine = ({ attribute }) => {
  const { t } = useTranslation('mmsx')
  return (
    <Grid container>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.productionLineCode')}
          value={attribute?.code}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.productionLineName')}
          value={attribute?.name}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.costCenter')}
          value={attribute?.costCenter?.code}
        />
      </Grid>
      <Grid item lg={12} xs={12} mt={2}>
        <LabelValue
          label={t('deviceLayout.holon')}
          value={attribute?.costCenter?.holon}
        />
      </Grid>
    </Grid>
  )
}
