import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ACTIVE_STATUS_STRING,
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'

import { searchLocationApi } from '../../../location/api'

function CostCenterGeneralInformation({ mode }) {
  const isUpdate = mode === MODAL_MODE.UPDATE
  const { t } = useTranslation(['configuration'])

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
        <Grid item xs={12} lg={6}>
          <Field.TextField
            label={t('defineCostCenter.code')}
            name="code"
            placeholder={t('defineCostCenter.code')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
            }}
            required
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS}
            disabled={isUpdate}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Field.TextField
            label={t('defineCostCenter.name')}
            name="name"
            placeholder={t('defineCostCenter.name')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
            }}
            required
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Field.TextField
            label={t('defineCostCenter.accountingLocationCode')}
            name="accountingLocationCode"
            placeholder={t('defineCostCenter.accountingLocationCode')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Field.TextField
            label={t('defineCostCenter.accountingCodeCenter')}
            name="accountingCodeCenter"
            placeholder={t('defineCostCenter.accountingCodeCenter')}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Field.Autocomplete
            label={t('defineCostCenter.location')}
            name="location"
            placeholder={t('defineCostCenter.location')}
            asyncRequest={(s) =>
              searchLocationApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filters: {
                  status: ACTIVE_STATUS_STRING.ACTIVE,
                },
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            autoFetch={false}
          />
        </Grid>
        <Grid item xs={12}>
          <Field.TextField
            label={t('defineCostCenter.description')}
            name="description"
            placeholder={t('defineCostCenter.description')}
            multiline
            rows={3}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CostCenterGeneralInformation
