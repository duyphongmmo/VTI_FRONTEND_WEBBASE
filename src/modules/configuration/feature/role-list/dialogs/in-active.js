import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

export default function DialogInActive({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['configuration'])
  return (
    <Dialog
      open={open}
      title={t('roleManagement.inActiveTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'success',
      }}
      noBorderBottom
    >
      {t('roleManagement.inActiveConfirm')}
      <LabelValue
        label={t('roleManagement.code')}
        value={tempItem?.code}
        sx={{ mt: 1 }}
      />
      <LabelValue
        label={t('roleManagement.name')}
        value={tempItem?.name}
        sx={{ mt: 1 }}
      />
    </Dialog>
  )
}
