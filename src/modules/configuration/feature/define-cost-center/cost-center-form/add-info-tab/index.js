import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'

function CostCenterAddInfoTab() {
  const { t } = useTranslation(['configuration'])

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
        <Grid item lg={6} xs={12}>
          <Field.TextField
            name="businessTypeEn"
            label={t('defineCostCenter.addInfoTab.businessTypeEn')}
            placeholder={t('defineCostCenter.addInfoTab.businessTypeEn')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS_SPACE}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Field.TextField
            name="symbolR"
            label={t('defineCostCenter.addInfoTab.symbolR')}
            placeholder={t('defineCostCenter.addInfoTab.symbolR')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_5.MAX,
            }}
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS_SPACE}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Field.TextField
            name="businessTypeJp"
            label={t('defineCostCenter.addInfoTab.businessTypeJp')}
            placeholder={t('defineCostCenter.addInfoTab.businessTypeJp')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
            allow={TEXTFIELD_ALLOW.REGEX_CODE_JAPANESE}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Field.TextField
            name="abc"
            label={t('defineCostCenter.addInfoTab.abc')}
            placeholder={t('defineCostCenter.addInfoTab.abc')}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_5.MAX,
            }}
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS_SPACE}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CostCenterAddInfoTab
