import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ACTIVE_STATUS,
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchDefineSectionApi } from '~/modules/configuration/redux/sagas/define-section/search'
import { DEFINE_SECTION_ENUM } from '~/modules/database/constants'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { convertFilterParams } from '~/utils'

function CostCenterDepartmentTab(props) {
  const { setFieldValue } = props
  const { t } = useTranslation(['configuration'])

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xl: 8, xs: 4 }}>
        <Grid item lg={6} xs={12}>
          <Field.TextField
            name="department"
            label={t('defineCostCenter.departmentInfoTab.department')}
            placeholder={t(
              'defineCostCenter.departmentInfoTab.placeholder.department',
            )}
            disabled
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Field.Autocomplete
            name="factory"
            label={t('defineCostCenter.departmentInfoTab.factory')}
            placeholder={t(
              'defineCostCenter.departmentInfoTab.placeholder.factory',
            )}
            asyncRequest={(s) =>
              searchFactoriesApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  status: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            required
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Field.TextField
            name="division"
            label={t('defineCostCenter.departmentInfoTab.division')}
            placeholder={t(
              'defineCostCenter.departmentInfoTab.placeholder.division',
            )}
            disabled
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Field.Autocomplete
            name="section"
            label={t('defineCostCenter.departmentInfoTab.section')}
            placeholder={t(
              'defineCostCenter.departmentInfoTab.placeholder.section',
            )}
            asyncRequest={(s) =>
              searchDefineSectionApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  status: DEFINE_SECTION_ENUM.ACTIVE,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => `${opt?.code} - ${opt?.vName}`}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            onChange={(val) => {
              if (val) {
                setFieldValue(
                  'department',
                  `${val?.division?.department?.code} - ${val?.division?.department?.vnName}`,
                )
                setFieldValue(
                  'division',
                  `${val?.division?.code} - ${val?.division?.vName}`,
                )

                setFieldValue('departmentId', val?.division?.department?.id)
                setFieldValue('divisionId', val?.division?.id)
              } else {
                setFieldValue('department', '')
                setFieldValue('division', '')
                setFieldValue('departmentId', null)
                setFieldValue('divisionId', null)
              }
            }}
            required
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Field.TextField
            name="itemType"
            label={t('defineCostCenter.departmentInfoTab.itemType')}
            placeholder={t(
              'defineCostCenter.departmentInfoTab.placeholder.itemType',
            )}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
            allow={TEXTFIELD_ALLOW.REGEX_CODE_JAPANESE}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CostCenterDepartmentTab
