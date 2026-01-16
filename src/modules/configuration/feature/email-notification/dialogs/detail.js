import { useEffect } from 'react'

import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import Loading from '~/components/Loading'
import TextField from '~/components/TextField'
import { EMAIL_FUNCTION_TYPE_MAP } from '~/modules/configuration/constants'
import { useEmailNotification } from '~/modules/configuration/redux/hooks/useEmailNotification'

const DetailDialog = ({ open, tempItem, onCancel, onEdit }) => {
  const { t } = useTranslation(['configuration'])
  const {
    data: { detail, isLoading },
    actions,
  } = useEmailNotification()

  useEffect(() => {
    if (open) {
      actions.getEmailNotificationDetailsById(tempItem?.id)
    }
    return () => actions.resetEmailNotificationDetail()
  }, [tempItem])

  const renderActionBar = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2,
        }}
      >
        <Button color="grayF4" sx={{ mr: 1 }} onClick={onCancel}>
          {t('general:modal.btnClose')}
        </Button>
        <Button
          onClick={() => {
            onCancel()
            onEdit()
          }}
        >
          {t('general:common.edit')}
        </Button>
      </Box>
    )
  }
  return (
    <>
      <Loading open={isLoading} />
      <Dialog
        open={open}
        title={t('menu.emailNotificationDetail')}
        onCancel={onCancel}
        noBorderBottom
      >
        <LV
          label={t('emailNotification.function')}
          value={t(EMAIL_FUNCTION_TYPE_MAP[tempItem?.type])}
          sx={{ mt: 2 }}
        />
        <LV
          label={t('emailNotification.email')}
          value={tempItem?.emails?.map((email) => email?.name)?.join(', ')}
          sx={{ mt: 2 }}
        />
        <TextField
          name="note"
          label={t('emailNotification.note')}
          multiline
          rows={3}
          value={detail?.description}
          readOnly
          sx={{
            'label.MuiFormLabel-root': {
              color: (theme) => theme.palette.subText.main,
            },
            mt: 2,
          }}
        />
        {renderActionBar()}
      </Dialog>
    </>
  )
}

export default DetailDialog
