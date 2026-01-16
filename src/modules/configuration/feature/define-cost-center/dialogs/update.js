import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'

function DialogUpdateStatus({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['configuration'])
  return (
    <Dialog
      open={open}
      title={t('defineCostCenter.updateStatusTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      submitLabel={t('general:common.yes')}
      formikProps={{
        validationSchema: Yup.object().shape({
          usingDate: Yup.date()
            .nullable()
            .required(t('general:form.required'))
            .test(_, (value, context) => {
              if (value?.toISOString() > new Date().toISOString()) {
                return context.createError({
                  message: t('defineCostCenter.smallerThanCurrentDate'),
                })
              }
              return true
            }),
        }),
        initialValues: {
          usingDate: tempItem?.usingDate || null,
        },
        onSubmit: onSubmit,
        enableReinitialize: true,
      }}
      noBorderBottom
    >
      {t('defineCostCenter.updateStatusMessage')}
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
      <LV
        label={t('defineCostCenter.holonCode')}
        value={tempItem?.holon?.code}
        sx={{ mt: 1 }}
      />
      <Box mt={1}>
        <Field.DatePicker
          name="usingDate"
          label={t('defineCostCenter.usingDate')}
          placeholder={t('defineCostCenter.usingDate')}
          required
        />
      </Box>
    </Dialog>
  )
}

export default DialogUpdateStatus
