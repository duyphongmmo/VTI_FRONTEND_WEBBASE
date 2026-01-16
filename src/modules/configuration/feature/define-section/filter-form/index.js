import React from 'react'

import { useTranslation } from 'react-i18next'

import {
  ACTIVE_STATUS,
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { DEFINE_DIVISION_ENUM } from '~/modules/configuration/constants'
import { searchDefineDivisionApi } from '~/modules/configuration/redux/sagas/define-division/search'
import { searchUsersApi } from '~/modules/configuration/redux/sagas/user-management/search-users'
import { convertFilterParams } from '~/utils'
// import { searchDefineDivisionApi } from '~/modules/database/redux/sagas/define-division/search'

const FilterForm = () => {
  const { t } = useTranslation(['configuration'])
  return (
    <>
      <Field.TextField
        name="eName"
        placeholder={t('defineSection.enName')}
        // label={t('defineSection.enName')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }}
        allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS_SPACE}
      />

      <Field.TextField
        name="vName"
        placeholder={t('defineSection.viName')}
        // label={t('defineSection.viName')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }}
        allow={TEXTFIELD_ALLOW.REGEX_CODE_VIETNAMESE}
      />

      <Field.TextField
        name="jName"
        placeholder={t('defineSection.jpName')}
        // label={t('defineSection.viName')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }}
        allow={TEXTFIELD_ALLOW.REGEX_CODE_VIETNAMESE}
      />
      <Field.TextField
        name="description"
        placeholder={t('defineSection.description')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_100.MAX,
        }}
      />
      <Field.Autocomplete
        name="divisionIds"
        // label={t('defineSection.department')}
        placeholder={t('defineSection.division')}
        multiple
        asyncRequest={(s) =>
          searchDefineDivisionApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            filter: convertFilterParams({
              status: DEFINE_DIVISION_ENUM.ACTIVE,
            }),
          })
        }
        asyncRequestHelper={(res) => res?.data?.items}
        getOptionLabel={(opt) => `${opt?.vName}`}
      />
      {/* <Field.Autocomplete
        name="divisionIds"
        // label={t('defineSection.division')}
        placeholder={t('defineSection.division')}
        multiple
        asyncRequest={(s) =>
          searchDefineDivisionApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
          })
        }
        asyncRequestHelper={(res) =>
          res?.data?.items?.map((i) => ({
            code: i?.code,
            vName: i?.vName,
            id: i?.id,
          }))
        }
        getOptionLabel={(opt) => opt?.code}
        getOptionSubLabel={(opt) => opt?.vName}
        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
      /> */}

      <Field.DateRangePicker
        name="createdAt"
        // label={t('defineSection.createdAt')}
        placeholder={t('defineSection.createdAt')}
      />

      <Field.Autocomplete
        name="createdBy"
        placeholder={t('defineDivision.createdByUser')}
        asyncRequest={(s) =>
          searchUsersApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            filter: convertFilterParams({
              status: ACTIVE_STATUS.ACTIVE,
            }),
          })
        }
        asyncRequestHelper={(res) => res?.data?.items}
        getOptionLabel={(opt) => opt?.fullName}
        getOptionSubLabel={(opt) => opt?.username}
      />
      <Field.DateRangePicker
        name="updatedAt"
        placeholder={t('general:common.updatedAt')}
      />
      <Field.Autocomplete
        name="updatedBy"
        placeholder={t('general:common.updatedBy')}
        asyncRequest={(s) =>
          searchUsersApi({
            keyword: s,
            limit: ASYNC_SEARCH_LIMIT,
            filter: convertFilterParams({
              status: ACTIVE_STATUS.ACTIVE,
            }),
          })
        }
        asyncRequestHelper={(res) => res?.data?.items}
        getOptionLabel={(opt) => opt?.fullName}
      />
    </>
  )
}

export default FilterForm
