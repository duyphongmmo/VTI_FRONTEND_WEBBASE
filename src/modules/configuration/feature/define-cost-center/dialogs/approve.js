import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import { HOLON_STATUS } from '~/modules/configuration/constants'
import { searchHolonsApi } from '~/modules/configuration/redux/sagas/holon/search'
import { convertFilterParams } from '~/utils'

function DialogApprove({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['configuration'])
  return (
    <Dialog
      open={open}
      title={t('defineCostCenter.approveTitle')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      submitLabel={t('general:common.yes')}
      formikProps={{
        validationSchema: Yup.object().shape({
          holon: Yup.object().nullable().required(t('general:form.required')),
          usingDate: Yup.date().nullable().required(t('general:form.required')),
        }),
        initialValues: { holon: null, usingDate: null },
        onSubmit: onSubmit,
        enableReinitialize: true,
      }}
      noBorderBottom
    >
      {t('defineCostCenter.approveMessage')}
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
      <Field.Autocomplete
        name="holon"
        label={t('defineCostCenter.holonCode')}
        placeholder={t('defineCostCenter.holonCode')}
        asyncRequest={(s) =>
          searchHolonsApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            filter: convertFilterParams({
              statuses: HOLON_STATUS.ACTIVE,
            }),
            isUnused: 1,
          })
        }
        asyncRequestHelper={(res) => res?.data?.items}
        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
        required
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

export default DialogApprove
