import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'

function DialogApprove({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['configuration'])
  return (
    <Dialog
      open={open}
      title={t('holon.approveTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'success',
      }}
      noBorderBottom
    >
      {t('holon.approveMessage')}
      <LV label={t('holon.code')} value={tempItem?.code} sx={{ mt: 1 }} />
      <LV label={t('holon.name')} value={tempItem?.name} sx={{ mt: 1 }} />
    </Dialog>
  )
}

export default DialogApprove
