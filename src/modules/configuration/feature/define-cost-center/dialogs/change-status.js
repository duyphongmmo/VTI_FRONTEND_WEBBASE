import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import StatusSwitcher from '~/components/StatusSwitcher'
import {
  COST_CENTER_STATUS,
  COST_CENTER_STATUS_OPTIONS,
} from '~/modules/configuration/constants'

function DialogChangeStatus({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['configuration'])
  return (
    <Dialog
      open={open}
      title={t('database:general.updateStatus')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      {...(tempItem?.status === COST_CENTER_STATUS.ACTIVE
        ? {
            submitProps: {
              color: 'error',
            },
          }
        : {})}
      noBorderBottom
    >
      {t('general.confirmMessage')}
      <LV
        label={t('defineCostCenter.code')}
        value={tempItem?.code}
        sx={{ mt: 1 }}
      />
      <LV
        label={t('defineCostCenter.vName')}
        value={tempItem?.vName}
        sx={{ mt: 1 }}
      />
      <LV
        label={t('general:common.status')}
        value={
          <StatusSwitcher
            options={COST_CENTER_STATUS_OPTIONS}
            value={tempItem?.status}
            nextValue={
              tempItem?.status === COST_CENTER_STATUS.ACTIVE
                ? COST_CENTER_STATUS.INACTIVE
                : COST_CENTER_STATUS.ACTIVE
            }
          />
        }
        sx={{ mt: 1 }}
      />
    </Dialog>
  )
}
export default DialogChangeStatus
