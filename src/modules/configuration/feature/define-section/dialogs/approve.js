import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'

function DialogApprove({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['configuration'])
  return (
    <Dialog
      open={open}
      title={t('defineSection.approveTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'success',
      }}
      noBorderBottom
    >
      {t('defineSection.approveMessage')}
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
    </Dialog>
  )
}

export default DialogApprove
