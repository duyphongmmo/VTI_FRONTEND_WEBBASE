import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import StatusSwitcher from '~/components/StatusSwitcher'
import {
  DEFINE_DIVISION_ENUM,
  DEFINE_DIVISION_ENUM_OPTIONS,
} from '~/modules/configuration/constants'

function DialogChangeStatus({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['configuration'])
  return (
    <Dialog
      open={open}
      title={t('general.updateStatus')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      {...(tempItem?.status === DEFINE_DIVISION_ENUM.ACTIVE
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
        label={t('defineSection.code')}
        value={tempItem?.code}
        sx={{ mt: 1 }}
      />
      <LV
        label={t('defineSection.viName')}
        value={tempItem?.vName}
        sx={{ mt: 1 }}
      />
      <LV
        label={t('general:common.status')}
        value={
          <StatusSwitcher
            options={DEFINE_DIVISION_ENUM_OPTIONS}
            value={tempItem?.status}
            nextValue={
              tempItem?.status === DEFINE_DIVISION_ENUM.ACTIVE
                ? DEFINE_DIVISION_ENUM.INACTIVE
                : DEFINE_DIVISION_ENUM.ACTIVE
            }
          />
        }
        sx={{ mt: 1 }}
      />
    </Dialog>
  )
}
export default DialogChangeStatus
