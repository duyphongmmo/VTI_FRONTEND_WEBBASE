import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'

function DialogDelete({ modal, onSubmit, setModal }) {
  const { t } = useTranslation('configuration')

  return (
    <Dialog
      open={modal.isOpenDeleteModal}
      title={t('location.modalDeleteTitle')}
      onCancel={() => {
        setModal({ isOpenDeleteModal: false, tempItem: null })
      }}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      submitProps={{
        color: 'error',
      }}
      noBorderBottom
    >
      {t('location.modalDeleteContent')}
    </Dialog>
  )
}

export default DialogDelete
