import { useTranslation } from 'react-i18next'

import {
  ACTIVE_STATUS_STRING,
  ACTIVE_STATUS_STRING_OPTIONS,
} from '~/common/constants'
import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import StatusSwitcher from '~/components/StatusSwitcher'

function DialogChangeStatus({ modal, setModal, onSubmit }) {
  const { t } = useTranslation(['configuration'])

  return (
    <Dialog
      open={modal.isOpenChangeStatusModal}
      title={t(
        `location.modalLock.${
          modal?.tempItem?.status === ACTIVE_STATUS_STRING.ACTIVE
            ? 'lockTitle'
            : 'unLockTitle'
        }`,
      )}
      onCancel={() => {
        setModal({ isOpenChangeStatusModal: false, tempItem: null })
      }}
      cancelLabel={t('general:common.no')}
      onSubmit={onSubmit}
      submitLabel={t('general:common.yes')}
      {...(modal?.tempItem?.status === ACTIVE_STATUS_STRING.ACTIVE
        ? {
            submitProps: {
              color: 'error',
            },
          }
        : {})}
      noBorderBottom
    >
      {t(
        `location.modalLock.${
          modal?.tempItem?.status === ACTIVE_STATUS_STRING.ACTIVE
            ? 'lockContent'
            : 'unLockContent'
        }`,
      )}
      <LV
        label={t('general:common.status')}
        value={
          <StatusSwitcher
            options={ACTIVE_STATUS_STRING_OPTIONS}
            value={modal?.tempItem?.status}
          />
        }
      ></LV>
    </Dialog>
  )
}
export default DialogChangeStatus
