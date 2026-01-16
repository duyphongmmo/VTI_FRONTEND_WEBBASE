import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import StatusSwitcher from '~/components/StatusSwitcher'
import {
  HOLON_STATUS,
  HOLON_STATUS_OPTIONS,
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
      {...(tempItem?.status === HOLON_STATUS.ACTIVE
        ? {
            submitProps: {
              color: 'error',
            },
          }
        : {})}
      noBorderBottom
    >
      {t('general.confirmMessage')}
      <LV label={t('holon.code')} value={tempItem?.code} sx={{ mt: 1 }} />
      <LV label={t('holon.name')} value={tempItem?.name} sx={{ mt: 1 }} />
      <LV
        label={t('general:common.status')}
        value={
          <StatusSwitcher
            options={HOLON_STATUS_OPTIONS}
            value={tempItem?.status}
            nextValue={
              tempItem?.status === HOLON_STATUS.ACTIVE
                ? HOLON_STATUS.INACTIVE
                : HOLON_STATUS.ACTIVE
            }
          />
        }
        sx={{ mt: 1 }}
      />
    </Dialog>
  )
}
export default DialogChangeStatus
