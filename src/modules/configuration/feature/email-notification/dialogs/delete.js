import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import { EMAIL_FUNCTION_TYPE_MAP } from '~/modules/configuration/constants'

const DeleteDialog = ({ open, onCancel, onSubmit, tempItem }) => {
  const { t } = useTranslation(['configuration'])
  return (
    <Dialog
      open={open}
      title={t('general:common.notify')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'error',
      }}
      noBorderBottom
    >
      {t('emailNotification.confirmDelete')}
      <LV
        label={t('emailNotification.function')}
        value={t(EMAIL_FUNCTION_TYPE_MAP[tempItem?.type])}
        sx={{ mt: 1 }}
      />
      <LV
        label={t('emailNotification.email')}
        value={tempItem?.emails?.map((email) => email?.name)?.join(', ')}
        sx={{ mt: 1 }}
      />
    </Dialog>
  )
}

export default DeleteDialog
