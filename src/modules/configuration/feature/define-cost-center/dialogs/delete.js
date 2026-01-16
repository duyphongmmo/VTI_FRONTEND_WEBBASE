import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'

function DialogDelete({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['configuration'])
  return (
    <Dialog
      open={open}
      title={t('defineCostCenter.deleteTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'error',
      }}
      noBorderBottom
    >
      {t('defineCostCenter.deleteMessage')}
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
    </Dialog>
  )
}

export default DialogDelete
