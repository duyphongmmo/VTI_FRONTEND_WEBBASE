import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'

function DialogActive({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['configuration'])
  return (
    <Dialog
      open={open}
      title={t('departmentList.activeTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'error',
      }}
      noBorderBottom
    >
      {t('departmentList.activeConfirm')}
      <LabelValue
        label={t('departmentList.code')}
        value={tempItem?.code}
        sx={{ mt: 1 }}
      />
      <LabelValue
        label={t('departmentList.name')}
        value={tempItem?.name}
        sx={{ mt: 1 }}
      />
    </Dialog>
  )
}
export default DialogActive
