import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'

function DialogDelete({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['configuration'])
  return (
    <Dialog
      open={open}
      title={t('holon.deleteTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'error',
      }}
      noBorderBottom
    >
      {t('holon.deleteMessage')}
      <LV label={t('holon.code')} value={tempItem?.code} sx={{ mt: 1 }} />
      <LV label={t('holon.name')} value={tempItem?.name} sx={{ mt: 1 }} />
    </Dialog>
  )
}

export default DialogDelete
